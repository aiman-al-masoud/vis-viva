import React, { Component } from "react";
import WorldMapIcon from "../../res/icons/icons/world-map.png"
import InfoIcon from "../../res/icons/icons/info.png"
import SettingsIcon from "../../res/icons/icons/settings.png"


import Button from "./Button.jsx";



/**
 */
export default class MainMenu extends Component {

    /**
     * 
     * @param {{
     * goToWorldMap : (args)=>Promise<void>,
     * goToSettings ,
     * goToInfo
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props
    }


    render() {
        return (<div>

            <h1>Main Menu</h1>

            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>

                <div className="center_container">
                    <Button title="World Map" onClick={this.props.goToWorldMap} icon={WorldMapIcon} />
                </div>
                
                <div className="center_container">
                    <Button title="Info" icon={InfoIcon}  onClick={this.props.goToInfo}  />
                </div>

                <div className="center_container">
                    <Button title="Settings" icon={SettingsIcon} onClick={this.props.goToSettings} />
                </div>

            </div>
        </div>)
    }
}