//allows you to browse active players and challenge them
import React, { Component } from "react";
import BackgroundImage from "../../res/icons/backgrounds/world-map-bg.gif"

/**
 */
export default class WorldMap extends Component {

    /**
     * 
     * @param {{
     * getOnlineUsers : ()=>Promise<[string]>,
     * challengeUser : (user:string)=>Promise<void>
     * }} props 
     */
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            onlineUsers: [],
            usersXps : []
        }
    }


    render() {
        return (<div style={{backgroundImage:  `url(${BackgroundImage})` , height:"100vh", padding:"5px", backgroundPosition:"center", backgroundRepeat:"no-repeat" }}>
            <h1>Online Users</h1>
            <p>Click on a user to challenge them!</p>

            <ul>
                { this.state.onlineUsers.map((u, i) => <li key={i}  onClick={()=>{this.props.challengeUser(u)}} >         {u}        </li>)}
            </ul>


         <div style={{float:"right"}}>
         <ol>
                { this.state.usersXps.map((u, i) => <li key={i}   >         {u[0]}  - {u[1]}       </li>)}
            </ol>
         </div>


        </div>)
    }


    componentDidMount() {
        this.props.getOnlineUsers().then(p => this.setState({ onlineUsers: p }))
        this.props.getUsersXps().then(p => this.setState({ usersXps: p }))

        this.interval = setInterval(() => {
            this.props.getOnlineUsers().then(p => this.setState({ onlineUsers: p }))
            this.props.getUsersXps().then(p => this.setState({ usersXps: p }))
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


}