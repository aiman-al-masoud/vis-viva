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

        try{
            choice = choice.options[choice.selectedIndex].text
        }catch{
            choice = choice.checked
        }
        
        console.log("onSet()", key, choice)
        S.getInstance().set(key, choice)
        L.reload() 
        this.props.update()
        this.forceUpdate()
    }


    render(){

        return (<div style={{padding:"2vw", background:"rgba(255, 255, 255, 0.318)"}}>
            <h1>{L.settings}</h1>

            <h1>{L.language}</h1>
            <select value={S.getInstance().get(S.APP_LANGUAGE)} onChange={(event) => { this.onSet(S.APP_LANGUAGE, event)  }} >
                {L.available().map((opt, index) => { return <option title={opt} key={index}>{opt}</option> })}
            </select>

            <h1>{L.sounds}</h1>
            <input type="checkbox"  checked={S.getInstance().get(S.SOUND)} onChange={(event) => { this.onSet(S.SOUND, event)  }} />


        </div>)
    }

}