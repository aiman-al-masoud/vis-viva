import BattleUnit from "../BattleUnit.js";
import IdlingIcon from "../../../../res/icons/master/idle.gif"
import DyingIcon from "../../../../res/icons/master/die.gif"
import AttackingIcon from "../../../../res/icons/master/attack.gif"
import TakingHitIcon from "../../../../res/icons/master/take-hit.gif"
import AttackingSound from "../../../../res/attack.mp3"
import TakingHitSound from "../../../../res/damage1.mp3"

export default class Master extends BattleUnit {

    static TYPE = "Master"
    static LIST_RANK = 1

    /**
     * 
     * @param {number} initialHealth 
     */
    constructor() {
        super(Master.TYPE, 40, 20)
        this.__idling_icon = IdlingIcon
        this.__dying_icon = DyingIcon
        this.__attacking_icon = AttackingIcon
        this.__taking_hit_icon = TakingHitIcon
        this.__attacking_sound = AttackingSound
        this.__taking_hit_sound = TakingHitSound
        this.__attack_duration = 1200
        this.__die_duration = 1100
        this.__take_hit_duration = 800
    }


}