import React, { Component } from "react";
import EditableBattleField from "./view/EditableBattleField.jsx";
import FightBattleField from "./view/FightBattleField.jsx";
import Login from "./view/Login.jsx";
import MainMenu from "./view/MainMenu.jsx";
import WorldMap from "./view/WorldMap.jsx";
import Game from "./model/Game.js"
import S from "./model/Settings.js";
import Server from "./model/Server.js";
import AcceptChallengePrompt from "./view/AcceptChallengePrompt.jsx";
import Styles from "./view/Styles.js"
import LocalEvents from "./model/LocalEvents.js";
import RemoteEvents from "./model/RemoteEvents.js";
import BattleUnit from "./model/BattleUnit.js"
import BattleUnitFactory from "./model/BattleUnitFactory.js";

/**
 * All of the state *everywhere* is managed *solely* by App.
 * 
 * Root of everything, handles events (both inbound and outbound).
 * Sprites (and other components) and Server issue events, App alone acts on events
 * All graphical updates are triggered by App, based on the relevant events.
 * App modifies the Game object (passed down to all children of App).
 * 
 */
export default class App extends Component {

    //modes or 'pages' of the App
    static LOGIN = "LOGIN"
    static MAIN_MENU = "MAIN_MENU"
    static WORLD_MAP = "WORLD_MAP"
    static EDITABLE_BATTLE_FIELD = "EDITABLE_BATTLE_FIELD"
    static FIGHT_BATTLE_FIELD = "FIGHT_BATTLE_FIELD"

    constructor(props) {
        super(props)


        this.state = {
            mode: App.LOGIN,
            myUsername: undefined,
            game: new Game(),
            acceptChallengePrompt: false
        }
    }

    render() {

        let view

        switch (this.state.mode) {
            case App.LOGIN:
                view = <Login onLogin={this.onLogin} />
                break
            case App.MAIN_MENU:
                view = <MainMenu goToWorldMap={() => { this.switchMode(App.WORLD_MAP) }} />
                break
            case App.WORLD_MAP:
                view = <WorldMap getOnlineUsers={Server.instance().onlineUsers} challengeUser={this.challengeUser} />
                break
            case App.EDITABLE_BATTLE_FIELD:
                view = <EditableBattleField game={this.state.game} setGame={this.setGame} onReady={this.onReady} />
                break
            case App.FIGHT_BATTLE_FIELD:
                view = <FightBattleField game={this.state.game} sendFire={this.sendFire} />
                break
        }


        return (<div>

            <div style={this.state.acceptChallengePrompt ? Styles.visible : Styles.invisible}>
                <AcceptChallengePrompt game={this.state.game ?? {}} acceptChallenge={this.acceptChallenge} />
            </div>

            {view}
        </div>)
    }

    /**
     * 
     * @param {string} mode 
     * @param {*} args 
     */
    switchMode = (mode, args) => {
        this.setState({ mode: mode })
    }

    onLogin = (username, password) => {
        S.getInstance().set(S.USERNAME, username)
        this.switchMode(App.MAIN_MENU, {})
        //start the event loop upon a successful login
        setInterval(this.eventLoop, 1000);
    }

