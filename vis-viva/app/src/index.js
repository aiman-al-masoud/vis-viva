import React, {Component} from "react";
import reactDom from "react-dom";
import App from "./App.jsx";
import "./index.css"
import Favicon from "../res/icons/favicon.png"
import Background from "../res/backgrounds/background.jpg"
import SamuraiFont from "../res/fonts/Gomo-MOZv.ttf"
import { importFont } from "./model/utils/Fonts.js";

// import fonts
importFont(SamuraiFont, "Samurai")

// set title
document.title = "Vis Viva"

// set favicon
let link = document.createElement('link')
link.rel = 'shortcut icon';
link.href = Favicon;
document.head.appendChild(link);

// set bg
document.body.style.background = `url('${Background}') center`
document.body.style.backgroundSize = "cover"


// start app!
reactDom.render(<App/>,  window.root)