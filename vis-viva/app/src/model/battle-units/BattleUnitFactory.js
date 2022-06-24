import BattleUnit from "./BattleUnit.js"
import Samurai from "./classes/Samurai.js"
const battleUnits = Object.fromEntries(require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/)).map(s => { return [s.default.TYPE, s.default] }))

export default class BattleUnitFactory {

    /**
     * Re-create an  existing BattleUnit.
     * @param {{
     * type : string,
     * health :number,
     * position : number,
     * faction : string
     * }} json 
     */
    static fromJson(json) {
        let b = BattleUnitFactory.new(json.type)
        // b = {...b, ...json} //nope: overrides methods!
        b.setFaction(json.faction)
        b.health = json.health
        b.position = json.position
        return b
    }

    /**
     * Create a new BattleUnit.
     * @param {string} type 
     * @returns {BattleUnit}
     */
    static new(type){
        return new battleUnits[type??Samurai.TYPE]()
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
        return Object.keys(battleUnits)
    }


}