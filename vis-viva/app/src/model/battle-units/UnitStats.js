import React, { Component } from "react";
import L from "../utils/Language.js";

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

}