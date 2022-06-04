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
        console.log("battle unit sprite render", this.props.battleUnit)
        return (<div>
            <div style={{ background: "black", width: "50px" }}>
                <p>Ciao!</p>
            </div>
        </div>)
    }
}