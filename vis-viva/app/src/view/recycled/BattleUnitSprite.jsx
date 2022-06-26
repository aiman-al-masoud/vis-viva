import React, { Component } from "react";
import BattleUnit from "../../model/battle-units/BattleUnit";

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

    }


    render() {

        return (<div>

            <div  >

                <div style={{ position: "relative" }}>

                    <img src={this.props.battleUnit.getIcon()} className="battle-unit-sprite" style={this.props.invertedForEnemy ? { transform: "scaleX(-1)" } : { transform: "scaleX(1)" }} />
                    <span style={{ position: "absolute", top: "50%", left: "50%", transform: " translate(-50%, -50%)", color:"red", fontFamily:"sans-serif", fontWeight:"bold" }}>{this.props.battleUnit.getTextMessage()}</span>

                </div>



            </div>

            {/* <p>{this.props.battleUnit.health}</p> */}
            {/* extract health bar component and make it colored and w/ hp number */}
            <progress id="health" value={this.props.battleUnit.health} max={this.props.battleUnit.maxHealth} style={this.props.invertedForEnemy ? { transform: "scaleX(-1)" } : { transform: "scaleX(1)" }}></progress>
            {/* <input type="range" max={this.props.battleUnit.maxHealth} value={this.props.battleUnit.health} /> */}
        </div>)
    }
}