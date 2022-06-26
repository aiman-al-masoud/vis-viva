import React, {Component} from "react";
// import L from "../../../model/utils/Language";
import L from "../../../model/utils/Language";
import S from "../../../model/utils/Settings";


/**
 */
export default class Settings extends Component{

    constructor(props){
        super(props)

        this.state = {
            APP_LANGUAGE : S.getInstance().get(S.APP_LANGUAGE)
        }
    }

    onSet = (key, event) => {

        let choice = event.target
        choice = choice.options[choice.selectedIndex].text
        console.log(key, choice)
        S.getInstance().set(key, choice)
        let newState = {}
        newState[key] = choice
        this.setState(newState)

        if(key==S.APP_LANGUAGE){
            L.reload() //redundant
            window.location.reload()
        }
    }


    render(){

        return (<div>
            <h1>Settings</h1>

            <h1>Language</h1>
            <select value={this.state.APP_LANGUAGE} onChange={(event) => { this.onSet(S.APP_LANGUAGE, event)  }} >
                {L.available().map((opt, index) => { return <option title={opt} key={index}>{opt}</option> })}
            </select>

        </div>)
    }

}