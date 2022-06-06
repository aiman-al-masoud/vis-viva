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
    }


    render() {
        
        return (<div>
            {/* <div> */}
                <img src={this.props.battleUnit.getIcon()} className="battle-unit-sprite"  />
            {/* </div> */}
            <p>{this.props.battleUnit.health}</p>
        </div>)
    }
}