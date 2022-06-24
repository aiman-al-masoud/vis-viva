import React, { Component } from "react";
import Game from "../../model/Game.js";
import Styles from "../Styles.js";

/**
 */
export default class GameOverPopup extends Component {

    /**
     * 
     * @param {{
     * game : Game, 
     * onDone : ()=>void
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {

        

        
        return (<div style={ this.props.game?.isGameOver()? Styles.visible: Styles.invisible}>
            <div  className="game-over-popup" /*style={  {    position:"absolute", top: window.screen.height/2, left : window.screen.width/2  }} */ >
            <h1>Game Over</h1>
            {this.props.game?.amIWinner()? "You Won!" : "You Lost!"}
            <br />
            <button onClick={this.props.onDone}>Ok</button>
        </div></div>)
    }

}