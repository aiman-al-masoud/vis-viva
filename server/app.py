# python3 -m flask run
import json
from flask import Flask, render_template, request, send_file, redirect, url_for, make_response
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
from strategos import Strategos

app = Flask(__name__)
CORS(app)


def get_html():
    path=app.root_path+"/../vis-viva/dist/index.html"                                                              
    with open(path) as f:
        return f.read()

homepage = get_html()

@app.route('/')                                                                                                 
def index():     
    resp  = make_response(homepage)
    resp.cache_control.max_age=1*60*60
    return resp


@app.route('/i-am-online', methods = ["GET", "POST"])                                                                                                 
def i_am_online():

    if "username" not in request.cookies:
        return  "error: no username provided", 400
    
    # set user's online status
    username = request.cookies["username"]
    Users.instance().set_user_online(username)

    # return user's events
    evs = Events.instance().pop_event_queue(username)

    return json.dumps({ "events" : evs })

@app.route('/online-users', methods = ["GET", "POST"])                                                                                                 
def online_users():
    return json.dumps(Users.instance().online_users())

@app.route('/users-xps', methods = ["GET", "POST"])                                                                                                 
def user_xps():
    return json.dumps(Users.instance().user_xps())

@app.route('/fight-invite', methods = ["GET", "POST"])
def fight_invite():

    if "challenger" not in request.json:
        return  "error: 'challenger' not specified in json", 400
    
    if "defender" not in request.json:
        return  "error: 'defender' not specified in json", 400
    
    if "gameId" not in request.json:
        return  "error: 'gameId' not specified in json", 400

    challenger = request.json["challenger"]
    defender = request.json["defender"]
    gameId = request.json["gameId"]

    if Game.get_game_for(challenger) or Game.get_game_for(defender):
        return  "error: at least one of the players requested is already busy", 400

    # create a new Game
    Game(challenger, defender, gameId)
         
    # add fight invite event to queue of defender
    ev =  FightInviteEvent(challenger, defender, gameId)
    Events.instance().add_event(defender, ev)
    
    return 'success'


@app.route('/fight-accept', methods = ["GET", "POST"])
def fight_accept():
    
    if "challenger" not in request.json:
        return  "error: 'challenger' not specified in json", 400
    
    if "defender" not in request.json:
        return "error: 'defender' not specified in json", 400
    
    if "gameId" not in request.json:
        return  "error: 'gameId' not specified in json", 400

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
        return  "error: no username provided", 400

    if "gameId" not in request.json:
        return  "error: 'gameId' not specified in json", 400

    if "battleUnits" not in request.json:
        return "error: 'battleUnits' not specified in json", 400

    username = request.cookies["username"]
    battleUnits = request.json["battleUnits"]
    gameId = request.json["gameId"]

    # fetch and update Game's state
    g = Game.get_game_for(username)
    g.set_battle_units(username, battleUnits)

    # send ready event to opponent 
    ev = ReadyEvent( battleUnits, gameId)
    Events.instance().add_event( g.get_other_player(username) , ev)

    return "success"


@app.route('/fire', methods = ["GET", "POST"])
def fire():

    if "username" not in request.cookies:
        return  "error: no username provided", 400

    if "fromUnit" not in request.json:
        return "error: 'fromUnit' not specified in json", 400

    if "toUnit" not in request.json:
        return  "error: 'toUnit' not specified in json", 400

    if "id" not in request.json:
        return  "error: 'id' not specified in json", 400

    if "gameId" not in request.json:
        return "error: 'gameId' not specified in json", 400



    username = request.cookies["username"]
    fromUnit = request.json["fromUnit"]
    toUnit = request.json["toUnit"]
    Id = request.json["id"]
    gameId = request.json["gameId"]

    # fetch Game's state    
    g = Game.get_game_for(username)

    if g.get_turn() != username:
        return f"error: it's not your ({username}) turn to play", 400

    # relay fire event to victim
    ev = FireEvent(fromUnit, toUnit, Id, gameId)
    Events.instance().add_event( g.get_other_player(username) , ev)
    g.change_turn()

    return "success"


@app.route('/fire-ack', methods = ["GET", "POST"])
def fire_ack():


    if "username" not in request.cookies:
        return "error: no username provided", 400

    if "gameId" not in request.json:
        return "error: 'gameId' not specified in json", 400

    if "toUnit" not in request.json:
        return "error: 'toUnit' not specified in json", 400

    if "id" not in request.json:
        return  "error: 'id' not specified in json", 400

    if "victimDead" not in request.json:
        return "error: 'victimDead' not specified in json", 400

    if "allDeadGiveUp" not in request.json:
        return "error: 'allDeadGiveUp' not specified in json", 400
    

    username = request.cookies["username"]
    gameId = request.json["gameId"]
    toUnit = request.json["toUnit"]
    Id = request.json["id"]
    victimDead = request.json["victimDead"]
    allDeadGiveUp = request.json["allDeadGiveUp"]

    miss = request.json["miss"]
    dodge = request.json["dodge"]
    criticalHit = request.json["criticalHit"]


    # fetch and update Game's state
    g = Game.get_game_for(username)

    # relay fire-ack event to back to attacker 
    ev = FireAckEvent(toUnit, Id, gameId, victimDead, allDeadGiveUp, miss, dodge, criticalHit)
    Events.instance().add_event( g.get_other_player(username), ev)

    # eventually terminate Game
    if allDeadGiveUp:
        winner = g.get_other_player(username)
        ev = GameOverEvent(winner)
        Events().instance().add_event(username, ev)
        Events().instance().add_event(winner, ev)
        g.game_over()
        # increment winner's xp
        Users.instance().add_user_xp(winner, 100)

    return "success"


@app.route('/pvc', methods = ["GET", "POST"])
def pvc():
    
    """
    Start a new PVC game with this server 
    """

    if "username" not in request.cookies:
        return "error: no username provided", 400

    if "gameId" not in request.json:
        return "error: 'gameId' not specified in json", 400

    username = request.cookies["username"]
    gameId = request.json["gameId"]

    g = Game(username, gameId, gameId)
    s = Strategos(g)
    s.add_event(  FightInviteEvent(username, gameId, gameId) )

    return "success"

@app.route('/abort-game', methods = ["GET", "POST"])
def abort_game():
    """
    Tells the server that the player wants to abort current Game if any.
    """

    if "username" not in request.cookies:
        return  "error: no username provided", 400

    username = request.cookies["username"]

    game = Game.get_game_for(username)
    print(game)    

    # the other guy wins
    if game:
        winner = game.get_other_player(username)
        Events().instance().add_event(winner, GameOverEvent(winner, opponentLeft=True))
        game.game_over()

    print("after removing", Game.games())

    return "success"