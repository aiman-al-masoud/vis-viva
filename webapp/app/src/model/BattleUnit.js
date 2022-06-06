export default class BattleUnit{

    static STATE_IDLING =  "STATE_IDLING"
    static STATE_DYING = "STATE_DYING"
    static STATE_TAKING_HIT = "STATE_TAKING_HIT"
    static STATE_ATTACKING = "STATE_ATTACKING"

    /**
     * 
     * @param {string} type 
     * @param {number} maxHealth 
    //  * @param {number} position square number in a grid
    //  * @param {string} faction username of player
     */
    constructor(type, maxHealth){
        this.type = type
        this.maxHealth = maxHealth ?? 100
        this.health = this.maxHealth
        this.position = 0  // or undef 
        // this.faction = faction
        // this.icon = icon
        this.__idling_icon = undefined
        this.__dying_icon = undefined
        this.__taking_hit_icon = undefined
        this.__attacking_icon = undefined
        this.state = BattleUnit.STATE_IDLING
    }

    setState = (state)=>{
        this.state = state
    } 

    /**
     * 
     * @returns {string} icon
     */
    getIcon = ()=>{

        let s = this.state

        console.log(" battle unit state", s)

        switch(s){
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

    toJSON(){
        return {
            type: this.type,
            maxHealth : this.maxHealth,
            health : this.health,
            position : this.position
        }
    }



}



