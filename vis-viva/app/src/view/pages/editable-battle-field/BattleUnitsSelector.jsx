import React, { Component } from "react";
import Button from "../../recycled/Button.jsx";
import ArrowIcon from "../../../../res/icons/arrow.png"
import UnitStats from "../../../model/battle-units/UnitStats.js";
import UnitStatsTable from "./UnitStatsTable.jsx";

/**
 */
export default class BattleUnitsSelector extends Component {

    /**
     * 
     * @param {{
     * getIcon:(string)=>string,
     * getDescription:(string)=>string,
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
                <h2 style={{fontFamily:'"Samurai", Arial', fontSize:"x-large"}}>{this.props.selectedType}</h2>


                <div style={{ display: "grid", gridTemplateColumns: "auto 4vw" }} >
                    <div style={{ inlineSize: "30vw", margin: "0" }}>
                        <img src={this.props.getIcon(this.props.selectedType)} width="200" />
                        <p style={{ overflowWrap: "break-word", inlineSize: "20vw", textAlign: "left", fontFamily:'"Samurai", Arial', background:"rgba(255, 255, 255, 0.318)" }}>{this.props.getDescription(this.props.selectedType)}</p>
                    </div>
                    <UnitStatsTable unitStats={this.props.getTypeStats(this.props.selectedType)} />
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