import React, {Component} from "react";
import BattleUnit from "../model/BattleUnit.js";
import BattleUnitSprite from "./BattleUnitSprite.jsx";
import Square from "./Square.jsx";

/**
 * Allows player to select and edit BattleUnits on a grid.
 * Half because it pertains only to the player's exor the opponent's half
 * of the chessboard, not both.
 */
export default class HalfChessboard extends Component{

    NUM_COLUMNS = 3
    NUM_ROWS = 3

    /**
     * 
     * @param {{
     * battleUnits : [BattleUnit],
     * setBattleUnits : (battleUnits:[BattleUnit]) => Promise<void>
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
        this.selectedSquare = 0
    }

    render(){

        let battleUnits = this.props.battleUnits.sort( (b1,b2) => b1.position - b2.position )
        let emptySpaces =  this.NUM_COLUMNS * this.NUM_ROWS - battleUnits.length
        let emptyArray = [ null ]

        for(let i=0;i<emptySpaces;i++){
            emptyArray = emptyArray.concat(emptyArray)
        }

        return (
            <div style={{display: "grid",  gridTemplateColumns: "auto ".repeat(this.NUM_COLUMNS)   }}>
                {battleUnits.map( b =>  <Square id={b.position}  select={this.select} >  <BattleUnitSprite battleUnit={b} />  </Square>   )}
                {emptyArray.map(b => <Square></Square>) }
            </div>
        )
    }

    select(squareId){
        this.selectedSquare = squareId
    }

    setSelected(){
        let b = new BattleUnit()  //deal with type somehow
        b.position = this.selectedSquare
        let battleUnits = this.props.battleUnits.concat(b)
        this.props.setBattleUnits(battleUnits)
    }

    dropSelected(){
        let bs = this.props.battleUnits.filter(b=>b.position!=this.selectedSquare)
        this.props.setBattleUnits(bs)
    }


}