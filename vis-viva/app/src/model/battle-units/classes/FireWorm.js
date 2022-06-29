import BattleUnit from "../BattleUnit.js";
import L from "../../utils/Language.js";
const res = require.context('../../../../res/battle-units/fire-worm', false, /\.(png|jpe?g|svg|mp3|gif)$/)

export default class FireWorm  extends BattleUnit{

    static TYPE = "Fire Worm"
    static LIST_RANK = 2


    constructor(){
        super(FireWorm.TYPE, 100, 15)
        this.importResources(res)
        this.__attack_duration = 1600
        this.__die_duration = 1500
        this.__take_hit_duration = 600
        this.missRate = 0.3
        this.criticalHitRate = 0.8
        this.criticalHitMultiplier = 3
        this.dodgeRate = 0.1
        this.description = L.fire_worm_description
    }

}