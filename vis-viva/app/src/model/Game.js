import BattleUnit from "./battle-units/BattleUnit.js"
import FireAckEvent from "./events/classes/FireAckEvent.js"
import FireEvent from "./events/classes/FireEvent.js"
import GameOverEvent from "./events/classes/GameOverEvent.js"
import FireResults from "./FireResults.js"
import { probability } from "./utils/Functions.js"
import S from "./utils/Settings.js"


/**
 * Holds all of the state associated to a game. It acts as a context object
 * and it's passed from App (root) down to all children Components.
 * 
 * To modify the state from a Component with access to a props.game object, 
 * first call all of the required methods, then call game.update() only once.
 */
export default class Game {

    /**
     * 
     * @param {string} challenger 
     * @param {string} defender 
     * @param {int} gameId 
     * @param { (game:Game)=>Promise<void> } setGame 
     * @param {()=>Promise<void>} abortGame
     */
    constructor(challenger, defender, gameId, setGame, abortGame) {
        this.challenger = challenger
        this.defender = defender
        this.gameId = gameId
        this.__battleUnitsDictionary = {}
        this.__battleUnitsDictionary[challenger] = []
        this.__battleUnitsDictionary[defender] = []
        this.__username_current_turn = challenger //challenger begins playing 
        this.gameOver = false
        this.winner = undefined
        this.setGame = setGame
        this.abortGame = abortGame
    }

    /**
      * Calls back parent/owner/observer passing it updated Game state .
      */
    update() {
        this.setGame(this)
    }

    /**
     * 
     * @param {[BattleUnit]} battleUnits 
     */
    setBattleUnits(username, battleUnits) {
        this.__battleUnitsDictionary[username] = battleUnits
    }

    /**
     * 
     * @param {string} username 
     * @returns {[BattleUnit]} 
     */
    getBattleUnits(username) {
        return this.__battleUnitsDictionary[username]
    }

    /**
     * Add a BattleUnit, **OVERWRITING** based on faction and position.
     * @param {BattleUnit} battleUnit 
     */
    addBattleUnit = (battleUnit) => {
        let bs = this.getBattleUnits(battleUnit.getFaction())
        bs = bs.filter(b => b.position != battleUnit.position)
        bs.push(battleUnit)
        this.setBattleUnits(battleUnit.getFaction(), bs)
    }

    /**
     * Based on faction and position.
     * @param {BattleUnit} battleUnit 
     */
    removeBattleUnit = (battleUnit) => {
        let bs = this.getBattleUnits(battleUnit.getFaction())
        bs = bs.filter(b => b.position != battleUnit.position)
        this.setBattleUnits(battleUnit.getFaction(), bs)
    }

    /**
     * @returns {string}
     */
    getOpponent() {
        return this.challenger == S.getInstance().get(S.USERNAME) ? this.defender : this.challenger
    }

    /**
     * 
     * @param {BattleUnit} battleUnit 
     * @param {string} animationState 
     */
    animateBattleUnit = (battleUnit, animationState) => {

        let username = battleUnit.getFaction()
        let battleUnits = this.getBattleUnits(username)

        battleUnits.forEach(b => {
            if (b.position == battleUnit.position) {
                b.setAnimation(animationState)
            }
        })
        this.setBattleUnits(username, battleUnits)

        // stop animation after some seconds
        // no need to stop animation if dying: gonna get removed anyway
        if (animationState != BattleUnit.STATE_DYING) {
            this.stopAnimation(battleUnit, animationState)
        }
    }

    /**
     * Stop the animation after a predefined amount of time.
     * @param {BattleUnit} battleUnit 
     */
    stopAnimation = (battleUnit, animation) => {

        let animationDuration = battleUnit.getAnimationDuration(animation)

        setTimeout(() => {

            let username = battleUnit.getFaction()
            let battleUnits = this.getBattleUnits(username)

            battleUnits.forEach(b => {
                if (b.position == battleUnit.position) {
                    b.setAnimation(BattleUnit.STATE_IDLING)
                }
            })
            this.setBattleUnits(username, battleUnits)
            this.update()
        }, animationDuration)
    }


