import BattleUnit from "../BattleUnit";
import IdlingIcon from "../../../res/icons/master/idle.gif"
import DyingIcon from "../../../res/icons/master/die.gif"
import AttackingIcon from "../../../res/icons/master/attack.gif"
import TakingHitIcon from "../../../res/icons/master/take-hit.gif"


export default class EliteSamurai  extends BattleUnit{

    static TYPE = "Master"

    /**
     * 
     * @param {number} initialHealth 
     */
    constructor(){
        super(EliteSamurai.TYPE, 40, 20)
        this.__idling_icon = IdlingIcon
        this.__dying_icon = DyingIcon
        this.__attacking_icon = AttackingIcon
        this.__taking_hit_icon = TakingHitIcon
    }


}