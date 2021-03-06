#!/bin/bash

# check if server is up and running 
SERVER="http://127.0.0.1:5000"
x=$(curl $SERVER > tmp1 2> tmp2; cat tmp2 | egrep -o 'Failed to connect')
if [[ -z "$x" ]]
then 
echo ""
else 
echo "Server is down!"
exit 
fi
rm tmp1 tmp2



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
    chromium  --incognito --new-window  --user-data-dir=${user-dir}  $SERVER &
    sleep 3
    xdotool key Tab
    xdotool type "$username"
    sleep 1
    # xdotool key Tab
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

# change battle unit to Samurai
resetFocus
xdotool key --repeat 12 Tab 
xdotool key Return 
resetFocus

# add some battle units
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

# add battle unit
sleep 1
xdotool key Tab 
xdotool key Tab 
xdotool key Return 

# accept challenge 
resetFocus
xdotool key Tab
xdotool key Return 
sleep 1


# back to uno
xdotool key Ctrl+Alt+Up # switch workspace
sleep 1

# attack 
resetFocus
# choose attacker
xdotool key Tab
xdotool key Return 

# choose victim
resetFocus
xdotool key --repeat 12 Tab 
xdotool key Return 

