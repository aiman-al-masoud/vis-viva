import Samurai from "./battle-units/Samurai.js";

export default class BattleUnitFactory {

    /**
     * Types
     */
    static SAMURAI = Samurai.TYPE


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
            case BattleUnitFactory.SAMURAI:
                let s = new Samurai()
                s = {...s, ...json}
                return s
        }

    }

    /**
     * 
     * @param {string} type 
     */
    static new(type){
        switch(type){
            case BattleUnitFactory.SAMURAI:
                return new Samurai()
        }
    }

    /**
     * 
     * @param {string} type BattleUnit type
     * @returns {string} url or base64 of icon
     */
    static getIconFor(type){
        
        console.log("getIconFor", BattleUnitFactory.SAMURAI, type)

        switch(type){
            case BattleUnitFactory.SAMURAI:
                return new Samurai().__idling_icon
        }
    }

    


}