export default class BattleUnit{

    /**
     * 
     * @param {string} type 
     * @param {number} health 
     * @param {number} maxHealth 
     * @param {number} position square number in a grid
     * @param {string} faction username of player
     * @param {string} icon 
     */
    constructor(type, health, maxHealth, position, faction, icon){
        this.type = type
        this.maxHealth = maxHealth ?? 100
        this.health = health ?? this.maxHealth
        this.position = position
        this.faction = faction
        this.icon = icon
    }


}



