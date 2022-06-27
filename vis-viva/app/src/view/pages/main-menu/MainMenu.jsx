import React, { Component } from "react";
import Button from "../../recycled/Button.jsx";
import S from "../../../model/utils/Settings";
import L from "../../../model/utils/Language.js";


import WorldMapIcon from "../../../../res/icons/world-map.png"
import InfoIcon from "../../../../res/icons/info.png"
import SettingsIcon from "../../../../res/icons/settings.png"
import ExitIcon from "../../../../res/icons/exit.png"
import PvcIcon from "../../../../res/icons/pvc.png"

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
        return (<div >

            <h1 className="center">{L.welcome_back} {S.getInstance().get(S.USERNAME)}!</h1>


            <center>
                
                <div style={{ display: "grid", gridTemplateColumns: "auto auto", background: "rgba(255, 255, 255, 0.318)", width: "70vw", height: "60vh" }}>

                    <div className="center_container">
                        <Button title="Player Versus Player" onClick={this.props.goToWorldMap} icon={WorldMapIcon} />
                    </div>

                    <div className="center_container">
                        <Button title="Player Versus Computer" icon={PvcIcon} onClick={this.props.challengeServer} />
                    </div>

                    <div className="center_container">
                        <Button title="Info" icon={InfoIcon} onClick={this.props.goToInfo} />
                    </div>

                    <div className="center_container">
                        <Button title="Settings" icon={SettingsIcon} onClick={this.props.goToSettings} />
                    </div>

                    <div className="center_container">
                        <Button title="Logout" icon={ExitIcon} onClick={() => { S.getInstance().delete(S.USERNAME); location.reload() }} />
                    </div>

                </div>

            </center>


        </div>)
    }
}