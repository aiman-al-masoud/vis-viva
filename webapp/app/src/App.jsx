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
import RemoteEvents from "./model/RemoteEvents.js";
import BattleUnit from "./model/BattleUnit.js"
import BattleUnitFactory from "./model/BattleUnitFactory.js";
import Settings from "../src/view/Settings.jsx";
import Info from "./view/Info.jsx";
import GameOverPopup from "./view/GameOverPopup.jsx";


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


        this.state = {
            mode: S.getInstance().get(S.USERNAME)? App.MAIN_MENU : App.LOGIN  ,
            myUsername: undefined,
            game: new Game(),
            acceptChallengePrompt: false
        }



        //back button
        this.pagesHistoryStack = [ ]
        this.baseHref = location.protocol + '//' + location.host + location.pathname
        this.currentHref = this.baseHref




    }

    render() {

        let view

        switch (this.state.mode) {
            case App.LOGIN:
                view = <Login onLogin={this.onLogin} />
                break
            case App.MAIN_MENU:
                view = <MainMenu    goToWorldMap={() => { this.switchMode(App.WORLD_MAP) }}  goToSettings={()=>{this.switchMode(App.SETTINGS)}}  goToInfo={()=>{this.switchMode(App.INFO)}}    challengeServer={this.challengeServer}   />
                break
            case App.WORLD_MAP:
                view = <WorldMap getOnlineUsers={Server.instance().onlineUsers} challengeUser={this.challengeUser}  getUsersXps={Server.instance().usersXps} />
                break
            case App.EDITABLE_BATTLE_FIELD:
                view = <EditableBattleField game={this.state.game} setGame={this.setGame} onReady={this.onReady} />
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

            <GameOverPopup game={this.state.game ?? {}}  onDone={this.afterGameOver} />

            
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
        this.pagesHistoryStack.push( [this.state.mode] )

        //update location
        location.href = this.baseHref+"#"+mode
        this.currentHref = location.href
        

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

            console.log("event:", ev)


            switch (ev.eventType) {
                case RemoteEvents.FIGHT_INVITE:
                    let g = new Game(ev.challenger, ev.defender, ev.gameId, this.setGame)
                    this.setState({ game: g, acceptChallengePrompt: true })
                    break
                case RemoteEvents.FIGHT_ACCEPT:

                    break
                case RemoteEvents.READY:
                    console.log("ready event", ev)

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
                            b.health -= fromUnit.damage
                            victim = b
                            if (b.health <= 0) {
                                victimDead = true
                            }
                        }
                    })

                    if (victimDead) {
                        console.log("victim is dead")
                        ga.killBattleUnit(toUnit, false)
                    }else{
                        ga.animateBattleUnit(toUnit, BattleUnit.STATE_TAKING_HIT)
                        ga.setBattleUnits(S.getInstance().get(S.USERNAME), battleUnits)
                    }

                    ga.animateBattleUnit(fromUnit, BattleUnit.STATE_ATTACKING, true)
                    ga.changeTurn()
                    this.setGame(ga)

                    Server.instance().fireAck(this.state.game, victim, ev.id, victimDead,   (battleUnits.map(x=> x?1:0 ).reduce((a,b)=>a+b)<=1) && victimDead   )
                    
                    break

                case RemoteEvents.FIRE_ACK:

                    let gam = this.state.game
                    let enemyBs = gam.getBattleUnits(gam.getOpponent())
                    let toUnit1 = BattleUnitFactory.fromJson(ev.toUnit)

                    if (ev.toUnit.health > 0) {
                        enemyBs = enemyBs.filter(b => b.position != toUnit1.position)
                        enemyBs.push(toUnit1)
                        gam.setBattleUnits(gam.getOpponent(), enemyBs)
                    }else{
                        gam.killBattleUnit(toUnit1,true)
                    }

                    this.setGame(gam)
                    break

                case RemoteEvents.GAME_OVER:
                    let g1 = this.state.game
                    g1.setGameOver(ev.winner)
                    this.setGame(g1)
                    break

            }
        })

    }

    /**
     * local user challenges remote user
     * @param {string} defender  username 
     */
    challengeUser = (defender) => {
        let g = new Game(S.getInstance().get(S.USERNAME), defender, parseInt(999999 * Math.random()) , this.setGame )
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

        if(this.state.game.isMyTurn()){
            Server.instance().fire(this.state.game, fromUnit, toUnit)
            let g = this.state.game
            g.animateBattleUnit(fromUnit, BattleUnit.STATE_ATTACKING)
            g.animateBattleUnit(toUnit, BattleUnit.STATE_TAKING_HIT, true)
            g.changeTurn()
            this.setGame(g)
        }

    }

    afterGameOver = ()=>{
        this.switchMode(App.MAIN_MENU)
        this.setGame(new Game())
    }

    /**
     * 
     * @param {Game} game 
     */
    setGame = (game) => {
        this.setState({ game: game })
    }



    challengeServer = ()=>{
        console.log("challenge Server called")
        let gameId = parseInt(999999 * Math.random())
        let g = new Game(S.getInstance().get(S.USERNAME), gameId, gameId, this.setGame)
        this.setState({ game: g })
        Server.instance().pvc(g)
        this.switchMode(App.EDITABLE_BATTLE_FIELD)
    }
    


    componentDidMount(){

            //detect browser's back button
            setInterval(() => {
        
            if(this.currentHref!=location.href){
                
                this.currentHref = location.href
                let  p = this.pagesHistoryStack.pop()

                if(p){
                    this.setState({ mode: p[0]})
                }

            }

        }, 100);
    }

}