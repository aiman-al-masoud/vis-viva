import React, {Component} from "react";
import EditableBattleField from "./view/EditableBattleField.jsx";
import FightBattleField from "./view/FightBattleField.jsx";
import Login from "./view/Login.jsx";
import MainMenu from "./view/MainMenu.jsx";
import WorldMap from "./view/WorldMap.jsx";
import Game from "./model/Game.js"

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
                return <Login />
            case App.MAIN_MENU:
                return <MainMenu />
            case App.WORLD_MAP:
                return <WorldMap />
            case App.EDITABLE_BATTLE_FIELD:
                return <EditableBattleField />
            case App.FIGHT_BATTLE_FIELD:
                return <FightBattleField />

        }

        return <h1>Hello world, this is App!</h1>
    }

    switchMode(mode, args){
        this.setState({mode: mode})
    }



}