import React, { Component } from "react";
import BattleUnit from "../model/BattleUnit.js";
import HalfChessboard from "./HalfChessboard.jsx";
import Game from "../model/Game.js";
import S from "../model/Settings.js";
import Samurai from "../model/battle-units/Samurai.js";

/**
 */
export default class EditableBattleField extends Component {

    /**
     * 
     * @param {{
     * game:Game,
     * setGame:(game:Game)=>Promise<void>,
     * onReady : ()=> Promise<void>
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (<div>
            <h1>Field your troops!</h1>
            <button onClick={this.props.onReady}>Ready!</button>
            <HalfChessboard battleUnits={this.props.game.getBattleUnits(S.getInstance().get(S.USERNAME))} onClickSquare={this.onClickSquare} />
        </div>)
    }

    getBattleUnit = () => {
        return new BattleUnit()
    }

    /**
     * Decides what happens when a square-clicked event bubbles up to this component.
     * @param {number} squareId 
     * @param {BattleUnit?} squareContent 
     */
    onClickSquare = (squareId, squareContent) => {
        if(!squareContent){
            this.addBattleUnit(squareId)
        }else{
            this.removeBattleUnit(squareId)
        }
    }

    /**
     * Adds a new BattleUnit in the position/Square referenced in the argument.
     * @param {number} squareId 
     */
    addBattleUnit = (squareId) => {
        let g = this.props.game
        let b = this.createNewBattleUnit()
        b.position = squareId
        let battleUnits = g.getBattleUnits(S.getInstance().get(S.USERNAME))
        battleUnits = battleUnits.filter(b => b.position != squareId)
        battleUnits.push(b)
        g.setBattleUnits(S.getInstance().get(S.USERNAME), battleUnits)
        this.props.setGame(g)
    }

    /**
     * 
     * @param {number} squareId 
     */
    removeBattleUnit = (squareId) => {
        let g = this.props.game
        let battleUnits = g.getBattleUnits(S.getInstance().get(S.USERNAME))
        battleUnits = battleUnits.filter(b => b.position != squareId)
        g.setBattleUnits(S.getInstance().get(S.USERNAME), battleUnits)
        this.props.setGame(g)
    }

    /**
     * 
     * @returns {BattleUnit}
     */
    createNewBattleUnit = () => {
        return new Samurai()
    }


}