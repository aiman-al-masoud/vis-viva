import React, { Component } from "react";


/**
 */
export default class BattleUnitsSelector extends Component {

    /**
     * 
     * @param {{
     * getIcon:(string)=>string,
     * selectedType:string
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){

        this.props.icons

        return (<div>

            <img src={this.props.getIcon(this.props.selectedType)} width="200"/>
            <p>{this.props.selectedType}</p>
            <button >Previous</button>
            <button >Next</button>
        </div>)
    }

    
}