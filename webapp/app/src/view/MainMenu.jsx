import React, { Component } from "react";
import WorldMapIcon from "../../res/icons/icons/world-map.png"
import InfoIcon from "../../res/icons/icons/info.png"
import SettingsIcon from "../../res/icons/icons/settings.png"
import ExitIcon from "../../res/icons/icons/exit.png"
import PvcIcon from "../../res/icons/icons/pvc.png"
import Button from "./Button.jsx";
import S from "../model/Settings";


/**
 */
export default class MainMenu extends Component {

    /**
     * 
     * @param {{
     * goToWorldMap : (args)=>Promise<void>,
     * goToSettings ,
     * goToInfo,
     * challengeServer : ()=>void
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }


    render() {
        return (<div>

            <h1 className="center">Welcome back {S.getInstance().get(S.USERNAME)}!</h1>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>

                <div className="center_container">
                    <Button title="Player Versus Player" onClick={this.props.goToWorldMap} icon={WorldMapIcon} />
                </div>

                <div className="center_container">
                    <Button title="Player Versus Computer" icon={PvcIcon} onClick={this.props.challengeServer  } />
                </div>
                
                <div className="center_container">
                    <Button title="Info" icon={InfoIcon}  onClick={this.props.goToInfo}  />
                </div>

                <div className="center_container">
                    <Button title="Settings" icon={SettingsIcon} onClick={this.props.goToSettings} />
                </div>

                <div className="center_container">
                    <Button title="Logout" icon={ExitIcon} onClick={()=>{S.getInstance().delete(S.USERNAME); location.reload()  }  } />
                </div>

            


            </div>
        </div>)
    }
}