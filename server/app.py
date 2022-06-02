# python3 -m flask run
import json
from flask import Flask, render_template, request, send_file, redirect, url_for
from flask_cors import CORS
from game import Game
from events.events import Events
from users import Users
from battle_unit import BattleUnit
from events.classes.fight_accept_event import *
from events.classes.fight_invite_event import *
from events.classes.fire_ack_event import *
from events.classes.fire_event import *
from events.classes.ready_event import *
from events.classes.game_over_event import *

app = Flask(__name__)
CORS(app)

path=app.root_path+"/../webapp/dist/index.html"                                                              

with open(path) as f:
    homepage=f.read()

@app.route('/')                                                                                                 
def index():     
    return homepage

@app.route('/i-am-online')                                                                                                 
def i_am_online():
    
    if "username" not in request.cookies:
        return 400, "error: no username provided"
    
    # set user's online status
    username = request.cookies["username"]
    Users.instance().set_user_online(username)

    # return user's events
    ev = Events.instance().pop_event_queue(username)
    return json.dumps(ev)


@app.route('/fight-invite', methods = ["GET", "POST"])
def fight_invite():

    if "challenger" not in request.json:
        return 400, "error: 'challenger' not specified in json"
    
    if "defender" not in request.json:
        return 400, "error: 'defender' not specified in json"
    
    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    challenger = request.json["challenger"]
    defender = request.json["defender"]
    gameId = request.json["gameId"]

    # create a new Game
    Game(challenger, defender, gameId)
         
    # add fight invite event to queue of defender
    ev =  FightInviteEvent(challenger, defender, gameId)
    Events.instance().add_event(defender, ev)
    
    return 'success'


@app.route('/fight-accept', methods = ["GET", "POST"])
def fight_accept():
    
    if "challenger" not in request.json:
        return 400, "error: 'challenger' not specified in json"
    
    if "defender" not in request.json:
        return 400, "error: 'defender' not specified in json"
    
    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    challenger = request.json["challenger"]
    defender = request.json["defender"]
    gameId = request.json["gameId"]

    # add fight accept event to queue of challenger
    ev = FightAcceptEvent(challenger, defender, gameId)
    Events.instance().add_event(challenger, ev)

    return 'success'


@app.route('/ready', methods = ["GET", "POST"])
def ready():

    if "username" not in request.cookies:
        return 400, "error: no username provided"

    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    if "battleUnits" not in request.json:
        return 400, "error: 'battleUnits' not specified in json"

    username = request.cookies["username"]
    battleUnits = request.json["battleUnits"]
    gameId = request.json["gameId"]

    # fetch and update Game's state
    g = Game.get_game_for(username)
    g.set_battle_units(username, battleUnits)

    # send ready event to opponent 
    ev = ReadyEvent( g.get_other_player(username), battleUnits, gameId)
    Events.instance().add_event(username, ev)

    return "success"


@app.route('/fire', methods = ["GET", "POST"])
def fire():

    if "username" not in request.cookies:
        return 400, "error: no username provided"

    if "fromUnit" not in request.json:
        return 400, "error: 'fromUnit' not specified in json"

    if "toUnit" not in request.json:
        return 400, "error: 'toUnit' not specified in json"

    if "id" not in request.json:
        return 400, "error: 'id' not specified in json"

    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    username = request.cookies["username"]
    fromUnit = request.json["fromUnit"]
    toUnit = request.json["toUnit"]
    Id = request.json["id"]
    gameId = request.json["gameId"]

    # fetch and update Game's state    
    g = Game.get_game_for(username)

    # relay fire event to victim
    ev = FireEvent(fromUnit, toUnit, Id, gameId)
    Events.instance().add_event( g.get_other_player(username) , ev)

    return "success"


@app.route('/fire-ack', methods = ["GET", "POST"])
def fire_ack():

    if "username" not in request.cookies:
        return 400, "error: no username provided"

    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    if "toUnit" not in request.json:
        return 400, "error: 'toUnit' not specified in json"

    if "id" not in request.json:
        return 400, "error: 'id' not specified in json"

    if "victimDead" not in request.json:
        return 400, "error: 'victimDead' not specified in json"

    if "allDeadGiveUp" not in request.json:
        return 400, "error: 'allDeadGiveUp' not specified in json"

    username = request.cookies["username"]
    gameId = request.json["gameId"]
    toUnit = request.json["toUnit"]
    Id = request.json["id"]
    victimDead = request.cookies["victimDead"]
    allDeadGiveUp = request.cookies["allDeadGiveUp"]

    # fetch and update Game's state
    g = Game.get_game_for(username)

    # relay fire-ack event to back to challenger 
    ev = FireAckEvent(toUnit, Id, gameId, victimDead, allDeadGiveUp)
    Events.instance().add_event( g.get_other_player(username), ev)

    # eventually terminate Game
    if allDeadGiveUp:
        ev = GameOverEvent(g.get_other_player(username))
        Events().instance().add_event(username, ev)
        Events().instance().add_event(g.get_other_player(username), ev)
        g.game_over()

    return "success"