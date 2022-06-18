import React, {Component} from "react";
import reactDom from "react-dom";
import App from "./App.jsx";
import "./index.css"
import Favicon from "../res/icons/logo.png"
import Background from "../res/icons/backgrounds/background.jpg"

// set title
document.title = "Vis Viva"

//set favicon
let link = document.createElement('link')
link.rel = 'shortcut icon';
link.href = Favicon;
document.head.appendChild(link);

//set bg
document.body.style.background = `url('${Background}') center`
document.body.style.backgroundSize = "cover"


//start app!
reactDom.render(<App/>,  window.root)