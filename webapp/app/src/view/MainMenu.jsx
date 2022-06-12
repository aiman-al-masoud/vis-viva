import React, {Component} from "react";
import WorldMapIcon from "../../res/icons/icons/world-map.png"

/**
 */
export default class MainMenu extends Component{

    /**
     * 
     * @param {{
     * goToWorldMap : (args)=>Promise<void>
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }


    render(){
        return (<div>
        
            <h1>Main Menu</h1>

        <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            
            <div className="center_container">
                <button onClick={this.props.goToWorldMap}> <img src={WorldMapIcon} alt="" /> </button>
            </div>

        </div>
        </div>)
    }
}