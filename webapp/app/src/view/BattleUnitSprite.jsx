import React, { Component } from "react";
import BattleUnit from "../model/BattleUnit.js";

/**
 */
export default class BattleUnitSprite extends Component {

    /**
     * 
     * @param {{battleUnit : BattleUnit}} props 
     */
    constructor(props) {
        super(props)
        this.props = props

        console.log("BattleUnit", this.props.battleUnit)
    }


    render() {
        
        return (<div>
            <img src={this.props.battleUnit.getIcon()  } className="battle-unit-sprite"  />
            <p>{this.props.battleUnit.health}</p>
        </div>)
    }
}