import React, { Component } from "react";
import UnitStats from "../../../model/battle-units/UnitStats.js";
import L from "../../../model/utils/Language.js";

/**
 */
export default class UnitStatsTable extends Component {

    /**
     * 
     * @param {{
     * unitStats:UnitStats 
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {
        return (<div style={{fontFamily:"'Samurai', Arial", textAlign:"left",background:"rgba(255, 255, 255, 0.318)", width:"fit-content", height:"fit-content"  }}>
            <tr><td>{L.health_stat}:</td><td>{this.props.unitStats.maxHealth}</td></tr>
            <tr><td>{L.attack_stat}:</td><td>{this.props.unitStats.damage}</td></tr>
            <tr><td>{L.dodge_stat}:</td><td>{100 * this.props.unitStats.dodgeRate}%</td></tr>
            <tr><td>{L.miss_stat}:</td><td>{100 * this.props.unitStats.missRate}%</td></tr>
            <tr><td>{L.critical_hit_rate_stat}:</td><td>{100 * this.props.unitStats.criticalHitRate}%</td></tr>
        </div>)
    }




}