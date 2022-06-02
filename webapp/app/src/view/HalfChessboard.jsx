import React, {Component} from "react";
import BattleUnit from "../model/BattleUnit.js";
import BattleUnitSprite from "./BattleUnitSprite.jsx";

/**
 */
export default class HalfChessboard extends Component{

    /**
     * 
     * @param {{
     * battleUnits : [BattleUnit]
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){

        return (
            <div style={{display: "grid"}}>
                {this.props.battleUnits.sort( (b1,b2) => b1.position - b2.position).map(b=>  <BattleUnitSprite battleUnit={b} /> )}
            </div>
        )
    }
}