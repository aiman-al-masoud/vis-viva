import BattleUnit from "./BattleUnit.js"

export default class Game{

    /**
     * 
     * @param {string} challenger 
     * @param {string} defender 
     * @param {int} gameId 
     */
    constructor(challenger, defender, gameId){
        this.challenger = challenger
        this.defender = defender
        this.gameId = gameId 
        this.__battleUnitsDictionary = {}
    }

    /**
     * 
     * @param {[BattleUnit]} battleUnits 
     */
    setBattleUnits(username, battleUnits){
        this.__battleUnitsDictionary[username] = battleUnits 
    }

    /**
     * 
     * @param {string} username 
     * @returns {BattleUnit} 
     */
    getBattleUnits(username){
        return this.__battleUnitsDictionary[username]
    }

    /**
     * @returns {string}
     */
    getOpponent(){
        //check with cookies or localStorage or ...   
    }

}