import React, { Component } from "react";


/**
 */
export default class BattleUnitsSelector extends Component {

    /**
     * 
     * @param {{
     * getIcon:(string)=>string,
     * selectedType:string,
     * types:[string],
     * selectType:(string)=>Promise<void>
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){

        return (<div>
            <img src={this.props.getIcon(this.props.selectedType)} width="200"/>
            <p>{this.props.selectedType}</p>
            <button onClick={this.prev}>Previous</button>
            <button onClick={this.next}>Next</button>
        </div>)
    }


    next = ()=>{
        let currIndex = this.props.types.indexOf(this.props.selectedType)
        return this.props.selectType(this.props.types[currIndex+1] ?? this.props.selectedType)
    }

    prev = ()=>{
        let currIndex = this.props.types.indexOf(this.props.selectedType)
        return this.props.selectType(this.props.types[currIndex-1] ?? this.props.selectedType)
    }

    
}