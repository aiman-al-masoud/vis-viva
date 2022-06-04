import React, {Component} from "react";
import EditableBattleField from "./view/EditableBattleField.jsx";
import FightBattleField from "./view/FightBattleField.jsx";
import Login from "./view/Login.jsx";
import MainMenu from "./view/MainMenu.jsx";
import WorldMap from "./view/WorldMap.jsx";
import Game from "./model/Game.js"
import Settings from "./model/Settings.js";
import Server from "./model/Server.js";
import AcceptChallengePrompt from "./view/AcceptChallengePrompt.jsx";
import Styles from "./view/Styles.js"
import LocalEvents from "./model/LocalEvents.js";
import RemoteEvents from "./model/RemoteEvents.js";


/**
 * All of the state *everywhere* is managed *solely* by App.
 * 
 * Root of everything, handles events (both inbound and outbound).
 * Sprites (and other components) and Server issue events, App alone acts on events
 * All graphical updates are triggered by App, based on the relevant events.
 * App modifies the Game object (passed down to all children of App).
 * 
 */
export default class App extends Component{

    //modes or 'pages' of the App
    static LOGIN = "LOGIN"
    static MAIN_MENU = "MAIN_MENU"
    static WORLD_MAP = "WORLD_MAP"
    static EDITABLE_BATTLE_FIELD = "EDITABLE_BATTLE_FIELD"
    static FIGHT_BATTLE_FIELD = "FIGHT_BATTLE_FIELD"

    constructor(props){
        super(props)

        this.state = {
            mode : App.LOGIN,
            myUsername : undefined,
            game : undefined,
            acceptChallengePrompt : false
        }
    }

    render(){

        let view

        switch(this.state.mode){
            case App.LOGIN:
                view =  <Login onLogin={this.onLogin} />
                break
            case App.MAIN_MENU:
                view = <MainMenu goToWorldMap={()=>{this.switchMode(App.WORLD_MAP)}} />
                break
            case App.WORLD_MAP:
                view =  <WorldMap getOnlineUsers={Server.instance().onlineUsers}  challengeUser={this.challengeUser} />
                break
            case App.EDITABLE_BATTLE_FIELD:
                view = <EditableBattleField game={this.state.game} setGame={this.setGame} />
                break
            case App.FIGHT_BATTLE_FIELD:
                view = <FightBattleField />
                break
        }


        return (<div>

            <div style={this.state.acceptChallengePrompt?Styles.visible: Styles.invisible}>
            <AcceptChallengePrompt game={this.state.game??{}} acceptChallenge={this.acceptChallenge} />
            </div>

            {view}
        </div>)
    }

    /**
     * 
     * @param {string} mode 
     * @param {*} args 
     */
    switchMode = (mode, args)=>{
        this.setState({mode: mode})
    }

    onLogin = (username, password)=>{
        Settings.getInstance().set(Settings.USERNAME, username)
        this.switchMode(App.MAIN_MENU, {})
        //start the event loop upon a successful login
        setInterval(this.eventLoop, 1000);
    }

    eventLoop = async ()=>{
       
        //handle events coming from the server
        let remoteEvents = await Server.instance().iAmOnline()
        remoteEvents.forEach(ev=>{
            console.log(ev)

            switch(ev.eventType){
                case RemoteEvents.FIGHT_INVITE:
                    let g = new Game(ev.challenger, ev.defender, ev.gameId)
                    this.setState({ game: g , acceptChallengePrompt : true})
                    break
            }
        })

        //handle events generated locally
        let localEvents = LocalEvents.get()
        localEvents.forEach(ev=>{
            console.log(ev)
        })

    }

    /**
     * local user challenges remote user
     * @param {string} defender  username 
     */
    challengeUser = (defender)=>{
        let g = new Game( Settings.getInstance().get(Settings.USERNAME) , defender,   parseInt(999999*Math.random()) )
        this.setState({game:g})
        Server.instance().fightInvite(g)
        //go to EditableBattleField 
        this.switchMode(App.EDITABLE_BATTLE_FIELD)
    }

    acceptChallenge = ()=>{
        Server.instance().fightAccept(this.state.game)
        //go to EditableBattleField 
        this.switchMode(App.EDITABLE_BATTLE_FIELD)
        this.setState({acceptChallengePrompt :false})
    }

    /**
     * 
     * @param {Game} game 
     */
    setGame = (game)=>{
        this.setState({game: game})
    }



}