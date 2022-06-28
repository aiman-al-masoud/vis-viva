import BattleUnit from "../BattleUnit.js";
const res = require.context('../../../../res/battle-units/mushroom', false, /\.(png|jpe?g|svg|mp3|gif)$/)

export default class Mushroom  extends BattleUnit{

    static TYPE = "Mushroom"
    static LIST_RANK = 4


    constructor(){
        super(Mushroom.TYPE, 60, 20)
        this.importResources(res)
        this.__attack_duration = 1600
        this.__die_duration = 800
        this.__take_hit_duration = 800
        this.missRate = 0.1
        this.criticalHitRate = 0.9
        this.criticalHitMultiplier = 4
        this.dodgeRate = 0
    }

}