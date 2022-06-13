import React, { Component } from "react";
import Button from "../view/Button.jsx"
import ArrowIcon from "../../res/icons/icons/arrow.png"

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

        return (<div style={{padding:0, margin:0, width:"fit-content"}}>

            <center>
            <h2>{this.props.selectedType}</h2>
                <img src={this.props.getIcon(this.props.selectedType)} width="200"/>
                <br />
                <Button onClick={this.prev} title="Previous"  icon={ArrowIcon}  flippedX={true} />
                <Button onClick={this.next} title="Next"  icon={ArrowIcon}  />
            </center>
           
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