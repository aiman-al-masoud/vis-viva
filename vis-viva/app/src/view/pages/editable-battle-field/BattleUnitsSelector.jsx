import React, { Component } from "react";
import Button from "../../recycled/Button.jsx";
import ArrowIcon from "../../../../res/icons/arrow.png"
import UnitStats from "../../../model/battle-units/UnitStats.js";

/**
 */
export default class BattleUnitsSelector extends Component {

    /**
     * 
     * @param {{
     * getIcon:(string)=>string,
     * selectedType:string,
     * types:[string],
     * selectType:(string)=>Promise<void>,
     * getTypeStats : (string)=>UnitStats
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {

        return (<div style={{ padding: 0, margin: 0, width: "fit-content" }}>

            <center>
                <h2>{this.props.selectedType}</h2>


                <div style={{ display: "grid", gridTemplateColumns: "auto 4vw" }} >
                    <img src={this.props.getIcon(this.props.selectedType)} width="200" />
                    {this.props.getTypeStats(this.props.selectedType).prettyPrintHtml()}
                </div>

                <Button onClick={this.prev} title="Previous" icon={ArrowIcon} flippedX={true} />
                <Button onClick={this.next} title="Next" icon={ArrowIcon} />
            </center>

        </div>)
    }


    next = () => {
        let currIndex = this.props.types.indexOf(this.props.selectedType)
        return this.props.selectType(this.props.types[currIndex + 1] ?? this.props.selectedType)
    }

    prev = () => {
        let currIndex = this.props.types.indexOf(this.props.selectedType)
        return this.props.selectType(this.props.types[currIndex - 1] ?? this.props.selectedType)
    }


}