#!/bin/bash

# two users log in
./test-post.sh 'i-am-online' 'capra' '{}' 
./test-post.sh 'i-am-online' 'cammerlo' '{}' 

# check users online
echo -e "\n\n"
echo -e "online users:"
./test-post.sh 'online-users' 
echo ""

# a user challenges the other
echo "user challenging other:"
./test-post.sh 'fight-invite' 'capra'     '{ "challenger" : "capra", "defender" : "cammerlo" , "gameId" : 1911 }'
echo ""

sleep 0.1

# other user receives fight-invite event 
echo "fight-invite received by defender:"
./test-post.sh 'i-am-online' 'cammerlo' '{}'
echo -e "\n"

# other user accepts fight
echo "other user accepts fight"
./test-post.sh 'fight-accept' 'cammerlo' '{ "challenger" : "capra", "defender" : "cammerlo" , "gameId" : 1911 }'
echo ""


# challenger is ready:
















