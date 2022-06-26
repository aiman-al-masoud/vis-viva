import Audio from "../utils/Audio"
import UnitStats from "./UnitStats"


export default class BattleUnit {

    static STATE_IDLING = "STATE_IDLING"
    static STATE_DYING = "STATE_DYING"
    static STATE_TAKING_HIT = "STATE_TAKING_HIT"
    static STATE_ATTACKING = "STATE_ATTACKING"

    /**
     * 
     * @param {string} type 
     * @param {number} maxHealth 
     * @param {number} damage default attack power of unit
     */
    constructor(type, maxHealth, damage) {
        this.type = type
        this.maxHealth = maxHealth ?? 100
        this.health = this.maxHealth
        this.damage = damage
        this.position = 0  // or undef 
        this.faction = undefined
        this.missRate = 0
        this.criticalHitRate = 1
        this.criticalHitMultiplier = 1.5
        this.dodgeRate = 0.2
        this.state = BattleUnit.STATE_IDLING
        this.textMessage = "" //overlay text on battleunit sprite

        // this.__attack_duration = 2000
        // this.__die_duration = 2000
        // this.__take_hit_duration = 2000
    }

    /**
     * 
     * @param {string} faction 
     */
    setFaction = (faction) => {
        this.faction = faction
    }

    /**
     * Returns the username of the player who owns this BattleUnit.
     * @returns {string}
     */
    getFaction = () => {
        return this.faction
    }

    /**
     * 
     * @param {string} state 
     * @returns 
     */
    setAnimation = (state) => {

        if (this.state == BattleUnit.STATE_DYING) {
            return
        }

        this.state = state;

        setTimeout(this.playSound, 250)

    }

    /**
     * 
     */
    playSound = async () => {
        switch (this.state) {
            case BattleUnit.STATE_ATTACKING:
                Audio.playBase64(this.__attacking_sound)
                break
            case BattleUnit.STATE_TAKING_HIT:
            case BattleUnit.STATE_DYING:
                Audio.playBase64(this.__taking_hit_sound)
                break
        }
    }


    /**
     * 
     * @returns {string} icon
     */
    getIcon = () => {

        switch (this.state) {
            case BattleUnit.STATE_IDLING:
                return this.__idling_icon
            case BattleUnit.STATE_DYING:
                return this.__dying_icon
            case BattleUnit.STATE_TAKING_HIT:
                return this.__taking_hit_icon
            case BattleUnit.STATE_ATTACKING:
                return this.__attacking_icon
        }

    }


    /**
     * Get the duration of an animation
     * @returns {number}
     */
    getAnimationDuration = (animation) => {
        switch (animation) {
            case BattleUnit.STATE_ATTACKING:
                return this.__attack_duration
            case BattleUnit.STATE_DYING:
                return this.__die_duration
            case BattleUnit.STATE_TAKING_HIT:
                return this.__take_hit_duration
        }
    }

    toJSON() {
        return {
            type: this.type,
            maxHealth: this.maxHealth,
            health: this.health,
            position: this.position,
            damage: this.damage,
            faction: this.faction
        }
    }

    /**
     * 
     * @param {*} r 
     */
    importResources = (r) => {

        let images = {}
        r.keys().map(item => { images[item.replace('./', '')] = r(item).default; })
        this.__idling_icon = images["idle.gif"]
        this.__dying_icon = images["die.gif"]
        this.__taking_hit_icon = images["take-hit.gif"]
        this.__attacking_icon = images["attack.gif"]
        this.__attacking_sound = images["attack.mp3"]
        this.__dying_sound = images["take-hit.mp3"]
        this.__taking_hit_sound = images["take-hit.mp3"]
    }

    /**
     * 
     * @returns {string}
     */
    getTextMessage = () => {
        return this.textMessage
    }

    /**
     * 
     * @param {string} textMessage 
     */
    setTextMessage = (textMessage) => {
        this.textMessage = textMessage
    }

    /**
     * 
     * @returns {UnitStats}
     */
    getStats(){
       return new UnitStats(this.maxHealth, this.damage, this.missRate, this.dodgeRate, this.criticalHitRate, this.criticalHitMultiplier)
    }

}




