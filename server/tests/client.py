import requests as rq
from random import randint

homepage = "http://127.0.0.1:5000"

def i_am_online(username)->[{}]:
    return rq.post(f"{homepage}/i-am-online", cookies={"username":username}).json()    

def users_online()->[str]:
    return rq.get(f"{homepage}/online-users").json()

def fight_invite(challenger, defender, gameId):
    return rq.post(f"{homepage}/fight-invite", json={
        "challenger" : challenger,
        "defender" : defender,
        "gameId" : gameId
    }).text

def fight_accept(challenger, defender, gameId):
    return rq.post(f"{homepage}/fight-accept", json={
        "challenger" : challenger,
        "defender" : defender,
        "gameId" : gameId
    }).text


def ready(username, gameId, battleUnits):

    return rq.post(f"{homepage}/ready", 
    cookies={
        "username" : username
    },
    
    json={
        "battleUnits" : battleUnits,
        "gameId" : gameId
    }).text
    

def fire(username, fromUnit, toUnit, Id, gameId):

    return rq.post(f"{homepage}/fire", 
    cookies={
        "username" : username
    },
    
    json={
        "fromUnit" : fromUnit,
        "toUnit" : toUnit,
        "gameId" : gameId,
        "id" : Id
    }).text


def fire_ack(username, toUnit, Id, gameId, victimDead, allDeadGiveUp):

    return rq.post(f"{homepage}/fire-ack", 
    cookies={
        "username" : username
    },
    
    json={
        "toUnit" : toUnit,
        "gameId" : gameId,
        "id" : Id,
        "victimDead" : victimDead,
        "allDeadGiveUp" : allDeadGiveUp
    }).text


