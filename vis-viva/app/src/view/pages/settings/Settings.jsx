import React, {Component} from "react";
import L from "../../../model/utils/Language";
import S from "../../../model/utils/Settings";


/**
 */
export default class Settings extends Component{

    constructor(props){
        super(props)
    }

    onSet = (key, event) => {
        let choice = event.target
        choice = choice.options[choice.selectedIndex].text
        console.log("onSet()", key, choice)
        S.getInstance().set(key, choice)
        L.reload() 
        this.props.update()
        this.forceUpdate()
    }


    render(){

        return (<div>
            <h1>{L.settings}</h1>

            <h1>Language</h1>
            <select value={S.getInstance().get(S.APP_LANGUAGE)} onChange={(event) => { this.onSet(S.APP_LANGUAGE, event)  }} >
                {L.available().map((opt, index) => { return <option title={opt} key={index}>{opt}</option> })}
            </select>

        </div>)
    }

}