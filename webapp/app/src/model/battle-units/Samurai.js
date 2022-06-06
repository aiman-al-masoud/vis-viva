import BattleUnit from "../BattleUnit";
import IdlingIcon from "../../../res/icons/samurai/idling.gif"
import DyingIcon from "../../../res/icons/samurai/dying.gif"
import AttackingIcon from "../../../res/icons/samurai/attacking.gif"
import TakingHitIcon from "../../../res/icons/samurai/taking-hit.gif"


export default class Samurai  extends BattleUnit{

    constructor(){
        super("Samurai", 100)
        this.__idling_icon = IdlingIcon
        this.__dying_icon = DyingIcon
        this.__attacking_icon = AttackingIcon
        this.__taking_hit_icon = TakingHitIcon
    }


}