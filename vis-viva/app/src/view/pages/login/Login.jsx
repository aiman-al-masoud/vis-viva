import React, {Component} from "react";
import L from "../../../model/utils/Language.js"
import LogoImage from "../../../../res/icons/logo.png"
import S from "../../../model/utils/Settings.js";

/**
 */
export default class Login extends Component{

    /**
     * 
     * @param {{
     * onLogin : (username:string, password:string) => Promise<void>,
     * goToSettings : ()=>{}
     * }} props 
     */
    constructor(props){
        super(props)
        this.props = props
        this.usernameTextBox = React.createRef()
        // this.passwordTextBox = React.createRef()
    }


    render(){
        return (<div className="center">
            <div>

            <img src={LogoImage} width="200"  />

            <h1>{L.login}</h1>
            <input type="text" className="text-box" ref={this.usernameTextBox} value={S.getInstance().get(S.USERNAME)}/>
            <br />
            
            {/* <input type="password" className="text-box" ref={this.passwordTextBox} />
            <br /> */}
            {/* <button className="button"  onClick={()=>{this.props.onLogin( this.usernameTextBox.current.value, this.passwordTextBox.current.value  ) }}>{L.login}</button> */}
            
            <button className="button"  onClick={()=>{this.props.onLogin( this.usernameTextBox.current.value  ) }}>{L.login}</button>

            <button onClick={this.props.goToSettings}>Settings</button>
            </div>
        </div>)
    }
}