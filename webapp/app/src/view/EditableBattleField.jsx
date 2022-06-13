import React, { Component } from "react";
import BattleUnit from "../model/BattleUnit.js";
import HalfChessboard from "./HalfChessboard.jsx";
import Game from "../model/Game.js";
import S from "../model/Settings.js";
import Samurai from "../model/battle-units/Samurai.js";
import BackgroundImage from "../../res/icons/backgrounds/bg1.png"
import BattleUnitsSelector from "./BattleUnitsSelector.jsx";
import BattleUnitFactory from "../model/BattleUnitFactory.js";
import Button from "../view/Button.jsx"
import FightIcon from "../../res/icons/icons/fight.png"


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

        this.state = {
            selectedBattleUnitType  : BattleUnitFactory.SAMURAI
        }
    }

    render() {
        return (<div style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover" }}>
            

            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }} >
            <h1>Field your troops!</h1>

            <div className="center">
            <Button title="Ready!" onClick={this.props.onReady}  icon={FightIcon}  style={{background:"red"}} />

            </div>

            </div>

            


            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }} >
                <HalfChessboard battleUnits={this.props.game.getBattleUnits(S.getInstance().get(S.USERNAME))} onClickSquare={this.onClickSquare} />
                <BattleUnitsSelector selectedType={this.state.selectedBattleUnitType} getIcon={BattleUnitFactory.getIconFor} types={BattleUnitFactory.getTypes()}  selectType={ this.selectBattleUnitType } />
            </div>

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
        if (!squareContent) {
            this.addBattleUnit(squareId)
        } else {
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
        // return new Samurai()
        return BattleUnitFactory.new(this.state.selectedBattleUnitType)
    }

    /**
     * 
     * @param {string} type 
     */
    selectBattleUnitType = (type)=>{
        this.setState({selectedBattleUnitType : type})
    }






}