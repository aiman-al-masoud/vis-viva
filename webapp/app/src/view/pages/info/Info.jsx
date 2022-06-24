import React, { Component } from "react";

/**
 */
export default class Info extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<div >
            <h1>Info</h1>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.318)", width: "90vw", height: "60vh", padding:"2vw", overflow:"scroll", overflowX:"hidden" }}>
                    
                    <h1>Vis Viva</h1>
                    <p></p>

                    <h2>Credits</h2>

                    <h2>Gameplay</h2>

                
                    

                    <h2>Other Links</h2>
                    <p>Please check out my other Projects:</p>
                    <ul>
                        <li ><a href="https://psittacus.eu.pythonanywhere.com" target="_blank">Psittacus</a></li>
                    </ul>


                </div>
            </div>



        </div>)
    }

}