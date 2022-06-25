import Audio from "../utils/Audio"

export default class BattleUnit {

    static STATE_IDLING = "STATE_IDLING"
    static STATE_DYING = "STATE_DYING"
    static STATE_TAKING_HIT = "STATE_TAKING_HIT"
    static STATE_ATTACKING = "STATE_ATTACKING"

    /**
     * 
     * @param {string} type 
     * @param {number} maxHealth 
     * @param {number} damage attack power of unit
     */
    constructor(type, maxHealth, damage) {
        this.type = type
        this.maxHealth = maxHealth ?? 100
        this.health = this.maxHealth
        this.damage = damage
        this.position = 0  // or undef 
        this.faction = undefined
        this.__idling_icon = undefined
        this.__dying_icon = undefined
        this.__taking_hit_icon = undefined
        this.__attacking_icon = undefined
        this.__attacking_sound = undefined
        this.__dying_sound = undefined
        this.__taking_hit_sound = undefined
        // this.__attack_duration = 2000
        // this.__die_duration = 2000
        // this.__take_hit_duration = 2000

        this.state = BattleUnit.STATE_IDLING
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

    setAnimation = (state) => {

        if(this.state==BattleUnit.STATE_DYING){
            return
        }

        this.state = state;

        (async (state) => {
            switch (state) {
                case BattleUnit.STATE_ATTACKING:
                    Audio.playBase64(this.__attacking_sound)
                    break
                case BattleUnit.STATE_TAKING_HIT:
                case BattleUnit.STATE_DYING:
                    Audio.playBase64(this.__taking_hit_sound)
                    break
            }
        })(state)

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



}


