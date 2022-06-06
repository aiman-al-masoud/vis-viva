import React, { Component } from "react";
import BattleUnit from "../model/BattleUnit.js";

/**
 */
export default class BattleUnitSprite extends Component {

    /**
     * 
     * @param {{battleUnit : BattleUnit,
     * invertedForEnemy:boolean}} props 
     */
    constructor(props) {
        super(props)
        this.props = props

        console.log("BattleUnit", this.props.battleUnit)
    }


    render() {

        return (<div>

                <div style={this.props.invertedForEnemy ? { transform: "scaleX(-1)" } : { transform: "scaleX(1)" }} >
                    <img src={this.props.battleUnit.getIcon()} className="battle-unit-sprite" />
                </div>

                <p>{this.props.battleUnit.health}</p>
            </div>)
    }
}