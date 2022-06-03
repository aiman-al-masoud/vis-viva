import React, {Component} from "react";
import EditableBattleField from "./view/EditableBattleField.jsx";
import FightBattleField from "./view/FightBattleField.jsx";
import Login from "./view/Login.jsx";
import MainMenu from "./view/MainMenu.jsx";
import WorldMap from "./view/WorldMap.jsx";
import Game from "./model/Game.js"
import Settings from "./model/Settings.js";
import Server from "./model/Server.js";

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
            game : undefined
        }
    }

    render(){

        switch(this.state.mode){

            case App.LOGIN:
                return <Login onLogin={this.onLogin} />
            case App.MAIN_MENU:
                return <MainMenu  goToWorldMap={()=>{this.switchMode(App.WORLD_MAP)}} />
            case App.WORLD_MAP:
                return <WorldMap />
            case App.EDITABLE_BATTLE_FIELD:
                return <EditableBattleField />
            case App.FIGHT_BATTLE_FIELD:
                return <FightBattleField />

        }

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
       
        //deal with events coming from the server
        let events = await Server.instance().iAmOnline()
        console.log(events)

        //deal with locally generated events
        

    }




}