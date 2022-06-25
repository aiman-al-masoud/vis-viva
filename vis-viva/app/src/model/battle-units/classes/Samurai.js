import BattleUnit from "../BattleUnit.js"
const res = require.context('../../../../res/battle-units/samurai', false, /\.(png|jpe?g|svg|mp3|gif)$/)

export default class Samurai  extends BattleUnit{

    static TYPE = "Samurai"
    static LIST_RANK = 0


    constructor(){
        super(Samurai.TYPE, 20, 5)
        this.importResources(res)
        this.__attack_duration = 800
        this.__die_duration = 1300
        this.__take_hit_duration = 600
    }

}