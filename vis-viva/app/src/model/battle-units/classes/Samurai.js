import BattleUnit from "../BattleUnit.js"
const res = require.context('../../../../res/battle-units/samurai', false, /\.(png|jpe?g|svg|mp3|gif)$/)

export default class Samurai  extends BattleUnit{

    static TYPE = "Samurai"
    static LIST_RANK = 0


    constructor(){
        super(Samurai.TYPE, 50, 15)
        this.importResources(res)
        this.__attack_duration = 800
        this.__die_duration = 1300
        this.__take_hit_duration = 600
        this.missRate = 0.2
        this.criticalHitRate = 0.6
        this.criticalHitMultiplier = 2
        this.dodgeRate = 0.2
    }

}