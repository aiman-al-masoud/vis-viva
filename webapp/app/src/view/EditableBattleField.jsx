import React, {Component} from "react";
import BattleUnit from "../model/BattleUnit.js";
import HalfChessboard from "./HalfChessboard.jsx";
import Game from "../model/Game.js";
import Settings from "../model/Settings.js";

/**
 */
export default class EditableBattleField extends Component{

    /**
     * 
     * @param {{
     * game:Game,
     * setBattleUnits:(battleUnits:[BattleUnit])=>Promise<void>
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        return (<div>
            <HalfChessboard battleUnits={this.props.game.getBattleUnits(Settings.getInstance().get(Settings.USERNAME))}  setBattleUnits={this.props.setBattleUnits} />
        </div>)
    }

}