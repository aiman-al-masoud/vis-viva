import BattleUnit from "../BattleUnit.js";
// import IdlingIcon from "../../../../res/icons/fire-worm/idle.gif"
// import DyingIcon from "../../../../res/icons/fire-worm/die.gif"
// import AttackingIcon from "../../../../res/icons/fire-worm/attack.gif"
// import TakingHitIcon from "../../../../res/icons/fire-worm/take-hit.gif"
// import AttackingSound from "../../../../res/attack2.mp3"
// import TakingHitSound from "../../../../res/damage2.mp3"

const res = require.context('../../../../res/battle-units/fire-worm', false, /\.(png|jpe?g|svg|mp3|gif)$/)


export default class FireWorm  extends BattleUnit{

    static TYPE = "Fire Worm"
    static LIST_RANK = 2

    /**
     * 
     * @param {number} initialHealth 
     */
    constructor(){
        super(FireWorm.TYPE, 100, 15)
        this.importResources(res)
        // this.__idling_icon = IdlingIcon
        // this.__dying_icon = DyingIcon
        // this.__attacking_icon = AttackingIcon
        // this.__taking_hit_icon = TakingHitIcon
        // this.__attacking_sound = AttackingSound
        // this.__taking_hit_sound = TakingHitSound
        this.__attack_duration = 1600
        this.__die_duration = 1500
        this.__take_hit_duration = 600
    }


}