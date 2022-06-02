from client import *


print(i_am_online("capra"))
print(i_am_online("cammerlo"))
print(users_online())
gameId =  randint(0, 9999999)
print(fight_invite("capra", "cammerlo", gameId))
print(fight_accept("capra", "cammerlo", gameId))
print(ready("capra",  gameId, []))
print(fire("capra", {}, {}, 1, gameId))
print(fire_ack("capra", {}, 1, gameId, True, False))



