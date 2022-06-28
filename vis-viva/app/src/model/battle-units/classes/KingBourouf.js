import BattleUnit from "../BattleUnit.js";
const res = require.context('../../../../res/battle-units/king-bourouf', false, /\.(png|jpe?g|svg|mp3|gif)$/)

export default class KingBourouf  extends BattleUnit{

    static TYPE = "King Bourouf"
    static LIST_RANK = 3


    constructor(){
        super(KingBourouf.TYPE, 90, 40)
        this.importResources(res)
        this.__attack_duration = 800
        this.__die_duration = 1200
        this.__take_hit_duration = 800
        this.missRate = 0.1
        this.criticalHitRate = 0.2
        this.criticalHitMultiplier = 10
        this.dodgeRate = 0.3
    }

}