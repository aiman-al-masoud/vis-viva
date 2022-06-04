import React, {Component} from "react";

/**
 */
export default class Square extends Component{

    /**
     * 
     * @param {{
     * id : number, 
     * select : (squareId:number) => void,
     * add : (squareId:number) => void
     * drop : (squareId:number) => void
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
    }

    render(){
        return (<div onMouseEnter={this.select  }  onClick={()=>{this.props.add(this.props.id)}}  className="square" >
            {this.props.children}
        </div>)
    }

    select = ()=>{
        this.props.select(this.props.id)
    }

}