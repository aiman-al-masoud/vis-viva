#!/bin/bash

# assume server is up and running 

# login a user on a clean window without cookies
userLoginChrome(){
    username=$1
    config-dir="~/.config/chromium"
    mkdir ${config-dir}
    user-dir="${config-dir}/$username"
    rm -r ${user-dir}
    sleep 1
    chromium  --incognito --new-window  --user-data-dir=${user-dir}  http://127.0.0.1:5000 &
    sleep 3
    xdotool key Tab
    xdotool type "$username"
    sleep 1
    xdotool key Tab
    xdotool key Tab
    xdotool key Return 
}



pkill chromium
xdotool key Ctrl+Alt+Down # switch workspace
sleep 1
userLoginChrome uno 
sleep 1
xdotool key Ctrl+Alt+Down # switch workspace
userLoginChrome due 
sleep 1
xdotool key Ctrl+Alt+Up # back to workspace above
sleep 1
# uno challenges due
xdotool key Tab
xdotool key Return 
sleep 0.5
xdotool key Tab
xdotool key Return 












