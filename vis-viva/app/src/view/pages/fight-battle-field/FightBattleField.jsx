import React, { Component } from "react";
import Game from "../../../model/Game.js";
import HalfChessboard from "../../recycled/HalfChessboard.jsx";
import S from "../../../model/utils/Settings.js";
import BattleUnit from "../../../model/battle-units/BattleUnit.js";
import BackgroundImage from  "../../../../res/icons/backgrounds/bg1.png"

/**
 * 
 */
export default class FightBattleField extends Component {

    /**
    * 
    * @param {{
     * game : Game,
     * setGame:(game:Game)=>Promise<void>,
     * sendFire : (fromUnit:BattleUnit, toUnit:BattleUnit) => Promise<void>,
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            myUnit: undefined
        }

    }


    render() {

        return (<div style={{backgroundImage:  `url(${BackgroundImage})` , backgroundSize:"cover" }}>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto", background: "blue" }}>

                <div className={ this.props.game.isMyTurn()?  "center-container  highlighted-player-name" : "center-container"      }  >
                    <p>{S.getInstance().get(S.USERNAME)}</p>
                </div>

                <div className={ (!this.props.game.isMyTurn())?  "center-container  highlighted-player-name" : "center-container" }>
                    <p>{this.props.game.getOpponent()}</p>
                </div>

            </div>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }} >

                <div className="center-container">
                    <HalfChessboard battleUnits={this.props.game.getBattleUnits(S.getInstance().get(S.USERNAME))} onClickSquare={this.selectMyUnit} />
                </div>
                <div className="center-container">
                    <HalfChessboard battleUnits={this.props.game.getBattleUnits(this.props.game.getOpponent())} invertedForEnemy={true} onClickSquare={this.selectEnemyUnit} />
                </div>

            </div>
        </div>)
    }

    /**
     * 
     * @param {number} squareId 
     * @param {BattleUnit} squareContent 
     */
    selectMyUnit = (squareId, squareContent) => {
        this.setState({ myUnit: squareContent })
    }

    /**
     * @param {number} squareId 
     * @param {BattleUnit} squareContent 
     */
    selectEnemyUnit = (squareId, squareContent) => {
        this.props.sendFire(this.state.myUnit, squareContent)
    }


    componentWillUnmount(){
        this.props.game.abortGame()
    }


}