    /**
     * Remove BattleUnit during a fight
     * @param {BattleUnit} battleUnit 
     */
    killBattleUnit = (battleUnit) => {

        this.animateBattleUnit(battleUnit, BattleUnit.STATE_DYING)

        //  remove unit after some seconds 
        let animationDuration = battleUnit.getAnimationDuration(BattleUnit.STATE_DYING)
        setTimeout(() => {
            this.removeBattleUnit(battleUnit)
            this.update()
        }, animationDuration)

    }

    /**
     * Checks if it's the local player's turn to play.
     * @returns boolean 
     */
    isMyTurn = () => {
        return this.__username_current_turn == S.getInstance().get(S.USERNAME)
    }

    /**
     * Switch turns between local and remote players.
     */
    changeTurn = () => {
        this.__username_current_turn = this.__username_current_turn == this.challenger ? this.defender : this.challenger
    }

    /** 
     * Call it when the Game is over, passing it a GameOverEvent.
     * @param {GameOverEvent} ev
     */
    setGameOver = (ev) => {
        this.winner = ev.winner
        this.opponentLeft = ev.opponentLeft
        this.gameOver = true
    }

    /**
     * @returns {boolean}
     */
    isGameOver = () => {
        return this.gameOver
    }

    /**
     * Check if local player is the winner of this Game.
     * @returns {boolean}
     */
    amIWinner() {
        return this.winner == S.getInstance().get(S.USERNAME)
    }

    /**
     * Updates Game upon receiving a fire-ack event.
     * @param {FireAckEvent} e 
     */
    fireAckEvent = (e) => {

        if(!e.miss && !e.dodge){
            if(e.victimDead){
                this.killBattleUnit(e.toUnit)
            }else{
                this.addBattleUnit(e.toUnit)
                this.animateBattleUnit(e.toUnit, BattleUnit.STATE_TAKING_HIT)
            }
        }

        console.log("miss:", e.miss, "dodge:",e.dodge, "critical:",e.criticalHit)

    }

    /**
     * Updates Game upon receiving a fire event.
     * @param {FireEvent} e 
     * @returns {FireResults}
     */
    fireEvent = (e) => {

        //check event id!!!!!!

        let victim = e.toUnit
        let victimDead = false
        let miss = false
        let dodge = false
        let criticalHit = false

        if(probability(e.fromUnit.missRate)){
            //nothing
            miss = true
            console.log("miss!")
        }else if(probability(e.toUnit.dodgeRate)){
            //nothing
            dodge = true
            console.log("dodge!")
        }else if (probability(e.fromUnit.criticalHitRate)){
            criticalHit = true
            victim.health -= e.fromUnit.criticalHitMultiplier*e.fromUnit.damage
            victimDead = victim.health <= 0
            console.log("critical!")
        }else{
            victim.health -= e.fromUnit.damage
            victimDead = victim.health <= 0
        }


        this.addBattleUnit(victim)

        if (victimDead) {
            this.killBattleUnit(victim)
        } else if(!miss && !dodge){
            this.animateBattleUnit(victim, BattleUnit.STATE_TAKING_HIT)
        }

        this.animateBattleUnit(e.fromUnit, BattleUnit.STATE_ATTACKING)
        this.changeTurn()

        this._allDead = (this.getBattleUnits(S.getInstance().get(S.USERNAME)).map(x => x ? 1 : 0).reduce((a, b) => a + b) <= 1) && victimDead
        return new FireResults(victim, victimDead, this._allDead, miss, dodge, criticalHit)
    }

    /**
     * Are all of the local player's BattleUnits dead?
     */
    allDead = () => {
        return this._allDead
    }


}