import Samurai from "./battle-units/Samurai.js";

export default class BattleUnitFactory {

    /**
     * 
     * @param {{
     * type : string,
     * health :number,
     * position : number 
     * }} json 
     */
    static fromJson(json) {

        switch (json.type) {
            case Samurai.TYPE:
                let s = new Samurai()
                s = {...s, ...json}
                return s
        }

    }


}