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
gameId = randint(0, 999999)
r = fight_invite(p1, p2, gameId)
print(p1, "sent fight-invite:", r)

# the challenged player receives the invite
events = i_am_online(p2)
print(p2, "received:", events)

# the challenged player accepts the invite
r = fight_accept(p1, p2, gameId)
print(p2, "sent fight-accept:", r)

# the challenger receives the fight-accept
events = i_am_online(p1)
print(p1, "received:", events)

# the challenger is ready
r = ready(p1, gameId, [])
print(p1, "is ready:", r)

# the challenged is ready
r = ready(p2, gameId, [])
print(p2, "is ready:", r)

# players exchange blows
fire(p1, {}, {}, 1, gameId)
i_am_online(p2)
fire_ack(p2, {}, 1, gameId, False, False)
i_am_online(p1)
fire(p2, {}, {}, 2, gameId)
i_am_online(p1)
fire_ack(p1, {}, 2, gameId, False, False)
i_am_online(p2)
fire(p1, {}, {}, 3, gameId)
i_am_online(p2)

# game is over
fire_ack(p2, {}, 3, gameId, True, True)

# game over event reaches players
print(p1, "received:",  i_am_online(p1))
print(p2, "received:",  i_am_online(p2))
