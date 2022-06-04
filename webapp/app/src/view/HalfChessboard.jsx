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
     * setBattleUnits : (battleUnits:[BattleUnit]) => Promise<void>,
     * getBattleUnit() : () => BattleUnit,
     * invertedForEnemy : boolean
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
        this.selectedSquare = 0
    }

    render(){

        let arr =  Array.from(Array(this.NUM_COLUMNS * this.NUM_ROWS), (_, i) => undefined)

        let battleUnits = this.props.battleUnits.sort((b1, b2)=>b1.position-b2.position )
        if(this.props.invertedForEnemy){
            battleUnits.forEach((b, i)=>{
                let row = parseInt( b.position /this.NUM_COLUMNS)
                let s = (this.NUM_COLUMNS-1) +row*(2*this.NUM_COLUMNS)
                arr[s - b.position] =  b

                console.log("calculating pos:", "orig-pos", b.position,  "row", row, "sum", s,  "new-pos", s - b.position)
            })
        }else{
            this.props.battleUnits.forEach((b)=>{
                arr[b.position] =  b
            })
        }


        arr = arr.map((b, i)=>{
            if(b){
                return <Square key={b.position} id={b.position}  select={this.select}   >  <BattleUnitSprite battleUnit={b} />  </Square> 
            }else{
                return <Square key={i} id={i}  select={this.select} add={this.addToSelected}  >  </Square>
            }
        })

        return (<div style={{display: "grid",  gridTemplateColumns: "10vw ".repeat(this.NUM_COLUMNS)   }} >
            {arr}                
        </div>)
    }

    select = (squareId)=>{
        console.log(squareId)
        this.selectedSquare = squareId
    }

    addToSelected = ()=>{
        let b = this.props.getBattleUnit()  
        b.position = this.selectedSquare
        let battleUnits = this.props.battleUnits 
        battleUnits =  battleUnits.filter(b => b.position!=this.selectedSquare )
        battleUnits.push(b)
        this.props.setBattleUnits(battleUnits)
    }

    dropSelected = ()=>{
        let bs = this.props.battleUnits.filter(b=>b.position!=this.selectedSquare)
        this.props.setBattleUnits(bs)
    }


}