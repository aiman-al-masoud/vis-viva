import React, { Component } from "react";
import BattleUnit from "../../../model/battle-units/BattleUnit.js";
import HalfChessboard from "../../recycled/HalfChessboard.jsx";
import Game from "../../../model/Game.js";
import S from "../../../model/utils/Settings.js";
import BattleUnitsSelector from "./BattleUnitsSelector.jsx";
import BattleUnitFactory from "../../../model/battle-units/BattleUnitFactory.js";
import Button from "../../recycled/Button.jsx"

import FightIcon from "../../../../res/icons/icons/fight.png"
import BackgroundImage from "../../../../res/icons/backgrounds/bg1.png"


/**
 * Lets the user prepare his/her HalfChessboard before a battle.
 */
export default class EditableBattleField extends Component {

    /**
     * 
     * @param {{
     * game:Game,
     * onReady : ()=> Promise<void>
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            selectedBattleUnitType: undefined
        }
    }

    render() {
        return (<div style={{ backgroundImage: `url(${BackgroundImage})`, backgroundSize: "cover" }}>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }} >
                <h1>Field your troops!</h1>
                <div className="center">
                    <Button title="Ready!" onClick={this.props.onReady} icon={FightIcon} style={{ background: "red" }} />
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }} >
                <HalfChessboard battleUnits={this.props.game.getBattleUnits(S.getInstance().get(S.USERNAME))} onClickSquare={this.onClickSquare} />
                <BattleUnitsSelector selectedType={this.state.selectedBattleUnitType} getIcon={BattleUnitFactory.getIconFor} types={BattleUnitFactory.getTypes()} selectType={this.selectBattleUnitType} />
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
            this.removeBattleUnit(squareContent)
        }
    }

    /**
     * Adds a new BattleUnit in the position/Square referenced in the argument.
     * @param {number} squareId 
     */
    addBattleUnit = (squareId) => {
        let g = this.props.game
        let b = this.createNewBattleUnit()
        b.setFaction(S.getInstance().get(S.USERNAME))
        b.position = squareId
        g.addBattleUnit(b)
        g.update()
    }
    
    /**
     * 
     * @param {BattleUnit} battleUnit 
     */
    removeBattleUnit = (battleUnit) => {
        let g = this.props.game
        g.removeBattleUnit(battleUnit)
        g.update()
    }

    /**
     * 
     * @returns {BattleUnit}
     */
    createNewBattleUnit = () => {
        return BattleUnitFactory.new(this.state.selectedBattleUnitType)
    }

    /**
     * 
     * @param {string} type 
     */
    selectBattleUnitType = (type) => {
        this.setState({ selectedBattleUnitType: type })
    }


}