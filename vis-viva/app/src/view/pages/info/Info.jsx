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

                    <p>{L.the_rules_are_simple}</p>

                    <ol>
                        <li>{L.rule_1}</li>
                        <li>{L.rule_2}</li>
                        <li>{L.rule_3}</li>
                        <li>{L.rule_4}</li>
                        <li>{L.rule_5}</li>
                    </ol>

                    <p>{L.you_can_play_with_mouse_or_keyboard}</p>
                    <p>{L.depending_on_battle_units_there_can_be_misses}</p>
                    <p>{L.wont_bother_you_any_further}</p>
                    
                   
                    <h2>{L.license}</h2>

                    <p>{L.short_license_notice}</p>

                    <h3>{L.see_full_license_terms}:</h3>

                    <a href={L.full_license_termns_link} target="_blank">{L.full_license_termns_link}</a>

                    <h3>{L.get_the_source_code}:</h3>

                    <a href={L.full_source_link} target="_blank">{L.full_source_link}</a>



                    <h2>{L.credits}</h2>

                    <p>{L.assets_credits_are_here}</p>

                    <h2>{L.privacy}</h2>

                    <p>{L.privacy_notice}</p>

                    <h2>{L.other_links}</h2>

                    <span>{L.please_check_out}  <a href={L.contact_website} target="_blank">{L.my_other_projects}</a>, {L.and_especially_this_one}: </span>
                    <a href={L.psittacus_website} target="_blank">{L.psittacus}</a>.

                    <p>{L.liked_the_game_have_ideas}:</p>
                    <a href="mailto:luxlunarislabs@gmail.com">{L.contact_email}</a>

                </div>
            </div>



        </div>)
    }

}