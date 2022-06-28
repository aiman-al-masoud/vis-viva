import React, { Component } from "react";
import LogoIcon from "../../../../res/icons/logo.png"
import L from "../../../model/utils/Language";

/**
 */
export default class Info extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (<div >

            <img src={LogoIcon} width="50px" style={{float:"right"}}/>

            <h1>{L.info}</h1>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.318)", width: "90vw", height: "60vh", padding:"2vw", overflow:"scroll", overflowX:"hidden" }}>
                    
                    <h1>{L.app_name}</h1>
                    <p>{L.vis_viva_is}</p>

                    <p>{L.invite_your_friends_and_challege_them}</p>

                    <h2>{L.gameplay}</h2>

                    <p>The rules are simple!</p>

                    <ol>
                        <li>When you challenge someone, an invite is sent, and you're taken to the battlefield; which you can field your troops in.</li>
                        <li>After you're done fielding your troops, you can hit the red {L.ready} button.</li>
                        <li>Your opponent will have received an invite, and may still be fielding his/her troops, so be patient...</li>
                        <li>When your opponent's troops appear on the screen, you're all set! You get the first turn, by virtue of being the attacker.</li>
                        <li>Blows are exchanged by selecting a battle unit in your half of the field, and then selecting your target on your oppoenent's half of the field.</li>
                      
                    </ol>

                    <p>You can play this game entirely using your mouse, or your keyboard.</p>
                    <p>Depending on what battle units you and your opponent chose, blows may miss, be dodged by the target, or land a critical hit!</p>
                    <p>That's it, I won't bother you any further, go ahead and give it a go!</p>
                    
                   
                    <h2>{L.license}</h2>

                    <p>Vis Viva is free software, licensed under GPLv3.</p>

                    <h3>See the full terms of the license here:</h3>


                    <h3>Get the source code:</h3>


                    <h2>{L.credits}</h2>

                    <p>Assets (images, sounds) come from several sources, they're all carefully linked here (together with their respective authors, when possible).</p>

                    <h2>{L.privacy}</h2>

                    <p>I don't collect any personal data on the users, except for their usernames and the history of their scores, which counts as legitimate usage.</p>

                    <h2>{L.other_links}</h2>

                    <span>Please check out  <a href="https://aiman-al-masoud.github.io/" target="_blank">my other projects</a>, and especially this one: </span>
                    <a href="https://psittacus.eu.pythonanywhere.com" target="_blank">Psittacus</a>.

                    <p>Liked the game? Do you want to see more similar games? Do you have any game ideas to share? Contact me at:</p>
                    <a href="mailto:luxlunarislabs@gmail.com">luxlunarislabs@gmail.com</a>

                </div>
            </div>



        </div>)
    }

}