import BattleUnit from "./BattleUnit.js"
import S from "./Settings.js"

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
        this.__battleUnitsDictionary = { }
        this.__battleUnitsDictionary[challenger] = []
        this.__battleUnitsDictionary[defender] = []
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
     * @returns {[BattleUnit]} 
     */
    getBattleUnits(username){
        return this.__battleUnitsDictionary[username]
    }

    /**
     * @returns {string}
     */
    getOpponent(){
        return this.challenger == S.getInstance().get(S.USERNAME) ? this.defender : this.challenger
    }

    /**
     * 
     * @param {BattleUnit} battleUnit 
     * @param {string} animationState 
     * @param {boolean} isEnemy 
     */
    animateBattleUnit = (battleUnit, animationState, isEnemy)=>{
        let username = isEnemy? this.getOpponent() : S.getInstance().get(S.USERNAME)
        let battleUnits = this.getBattleUnits(username)
        battleUnits.forEach(b=>{
            if(b.position==battleUnit.position){
                b.setAnimation(animationState)
            }
        })
        // let bu = battleUnits.filter(x => x.position == battleUnit.position)[0]
        // bu.setAnimation(animationState)        
        // battleUnits = battleUnits.filter(x => x.position != battleUnit.position)        
        // battleUnits.push(bu)
        this.setBattleUnits(username, battleUnits)
    }





}