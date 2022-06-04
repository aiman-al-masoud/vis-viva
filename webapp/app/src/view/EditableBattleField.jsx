import React, {Component} from "react";
import BattleUnit from "../model/BattleUnit.js";

/**
 */
export default class EditableBattleField extends Component{

    /**
     * 
     * @param {{
     * game:Game,
     * setBattleUnits:(battleUnits:[BattleUnit])=>Promise<void>
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        return <h1>Hello world, this is EditableBattleField!</h1>
    }

}