    eventLoop = async () => {

        //handle events coming from the server
        let remoteEvents = await Server.instance().iAmOnline()
        remoteEvents.forEach(ev => {
            console.log("LOOK HERE", ev)

            switch (ev.eventType) {
                case RemoteEvents.FIGHT_INVITE:
                    let g = new Game(ev.challenger, ev.defender, ev.gameId)
                    this.setState({ game: g, acceptChallengePrompt: true })
                    break
                case RemoteEvents.FIGHT_ACCEPT:

                    break
                case RemoteEvents.READY:

                    console.log("ready",)

                    let gm = this.state.game
                    gm.setBattleUnits(gm.getOpponent(), ev.battleUnits.map(b => BattleUnitFactory.fromJson(b)))
                    this.setGame(gm)
                    break

                case RemoteEvents.FIRE: //incoming fire

                    let victimDead = false
                    let victim = undefined
                    let ga = this.state.game
                    let battleUnits = ga.getBattleUnits(S.getInstance().get(S.USERNAME))

                    let toUnit = BattleUnitFactory.fromJson(ev.toUnit)
                    let fromUnit = BattleUnitFactory.fromJson(ev.fromUnit)

                    battleUnits.forEach(b => {
                        if (b.position == toUnit.position) {
                            b.health -= 10
                            victim = b
                            if (b.health <= 0) {
                                victimDead = true
                            }
                        }
                    })

                    if (victimDead) {
                        battleUnits = battleUnits.filter(b => b.position != victim.position)
                    }

                    ga.setBattleUnits(S.getInstance().get(S.USERNAME), battleUnits)
                    this.setGame(ga)

                    this.animate(fromUnit, BattleUnit.STATE_ATTACKING, true)

                    Server.instance().fireAck(this.state.game, victim, ev.id, victimDead, !battleUnits.some(x => x))
                    break




                case RemoteEvents.FIRE_ACK:

                    let gam = this.state.game
                    let enemyBs = gam.getBattleUnits(gam.getOpponent())
                    let toUnit1 = BattleUnitFactory.fromJson(ev.toUnit)

                    enemyBs = enemyBs.filter(b => b.position != toUnit1.position)

                    if (ev.toUnit.health > 0) {
                        enemyBs.push(toUnit1)
                    }

                    gam.setBattleUnits(gam.getOpponent(), enemyBs)
                    this.setGame(gam)

                    break

                case RemoteEvents.GAME_OVER:
                    confirm("game is over!!!!!!!!!")
                    this.switchMode(App.MAIN_MENU)
                    break

            }
        })

        //handle events generated locally
        let localEvents = LocalEvents.get()
        localEvents.forEach(ev => {
            // console.log(ev)
        })

    }

    /**
     * local user challenges remote user
     * @param {string} defender  username 
     */
    challengeUser = (defender) => {
        let g = new Game(S.getInstance().get(S.USERNAME), defender, parseInt(999999 * Math.random()))
        this.setState({ game: g })
        Server.instance().fightInvite(g)
        //go to EditableBattleField 
        this.switchMode(App.EDITABLE_BATTLE_FIELD)
    }

    acceptChallenge = () => {
        Server.instance().fightAccept(this.state.game)
        //go to EditableBattleField 
        this.switchMode(App.EDITABLE_BATTLE_FIELD)
        this.setState({ acceptChallengePrompt: false })
    }

    onReady = () => {
        Server.instance().ready(this.state.game)
        this.switchMode(App.FIGHT_BATTLE_FIELD)
    }

    /**
     * 
     * @param {BattleUnit} fromUnit 
     * @param {BattleUnit} toUnit 
     */
    sendFire = (fromUnit, toUnit) => {
        Server.instance().fire(this.state.game, fromUnit, toUnit)
        this.animate(fromUnit, BattleUnit.STATE_ATTACKING)
    }

    /**
     * 
     * @param {Game} game 
     */
    setGame = (game) => {
        this.setState({ game: game })
    }

    /**
     * 
     * @param {BattleUnit} battleUnit 
     * @param {string} state 
     * @param {boolean} enemy
     */
    animate = (battleUnit, state, enemy) => {

        let animationDurationMillisecs = 2000  
        let ga = this.state.game
        let username = enemy? ga.getOpponent() : S.getInstance().get(S.USERNAME)

        //attack animation
        battleUnit.setState(state)
        let battleUnits = ga.getBattleUnits(username)
        battleUnits = battleUnits.filter(x => x.position != battleUnit.position)
        battleUnits.push(battleUnit)
        ga.setBattleUnits(username, battleUnits)
        this.setGame(ga)

        //stop animation
        setTimeout(() => {
            let ga = this.state.game
            let battleUnits = ga.getBattleUnits(username)
            battleUnits = battleUnits.filter(x => x.position != battleUnit.position)
            battleUnit.setState(BattleUnit.STATE_IDLING)
            battleUnits.push(battleUnit)
            ga.setBattleUnits(username, battleUnits)
            this.setGame(ga)
        }, animationDurationMillisecs);

    }








}