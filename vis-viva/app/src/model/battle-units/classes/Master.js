import BattleUnit from "../BattleUnit.js";
const res = require.context('../../../../res/battle-units/master', false, /\.(png|jpe?g|svg|mp3|gif)$/)

export default class Master extends BattleUnit {

    static TYPE = "Master"
    static LIST_RANK = 1


    constructor() {
        super(Master.TYPE, 40, 30)
        this.importResources(res)
        this.__attack_duration = 1200
        this.__die_duration = 1100
        this.__take_hit_duration = 800
        this.missRate = 0.1
        this.criticalHitRate = 0.7
        this.criticalHitMultiplier = 2.5
        this.dodgeRate = 0.3
    }

}