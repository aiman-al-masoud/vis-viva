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
            <div style={{ background: "black", width: "50px" }}>
                <p>Ciao!</p>
            </div>
            <p>{this.props.battleUnit.health}</p>
        </div>)
    }
}