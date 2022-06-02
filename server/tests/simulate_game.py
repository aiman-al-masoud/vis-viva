from client import *
from time import sleep
from random import randint

# players' usernames
p1 = "capra"
p2 = "cammerlo"

# players connect to the server
print(p1, "and", p2, "connecting...")
i_am_online(p1)
i_am_online(p2)
sleep(0.1)

# check connected players
print("connected players:")
print(users_online())
sleep(0.1)

# a player challenges the other
r = fight_invite(p1, p2, randint(0, 999999))
print(p1, "sent fight-invite:", r)

# the defender receives the invite & accepts it
events = i_am_online(p2)
print(p2, "received:", events)
r = fight_accept(p1, p2, events[0]["gameId"])
print(p2, "sent fight-accept:", r)

# the challenger receives the fight-accept 
events = i_am_online(p1)
print(p1, "received:", events)

# the challenger sends the ready event
r = ready(p1, events[0]["gameId"], [])
print(p1, "is ready:", r)

# the defender player receives the ready event and sends it back
events = i_am_online(p2)
print( p2, "received:", events)
r = ready(p2, events[0]["gameId"], [])
print(p2, "is ready:", r)

# the challenger receives that the defender is ready
events = i_am_online(p1)
print(p1, "received:", events)

# players exchange blows
fire(p1, {}, {}, 1, events[0]["gameId"])

events = i_am_online(p2)
fire_ack(p2, {}, 1, events[0]["gameId"], False, False)

events = i_am_online(p1)
fire(p2, {}, {}, 2, events[0]["gameId"])

events = i_am_online(p1)
fire_ack(p1, {}, 2, events[0]["gameId"], False, False)

events = i_am_online(p2)
fire(p1, {}, {}, 3, events[0]["gameId"])


# game is over
events = i_am_online(p2)
fire_ack(p2, {}, 3, events[0]["gameId"], True, True)

# game over event reaches players
print(p1, "received:",  i_am_online(p1))
print(p2, "received:",  i_am_online(p2))
