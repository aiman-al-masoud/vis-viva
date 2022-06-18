import React, {Component} from "react";
import reactDom from "react-dom";
import App from "./App.jsx";
import "./index.css"
import Favicon from "../res/icons/logo.png"


//set favicon
let link = document.createElement('link')
link.rel = 'shortcut icon';
link.href = Favicon;
document.head.appendChild(link);

//start app!
reactDom.render(<App/>,  window.root)