import BattleUnit from "../../battle-units/BattleUnit";
import BattleUnitFactory from "../../battle-units/BattleUnitFactory";
import RemoteEvents from "../RemoteEvents";
import Event from "../Event";

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



