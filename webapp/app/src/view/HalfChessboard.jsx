import React, {Component} from "react";
import BattleUnit from "../model/BattleUnit.js";
import BattleUnitSprite from "./BattleUnitSprite.jsx";
import Square from "./Square.jsx";

/**
 * Allows to select BattleUnits on a grid.
 * 'Half' because you need two, to make a full battle field.
 */
export default class HalfChessboard extends Component{

    NUM_COLUMNS = 3
    NUM_ROWS = 3

    /**
     * 
     * @param {{
     * battleUnits : [BattleUnit],
     * invertedForEnemy : boolean,
     * onClickSquare : (squareId:number)=>void //, contents:BattleUnit?)=>void
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
                return <Square key={b.position} id={b.position}  select={this.select}  /*onClick={this.dropSelected}*/  >  <BattleUnitSprite battleUnit={b} />  </Square> 
            }else{
                return <Square key={i} id={i}  select={this.select}  onClick={this.onClick}  >  </Square>
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

    onClick = ()=>{
        this.props.onClickSquare(this.selectedSquare ) //,  this.props.battleUnits.filter(b=>b.position==this.selectedSquare)[0]  )
    }

    // dropSelected = ()=>{
    //     let bs = this.props.battleUnits.filter(b=>b.position!=this.selectedSquare)
    //     this.props.setBattleUnits(bs)
    // }


}