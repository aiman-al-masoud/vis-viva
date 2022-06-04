import React, {Component} from "react";

/**
 */
export default class Square extends Component{

    /**
     * 
     * @param {{
     * id : number, 
     * select : (squareId:number)=>void
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        console.log("ciao square", this.props.children)
        return (<div onMouseEnter={()=>{ this.props.select(this.props.id) }  }  className="square">
            {this.props.children}
        </div>)
    }
}