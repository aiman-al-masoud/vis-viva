import React, { Component } from "react";
import Game from "../model/Game.js";
import HalfChessboard from "./HalfChessboard.jsx";
import S from "../model/Settings.js";


/**
 * 
 */
export default class FightBattleField extends Component {

    /**
    * 
    * @param {{
     * game : Game,
     * setGame:(game:Game)=>Promise<void>
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }


    render() {

        return (<div>
            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }} >
                <HalfChessboard battleUnits={  this.props.game.getBattleUnits(S.getInstance().get(S.USERNAME))  }/>
                <HalfChessboard battleUnits={  this.props.game.getBattleUnits(this.props.game.getOpponent()) }   invertedForEnemy={true}  />
            </div>
        </div>)
    }
}