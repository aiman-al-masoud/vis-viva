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
            usersXps: []
        }
    }


    render() {
        // return (<div style={{backgroundImage:  `url(${BackgroundImage})` , height:"100vh", padding:"5px", backgroundPosition:"center", backgroundRepeat:"no-repeat" }}>

        return (<div>

            <img src={BackgroundImage} width="200" />

            <h1>World Map</h1>

            <div>
                <h2>Online Users</h2>
                <p>Click on a user in the list to challenge them!</p>

                <ul>
                    {this.state.onlineUsers.map((u, i) => <li key={i}  >    <button onClick={() => { this.props.challengeUser(u) }}  > {u}</button>    </li>)}
                </ul>
            </div>

            <div>
                <h2>Global Ranking</h2>
                <ol >
                    {this.state.usersXps.map((u, i) => <li key={i}    >         {u[0]}  - {u[1]}       </li>)}
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