import React, {Component} from "react";

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
        return (<div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
            
            <div className="center_container">
                <button onClick={this.props.goToWorldMap}>World Map</button>
            </div>

        </div>)
    }
}