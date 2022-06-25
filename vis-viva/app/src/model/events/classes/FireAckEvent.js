import BattleUnit from "../../battle-units/BattleUnit";
import BattleUnitFactory from "../../battle-units/BattleUnitFactory";
import RemoteEvents from "../RemoteEvents";
import Event from "../Event.js"


export default class FireAckEvent extends Event{

    /**
     * 
     * @param {{
     * gameId: number,
     * toUnit: {},
     * id: number,
     * victimDead: boolean,
     * allDeadGiveUp: boolean,
     * miss : boolean,
     * dodge : boolean,
     * criticalHit :boolean
     * }} json 
     */
    constructor(json){
        super(RemoteEvents.FIRE_ACK)

        this.gameId = json.gameId
        this.toUnit = BattleUnitFactory.fromJson(json.toUnit)
        this.id = json.id
        this.victimDead = json.victimDead
        this.allDeadGiveUp = json.allDeadGiveUp
        this.miss = json.miss
        this.dodge = json.dodge
        this.criticalHit = json.criticalHit
    }
    
}



