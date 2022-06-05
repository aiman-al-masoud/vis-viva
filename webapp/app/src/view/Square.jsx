import React, {Component} from "react";

/**
 */
export default class Square extends Component{

    /**
     * 
     * @param {{
     * id : number, 
     * select : (squareId:number) => void,
     * onClick : ()=> void
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props

        this.state = {
            className : "square"
        }
    }

    render(){
        return (<div onMouseEnter={this.select} onMouseLeave={this.unselect} onClick={this.props.onClick }   className={this.state.className}>
            {this.props.children}
        </div>)
    }

    select = ()=>{
        this.props.select(this.props.id)
        this.setState({className:"square  square-highlighted"})
    }

    unselect = ()=>[
        this.setState({className:"square"})
    ]




}