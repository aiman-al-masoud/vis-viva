import BattleUnit from "../BattleUnit";
import IdlingIcon from "../../../res/icons/samurai/idle.gif"
import DyingIcon from "../../../res/icons/samurai/die.gif"
import AttackingIcon from "../../../res/icons/samurai/attack.gif"
import TakingHitIcon from "../../../res/icons/samurai/take-hit.gif"


export default class Samurai  extends BattleUnit{

    static TYPE = "Samurai"

    /**
     * 
     * @param {number} initialHealth 
     */
    constructor(){
        super(Samurai.TYPE,100)
        this.__idling_icon = IdlingIcon
        this.__dying_icon = DyingIcon
        this.__attacking_icon = AttackingIcon
        this.__taking_hit_icon = TakingHitIcon
    }


}