import BattleUnit from "./BattleUnit.js"
import FireAckEvent from "./events/FireAckEvent.js"
import FireEvent from "./events/FireEvent.js"
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

    /**
     * Updates Game upon receiving a fire-ack event.
     * @param {FireAckEvent} e 
     */
    fireAckEvent = (e) => {

        // let enemyBs = gam.getBattleUnits(gam.getOpponent())
        // let toUnit1 = BattleUnitFactory.fromJson(ev.toUnit)
        // if (ev.toUnit.health > 0) {

        //check event id!!!!!!

        if (e.toUnit.health > 0) {
            // enemyBs = enemyBs.filter(b => b.position != toUnit1.position)
            // enemyBs.push(toUnit1)
            // gam.setBattleUnits(gam.getOpponent(), enemyBs)
            this.addBattleUnit(e.toUnit)
        } else {
            // gam.killBattleUnit(toUnit1,true)
            this.killBattleUnit(e.toUnit)
        }
    }

    /**
     * Updates Game upon receiving a fire event.
     * @param {FireEvent} e 
     */
    fireEvent = (e) => {

        // let victimDead = false
        // let victim = undefined
        // let ga = this.state.game
        // let battleUnits = ga.getBattleUnits(S.getInstance().get(S.USERNAME))

        // let toUnit = BattleUnitFactory.fromJson(ev.toUnit)
        // let fromUnit = BattleUnitFactory.fromJson(ev.fromUnit)
        let victim = e.toUnit
        victim.health -= e.fromUnit.damage
        let victimDead = victim.health <= 0
        this.addBattleUnit(victim) 

        if (victimDead) {
            // ga.killBattleUnit(toUnit)
            this.killBattleUnit(victim)
        } else {
            // ga.animateBattleUnit(toUnit, BattleUnit.STATE_TAKING_HIT)
            // ga.setBattleUnits(S.getInstance().get(S.USERNAME), battleUnits)
            this.animateBattleUnit(victim, BattleUnit.STATE_TAKING_HIT)
        }

        this.animateBattleUnit(e.fromUnit, BattleUnit.STATE_ATTACKING)
        this.changeTurn()

        // this.getBattleUnits(S.getInstance().get())

        // battleUnits.forEach(b => {
        //     if (b.position == toUnit.position) {
        //         b.health -= fromUnit.damage
        //         victim = b
        //         if (b.health <= 0) {
        //             victimDead = true
        //         }
        //     }
        // })

        this._allDead = ( this.getBattleUnits(S.getInstance().get(S.USERNAME)).map(x=> x?1:0 ).reduce((a,b)=>a+b)<=1) && victimDead 


        return {"victim" :victim, "victimDead":victimDead}
    }

    /**
     * 
     */
    allDead = ()=>{
        return this._allDead
    }




}