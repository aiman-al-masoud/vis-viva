import React, { Component } from "react";
import Audio from "../../model/utils/Audio.js";
import SelectSound from "../../../res/select.mp3"

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
        Audio.playBase64(SelectSound)
        this.props.onClick()
    }

    render(){
        return  <button onClick={this.onClick } className="transparent_button" title={this.props.title}   style={   {   transform: this.props.flippedX? "scaleX(-1)" : "scale(1)" , ...this.props.style  }   }         > <img src={this.props.icon}  /> </button>
    }

}