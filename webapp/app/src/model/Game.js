import BattleUnit from "./BattleUnit.js"
import S from "./Settings.js"

/**
 * Holds all of the state associated to a Game. To modify the state from a 
 * Component with access to a props.game object, first call all of the 
 * required methods, then call game.update() only once.
 */
export default class Game {

    /**
     * 
     * @param {string} challenger 
     * @param {string} defender 
     * @param {int} gameId 
     * @param { (game:Game)=>Promise<void> } setGame 
     */
    constructor(challenger, defender, gameId, setGame) {
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
     * Add a BattleUnit, overwriting based on faction and position.
     * @param {BattleUnit} battleUnit 
     */
    addBattleUnit = (battleUnit)=>{
        let bs = this.getBattleUnits(battleUnit.getFaction())
        bs = bs.filter(b => b.position != battleUnit.position)
        bs.push(battleUnit)
        this.setBattleUnits(battleUnit.getFaction(), bs)
    }

    /**
     * Based on faction and position.
     * @param {BattleUnit} battleUnit 
     */
    removeBattleUnit = (battleUnit)=>{
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
        setTimeout(() => {

            let battleUnits = this.getBattleUnits(username)

            battleUnits.forEach(b => {
                if (b.position == battleUnit.position) {
                    b.setAnimation(BattleUnit.STATE_IDLING)
                }
            })
            this.setBattleUnits(username, battleUnits)
            this.setGame(this)

        }, 2000)

    }

    /**
     * Remove BattleUnit during a fight
     * @param {BattleUnit} battleUnit 
     */
    killBattleUnit = (battleUnit) => {

        let username = battleUnit.getFaction()

        let battleUnits = this.getBattleUnits(username)
        battleUnits.forEach(b => {
            if (b.position == battleUnit.position) {
                b.setAnimation(BattleUnit.STATE_DYING)
            }
        })
        this.setBattleUnits(username, battleUnits)

        //  remove unit after some seconds 
        setTimeout(() => {

            // let battleUnits = this.getBattleUnits(username)
            // battleUnits = battleUnits.filter(b => b.position != battleUnit.position)
            // this.setBattleUnits(username, battleUnits)
            // this.setGame(this)
            this.removeBattleUnit(battleUnit)

        }, 1200)

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
     * @param {string}
     * Call it when the Game is over
     */
    setGameOver = (winner) => {
        this.winner = winner
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
     * Calls back parent/owner/observer passing it updated Game state .
     */
    update() {
        this.setGame(this)
    }



}