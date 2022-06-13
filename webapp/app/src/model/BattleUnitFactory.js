import Samurai from "./battle-units/Samurai.js";
import EliteSamurai from "./battle-units/EliteSamurai.js";
import FireWorm from "./battle-units/FireWorm.js";

export default class BattleUnitFactory {

    /**
     * BattleUnit Types
     */
    static SAMURAI = Samurai.TYPE
    static ELITE_SAMURAI = EliteSamurai.TYPE
    static FIRE_WORM = FireWorm.TYPE

    /**
     * Re-create an  existing BattleUnit.
     * @param {{
     * type : string,
     * health :number,
     * position : number 
     * }} json 
     */
    static fromJson(json) {
        let b = BattleUnitFactory.new(json.type)
        b = {...b, ...json}
        return b
    }

    /**
     * Create a new BattleUnit.
     * @param {string} type 
     * @returns {BattleUnit}
     */
    static new(type){
        switch(type){
            case BattleUnitFactory.SAMURAI:
                return new Samurai()
            case BattleUnitFactory.ELITE_SAMURAI:
                return new EliteSamurai()
            case BattleUnitFactory.FIRE_WORM:
                return new FireWorm()
        }
    }

    /**
     * 
     * @param {string} type BattleUnit type
     * @returns {string} url or base64 of icon
     */
    static getIconFor(type){
        return BattleUnitFactory.new(type).__idling_icon
    }

    /**
     * 
     * @returns {[string]}
     */
    static getTypes(){
        return [ BattleUnitFactory.SAMURAI, BattleUnitFactory.ELITE_SAMURAI, BattleUnitFactory.FIRE_WORM ]
    }


}