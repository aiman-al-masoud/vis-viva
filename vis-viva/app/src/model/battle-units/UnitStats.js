import React, { Component } from "react";


/**
 * Holds stats of a BattleUnit.
 */
export default class UnitStats{

    /**
     * 
     * @param {number} maxHealth 
     * @param {number} damage 
     * @param {number} missRate 
     * @param {number} dodgeRate 
     * @param {number} criticalHitRate 
     * @param {number} criticalHitMultiplier 
     */
    constructor(maxHealth, damage, missRate, dodgeRate, criticalHitRate, criticalHitMultiplier){
        this.maxHealth = maxHealth
        this.damage = damage
        this.missRate = missRate
        this.dodgeRate = dodgeRate
        this.criticalHitRate = criticalHitRate
        this.criticalHitMultiplier = criticalHitMultiplier
    }

    prettyPrintHtml(){
        return (<table>
            <tr><td>health:</td><td>{this.maxHealth}</td></tr>
            <tr><td>attack:</td><td>{this.damage}</td></tr>
            <tr><td>dodge:</td><td>{100*this.dodgeRate}%</td></tr>
            <tr><td>miss:</td><td>{100*this.missRate}%</td></tr>
            <tr><td>critical:</td><td>{100*this.criticalHitRate}%</td></tr>
        </table>)
    }


}