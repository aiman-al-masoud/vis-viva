import BattleUnit from "../BattleUnit";
import BattleUnitFactory from "../BattleUnitFactory"
import RemoteEvents from "../RemoteEvents";
import Event from "./Event.js"

export default class FireEvent extends Event{

    /**
     * 
     * @param {{
     * gameId: number,
     * toUnit: {},
     * fromUnit: {},
     * id: number
     * }} json 
     */
    constructor(json){
        super(RemoteEvents.FIRE)

        this.gameId = json.gameId
        this.toUnit = BattleUnitFactory.fromJson(json.toUnit)
        this.fromUnit = BattleUnitFactory.fromJson(json.fromUnit)
        this.id = json.id
    }
    
}



