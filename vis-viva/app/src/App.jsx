import React, { Component } from "react";
import EditableBattleField from "./view/pages/editable-battle-field/EditableBattleField.jsx";
import FightBattleField from "./view/pages/fight-battle-field/FightBattleField.jsx";
import Login from "./view/pages/login/Login.jsx";
import MainMenu from "./view/pages/main-menu/MainMenu.jsx";
import WorldMap from "./view/pages/world-map/WorldMap.jsx";
import Game from "./model/Game.js";
import Settings from "./view/pages/settings/Settings.jsx";
import Info from "./view/pages/info/Info.jsx";
import S from "./model/utils/Settings.js"
import Server from "./model/events/Server.js";
import AcceptChallengePrompt from "./view/popups/AcceptChallengePrompt.jsx";
import GameOverPopup from "./view/popups/GameOverPopup.jsx"
import Styles from "./view/Styles.js";
import RemoteEvents from "./model/events/RemoteEvents.js";
import BattleUnit from "./model/battle-units/BattleUnit.js";
import BattleUnitFactory from "./model/battle-units/BattleUnitFactory.js"
import FireAckEvent from "./model/events/classes/FireAckEvent.js"
import FireEvent from "./model/events/classes/FireEvent.js"


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
    static LOGIN = "login"
    static MAIN_MENU = "main-menu"
    static WORLD_MAP = "world-map"
    static EDITABLE_BATTLE_FIELD = "editable-battle-field"
    static FIGHT_BATTLE_FIELD = "fight-battle-field"
    static SETTINGS = "settings"
    static INFO = "info"


    constructor(props) {
        super(props)

        /**
         * @type {{   
         * mode:string,
         * game:Game, 
         * acceptChallengePrompt:boolean
         * }}
         */
        this.state = {
            mode: S.getInstance().get(S.USERNAME) ? App.MAIN_MENU : App.LOGIN,
            game: undefined,
            acceptChallengePrompt: false
        }

        //back button
        this.pagesHistoryStack = []
        this.baseHref = location.protocol + '//' + location.host + location.pathname
        this.currentHref = this.baseHref

        //start the event loop if logged in 
        if (S.getInstance().get(S.USERNAME)) {
            setInterval(this.eventLoop, 1000)
        }


    }

    render() {

        let view

        switch (this.state.mode) {
            case App.LOGIN:
                view = <Login onLogin={this.onLogin} />
                break
            case App.MAIN_MENU:
                view = <MainMenu goToWorldMap={() => { this.switchMode(App.WORLD_MAP) }} goToSettings={() => { this.switchMode(App.SETTINGS) }} goToInfo={() => { this.switchMode(App.INFO) }} challengeServer={this.challengeServer} />
                break
            case App.WORLD_MAP:
                view = <WorldMap getOnlineUsers={Server.instance().onlineUsers} challengeUser={this.challengeUser} getUsersXps={Server.instance().usersXps} />
                break
            case App.EDITABLE_BATTLE_FIELD:
                view = <EditableBattleField game={this.state.game} onReady={this.onReady} />
                break
            case App.FIGHT_BATTLE_FIELD:
                view = <FightBattleField game={this.state.game} sendFire={this.sendFire} />
                break
            case App.SETTINGS:
                view = <Settings />
                break
            case App.INFO:
                view = <Info />
                break
        }


        return (<div>

            <div style={this.state.acceptChallengePrompt ? Styles.visible : Styles.invisible}>
                <AcceptChallengePrompt game={this.state.game ?? {}} acceptChallenge={this.acceptChallenge} />
            </div>

            <GameOverPopup game={this.state.game} onDone={this.afterGameOver} />


            {view}
        </div>)
    }

    /**
     * 
     * @param {string} mode 
     * @param {*} args 
     */
    switchMode = (mode, args) => {

        // save state before changing
        this.pagesHistoryStack.push([this.state.mode])

        //update location
        location.href = this.baseHref + "#" + mode
        this.currentHref = location.href


        this.setState({ mode: mode })
    }

    onLogin = (username, password) => {
        S.getInstance().set(S.USERNAME, username)
        this.switchMode(App.MAIN_MENU, {})
        //start the event loop upon a successful login
        setInterval(this.eventLoop, 1000)
    }

    eventLoop = async () => {

        //handle events coming from the server
        let remoteEvents = await Server.instance().iAmOnline()
        remoteEvents.forEach(ev => {

            console.log("eventLoop()", "received event from server", ev)

            switch (ev.eventType) {
                case RemoteEvents.FIGHT_INVITE:
                    let g = this.newGame(ev.challenger, ev.defender, ev.gameId)
                    this.setState({ game: g, acceptChallengePrompt: true })
                    break
                case RemoteEvents.FIGHT_ACCEPT:

                    break
                case RemoteEvents.READY:

                    let gm = this.state.game
                    gm.setBattleUnits(gm.getOpponent(), ev.battleUnits.map(b => BattleUnitFactory.fromJson(b)))
                    this.setGame(gm)
                    break

                case RemoteEvents.FIRE: //incoming fire

                    let ga = this.state.game
                    let fireRes = ga.fireEvent(new FireEvent(ev))
                    ga.update()
                    Server.instance().fireAck(this.state.game, fireRes.victim, ev.id, fireRes.victimDead, ga.allDead())
                    break

                case RemoteEvents.FIRE_ACK:

                    let gam = this.state.game
                    gam.fireAckEvent(new FireAckEvent(ev))
                    gam.update()
                    break

                case RemoteEvents.GAME_OVER:
                    let g1 = this.state.game
                    g1.setGameOver(ev)
                    g1.update()
                    break

            }
        })

    }

    /**
     * local user challenges remote user
     * @param {string} defender  username 
     */
    challengeUser = (defender) => {
        let g = this.newGame(S.getInstance().get(S.USERNAME), defender, parseInt(999999 * Math.random()))
        this.setState({ game: g })
        Server.instance().fightInvite(g)
        this.switchMode(App.EDITABLE_BATTLE_FIELD)
    }

    acceptChallenge = () => {
        Server.instance().fightAccept(this.state.game)
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

        if (this.state.game.isMyTurn()) {
            Server.instance().fire(this.state.game, fromUnit, toUnit)
            let g = this.state.game
            g.animateBattleUnit(fromUnit, BattleUnit.STATE_ATTACKING)
            g.animateBattleUnit(toUnit, BattleUnit.STATE_TAKING_HIT)
            g.changeTurn()
            this.setGame(g)
        }

    }

    /**
     * Procedure to execute when a Game comes to its close.
     */
    afterGameOver = () => {
        this.switchMode(App.MAIN_MENU)
        this.setGame(undefined)
    }

    /**
     * Sets or updates the current Game in App's state.
     * @param {Game} game 
     */
    setGame = (game) => {
        this.setState({ game: game })
    }

    /**
     * Creates a new Game with App's setGame callback.
     * @param {string} challenger player who sends fight-invite
     * @param {string} defender player who sends back fight-accept
     * @param {int} gameId unique game id on server
     * @returns 
     */
    newGame = (challenger, defender, gameId) => {
        return new Game(challenger, defender, gameId, this.setGame)
    }


    challengeServer = () => {
        let gameId = parseInt(999999 * Math.random())
        let g = this.newGame(S.getInstance().get(S.USERNAME), gameId, gameId)
        this.setState({ game: g })
        Server.instance().pvc(g)
        this.switchMode(App.EDITABLE_BATTLE_FIELD)
    }

    abortGame = ()=>{
        Server.instance().abortGame()
        this.setGame(undefined)
    }

    componentDidMount() {

        //detect browser's back button
        setInterval(() => {

            if (this.currentHref != location.href) {

                this.currentHref = location.href
                let p = this.pagesHistoryStack.pop()

                if (p) {
                    this.setState({ mode: p[0] })
                }

            }

        }, 100);


        // abort game upon reload
        window.addEventListener('beforeunload', (e) => {
            this.abortGame()
        })


    }

}