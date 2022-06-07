import BattleUnit from "./BattleUnit.js"
import S from "./Settings.js"

export default class Game{

    /**
     * 
     * @param {string} challenger 
     * @param {string} defender 
     * @param {int} gameId 
     * @param { (game:Game)=>Promise<void> } setGame 
     */
    constructor(challenger, defender, gameId, setGame){
        this.challenger = challenger
        this.defender = defender
        this.gameId = gameId 
        this.__battleUnitsDictionary = { }
        this.__battleUnitsDictionary[challenger] = []
        this.__battleUnitsDictionary[defender] = []
        this.setGame = setGame

        console.log("in constructor of Game", setGame, this.setGame)
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
        this.setBattleUnits(username, battleUnits)

        // stop animation after some seconds
        setTimeout(() => {
            
            let battleUnits = this.getBattleUnits(username)

            battleUnits.forEach(b=>{
                if(b.position==battleUnit.position){
                    b.setAnimation(BattleUnit.STATE_IDLING)
                }
            })
            this.setBattleUnits(username, battleUnits)
            this.setGame(this)

        }, 2000)

    }




    killBattleUnit = (battleUnit, isEnemy) =>{

        let username = isEnemy? this.getOpponent() : S.getInstance().get(S.USERNAME)
        let battleUnits = this.getBattleUnits(username)
        battleUnits.forEach(b=>{
            if(b.position==battleUnit.position){
                b.setAnimation(BattleUnit.STATE_DYING)
            }
        })
        this.setBattleUnits(username, battleUnits)

        // stop animation after some seconds and remove unit
        setTimeout(() => {
            
            let battleUnits = this.getBattleUnits(username)
            battleUnits = battleUnits.filter(b => b.position != battleUnit.position)
            this.setBattleUnits(username, battleUnits)
            this.setGame(this)

        }, 2000)

    }




}