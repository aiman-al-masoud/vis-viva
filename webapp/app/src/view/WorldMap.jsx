//allows you to browse active players and challenge them
import React, { Component } from "react";

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
            onlineUsers: []
        }
    }


    render() {
        return (<div>
            <h1>Online Users</h1>
            <p>Click on a user to challenge them!</p>

            <ul>
                {this.state.onlineUsers.map((u, i) => <li key={i}><button  onClick={()=>{this.props.challengeUser(u)}}  >{u}</button></li>)}
            </ul>
        </div>)
    }


    componentDidMount() {
        this.props.getOnlineUsers().then(p => this.setState({ onlineUsers: p }))

        this.interval = setInterval(() => {
            this.props.getOnlineUsers().then(p => this.setState({ onlineUsers: p }))
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }


}