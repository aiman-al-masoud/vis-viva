import React, {Component} from "react";
import BattleUnit from "../model/BattleUnit.js";

/**
 */
export default class BattleUnitSprite extends Component{

    /**
     * 
     * @param {{battleUnit : BattleUnit}} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }


    render(){
        return <h1>Hello world, this is BattleUnitSprite!</h1>
    }
}