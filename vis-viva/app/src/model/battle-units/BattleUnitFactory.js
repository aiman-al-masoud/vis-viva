import BattleUnit from "./BattleUnit.js"
const battleUnits = Object.fromEntries(require.context("./classes", false, /.js$/).keys().map(require.context("./classes", false, /.js$/)).map(s => { return [s.default.TYPE, s.default] }))
const battleUnitTypes = Object.keys(battleUnits).sort((b1, b2)=> battleUnits[b1].LIST_RANK - battleUnits[b2].LIST_RANK )

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
        return new battleUnits[type]()
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
        return battleUnitTypes
    }

    /**
     * 
     * @returns {string}
     */
    static getDefaultType(){
        return battleUnitTypes[0]
    }

    /**
     * @returns {string}
     */
    static getDescriptionFor(type){
        return BattleUnitFactory.new(type).getDescription()
    }


}