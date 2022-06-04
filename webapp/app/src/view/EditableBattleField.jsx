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
     * setGame:(game:Game)=>Promise<void>
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        return (<div>
            <HalfChessboard  getBattleUnit={this.getBattleUnit}  battleUnits={this.props.game.getBattleUnits(Settings.getInstance().get(Settings.USERNAME))}  setBattleUnits={this.setBattleUnits} />
        </div>)
    }

    getBattleUnit = ()=>{
        return new BattleUnit()
    }

    /**
     * 
     * @param {[BattleUnit]} battleUnits 
     */
    setBattleUnits = (battleUnits)=>{
        let g = this.props.game
        g.setBattleUnits(Settings.getInstance().get(Settings.USERNAME),   battleUnits)
        this.props.setGame(g)
    }




}