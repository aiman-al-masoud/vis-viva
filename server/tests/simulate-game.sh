#!/bin/bash

# assume server is up and running 


# shifts focus back on browser's search bar
resetFocus(){
    xdotool key Ctrl+l
}

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



pkill chrome
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

# get to editable battle field
xdotool key Tab
xdotool key Return 
sleep 0.5
xdotool key Tab
xdotool key Return 
sleep 0.5

# add some battle units
xdotool key Tab
xdotool key Tab
xdotool key Return
sleep 1
xdotool key Tab
xdotool key Tab
xdotool key Tab
xdotool key Return 
sleep 1

# send challenge 
resetFocus
xdotool key Tab
xdotool key Return 
sleep 1

# down to due
xdotool key Ctrl+Alt+Down # switch workspace
sleep 1
# accept challenge
resetFocus
xdotool key Tab 
xdotool key Return 
















