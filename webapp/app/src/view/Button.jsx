import React, { Component } from "react";
import SelectSound from "../../res/select.mp3"
import Audio from "../model/Audio.js";
// import { playBase64 } from "../../../model/utilities/Recorder";

/**
 * A rounded, transparent menu button.
 */
export default class Button extends Component{

    /**
     * 
     * @param {{
     * title : string, 
     * onClick : function, 
     * icon : string,
     * style : *,
     * highlight : boolean,
     * flippedX : boolean
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    onClick = ()=>{
        //play select button sound
        // playBase64(SelectSound)
        Audio.playBase64(SelectSound)
        this.props.onClick()
    }

    render(){
        return  <button onClick={this.onClick } className="transparent_button" title={this.props.title}   style={   {  background :   this.props.highlight? "red" : "transparent", transform: this.props.flippedX? "scaleX(-1)" : "scale(1)" , ...this.props.style  }   }         > <img src={this.props.icon}  /> </button>
    }

}