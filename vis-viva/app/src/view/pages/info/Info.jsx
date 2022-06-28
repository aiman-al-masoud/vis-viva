import React, { Component } from "react";
import LogoIcon from "../../../../res/icons/logo.png"

/**
 */
export default class Info extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<div >

            <img src={LogoIcon} width="50px" style={{float:"right"}}/>

            <h1>Info</h1>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.318)", width: "90vw", height: "60vh", padding:"2vw", overflow:"scroll", overflowX:"hidden" }}>
                    
                    <h1>Vis Viva</h1>
                    <p></p>

                    <h2>Credits</h2>

                    <h2>Gameplay</h2>



                    <h2>Other Links</h2>
                    <span>Please check out  <a href="https://aiman-al-masoud.github.io/" target="_blank">my other projects</a>, and especially this one: </span>
                    <a href="https://psittacus.eu.pythonanywhere.com" target="_blank">Psittacus</a>.

                    <p>Liked the game? Do you want to see more similar games? Do you have any game ideas to share? Contact me at:</p>
                    <a href="mailto:luxlunarislabs@gmail.com">luxlunarislabs@gmail.com</a>

                </div>
            </div>



        </div>)
    }

}