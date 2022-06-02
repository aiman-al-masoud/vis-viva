# python3 -m flask run
import json
from flask import Flask, render_template, request, send_file, redirect, url_for
from flask_cors import CORS
from game import Game
from events.events import Events


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

    

    events_for_user  = []
    return json.dumps(  events_for_user  )


@app.route('/fight-invite', methods = ["GET", "POST"])
def fight_invite():

    if "challenger" not in request.json:
        return 400, "error: 'challenger' not specified in json"
    
    if "defender" not in request.json:
        return 400, "error: 'defender' not specified in json"
    
    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    # create a new Game

    
    # add fight invite event to queue of defender

    
    return 'success'


@app.route('/fight-accept', methods = ["GET", "POST"])
def fight_accept():
    
    if "challenger" not in request.json:
        return 400, "error: 'challenger' not specified in json"
    
    if "defender" not in request.json:
        return 400, "error: 'defender' not specified in json"
    
    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    
    
    # add fight accept event to queue of challenger


    return 'success'


@app.route('/ready', methods = ["GET", "POST"])
def ready():

    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    if "battleUnits" not in request.json:
        return 400, "error: 'battleUnits' not specified in json"

    # fetch and update Game's state


    # send ready event to opponent 


    return "success"


@app.route('/fire', methods = ["GET", "POST"])
def fire():

    if "fromUnit" not in request.json:
        return 400, "error: 'fromUnit' not specified in json"

    if "toUnit" not in request.json:
        return 400, "error: 'toUnit' not specified in json"

    if "id" not in request.json:
        return 400, "error: 'id' not specified in json"

    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    # fetch and update Game's state
    

    # relay fire event to toUnit's username

    return "success"


@app.route('/fire-ack', methods = ["GET", "POST"])
def fire_ack():

    if "gameId" not in request.json:
        return 400, "error: 'gameId' not specified in json"

    if "id" not in request.json:
        return 400, "error: 'id' not specified in json"

    if "victimDead" not in request.json:
        return 400, "error: 'victimDead' not specified in json"

    if "allDeadGiveUp" not in request.json:
        return 400, "error: 'allDeadGiveUp' not specified in json"

    # fetch and update Game's state

    # eventually terminate Game
    
    # relay fire-ack event to back to challenger 

    return "success"