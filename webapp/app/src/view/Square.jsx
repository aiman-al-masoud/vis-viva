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
        return (<div onMouseEnter={()=>{ this.props.select(this.props.id) }}  >
            {this.props.children}
        </div>)
    }
}