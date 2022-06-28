import React, { Component } from "react";
import Game from "../../model/Game.js";
import Styles from "../Styles.js";
import L from "../../model/utils/Language.js"

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
            <h1>{L.game_over}</h1>
            {this.props.game?.amIWinner()? L.you_won : L.you_lost}
            {this.props.game?.opponentLeft? L.your_opponent_left_the_game:""}
            <br />
            <button onClick={this.props.onDone}>{L.ok}</button>
        </div></div>)
    }

}