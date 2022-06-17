import React, { Component } from "react";

/**
 */
export default class Square extends Component {

    /**
     * 
     * @param {{
     * id : number, 
     * select : (squareId:number) => void,
     * onClick : ()=> void,
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            className: "square"
        }
    }

    render() {
        return (

            <div onMouseEnter={this.select} onMouseLeave={this.unselect} onClick={this.props.onClick} className={this.state.className}  tabIndex="0"  onFocus={this.select} onBlur={this.unselect}>
                {this.props.children}
            </div>

        )
    }

    select = () => {
        this.props.select(this.props.id)
        this.setState({ className: "square  square-highlighted" })

        if(!this.keyListener){
            window.addEventListener("keypress", this.keyListener = (e)=>{
                if(e.code=="Enter"){
                    console.log("clicked")
                    this.props.onClick()
                }
            })
        }
        
    }

    unselect = () => {
        this.setState({ className: "square" })
        window.removeEventListener("keypress",this.keyListener)
        this.keyListener = undefined
    }

    // componentDidMount(){
        
    // }

    componentWillUnmount(){
        window.removeEventListener("keypress",this.keyListener)
    }


}