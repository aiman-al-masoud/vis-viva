import React, { Component } from "react"
// import DefaultImage from "../res/stoopid_choppy.gif"


/**
 * A Sprite is the basic graphical building block of any 2D game.
 */
export default class Sprite extends Component {

    constructor(props) {
        super(props);

        this.container = React.createRef()

        this.state = {
            xCoord: props.xCoord ?? 0,
            yCoord: props.yCoord ?? 0,
            movable: props.movable ?? true,
            visible: props.visible ?? true,
            icon: props.icon,
            width: props.width ?? "200px",
            flippedX: false
        }
    }

    content() {
        return <img src={this.state.icon} style={{ width: this.state.width }} />
    }

    render() {
        return (
            <div style={{ position: "absolute", top: this.state.yCoord, left: this.state.xCoord, width: this.state.width, visibility: this.state.visible ? "visible" : "hidden", padding: 0, margin: 0, transform: this.props.flippedX ? "scaleX(-1)" : "scaleX(1)" }} ref={this.container}>
                {this.content()}
            </div>
        )
    }

    moveX(step) {
        this.state.movable ? this.setState({ xCoord: this.state.xCoord + step }) : ""
    }

    moveY(step) {
        this.state.movable ? this.setState({ yCoord: this.state.yCoord + step }) : ""
    }


    //TODO: check y as well
    collide(collidable) {

        // console.log("x difference:", Math.abs(this.state.xCoord - collidable.state.xCoord))
        // console.log("y difference:", this.state.yCoord - collidable.state.yCoord)

        // maybe fixed #issue_1 
        let othersXCoord = collidable.props.flippedX ? 0.5 * window.innerWidth + collidable.state.xCoord : collidable.state.xCoord

        if (Math.abs(this.state.xCoord - othersXCoord) > this.state.width / 2) {
            return false
        }

        if (Math.abs(this.state.yCoord - collidable.state.yCoord) > this.state.width / 2) {
            return false
        }

        return true
    }

    hide() {
        this.setState({ visible: false })
    }

    show() {
        this.setState({ visible: true })
    }

    freeze() {
        this.setState({ movable: false })
    }

    unFreeze() {
        this.setState({ movable: true })
    }

    //TODO: check y as well
    isOffScreen() {
        // return (this.state.xCoord + this.state.width/2 ) < 0
        return (this.state.xCoord < 0) || (this.state.xCoord > window.innerWidth)
    }

}


