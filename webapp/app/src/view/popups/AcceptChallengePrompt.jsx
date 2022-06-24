import React, { Component } from "react";
import Game from "../../model/Game.js";

/**
 */
export default class AcceptChallengePrompt extends Component {

    /**
     * 
     * @param {{
     * game : Game,
     * acceptChallenge : ()=>Promise<void>
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }

    render() {

        return (<div className="accept-challenge-prompt" style={{position:"absolute", top:0, left:window.screen.width/4  }}>
            <span>You got a challenge from {this.props.game.challenger}!    </span>
            <button onClick={this.props.acceptChallenge}>Accept</button>
        </div>)
    }

}