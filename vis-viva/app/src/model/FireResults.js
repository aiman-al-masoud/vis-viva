import BattleUnit from "./battle-units/BattleUnit";

export default class FireResults {

    /**
     * 
     * @param {BattleUnit} victim 
     * @param {boolean} victimDead 
     * @param {boolean} allDead 
     * @param {boolean} miss 
     * @param {boolean} dodge 
     * @param {boolean} criticalHit 
     */
    constructor(victim, victimDead, allDead, miss, dodge, criticalHit) {
        this.victim = victim
        this.victimDead = victimDead
        this.allDead = allDead
        this.miss = miss
        this.dodge = dodge
        this.criticalHit = criticalHit
    }



}