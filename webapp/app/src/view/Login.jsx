import React, {Component} from "react";
import L from "../model/Language.js";

/**
 */
export default class Login extends Component{

    /**
     * 
     * @param {{
     * onLogin : (username:string, password:string) => Promise<void>
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
        this.usernameTextBox = React.createRef()
        this.passwordTextBox = React.createRef()
    }


    render(){
        return (<div className="center">
            <div>
            <h1>{L.login}</h1>
            <input type="text" className="text-box" ref={this.usernameTextBox} />
            <br />
            <input type="password" className="text-box" ref={this.passwordTextBox} />
            <br />
            <button className="button"  onClick={()=>{this.props.onLogin( this.usernameTextBox.current.value, this.passwordTextBox.current.value  ) }}>{L.login}</button>
            </div>
        </div>)
    }
}