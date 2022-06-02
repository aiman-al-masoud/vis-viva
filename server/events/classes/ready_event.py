from .event import Event

class ReadyEvent(Event):

    def __init__(self, username:str, battleUnits:[], gameId:int):
        self["username"] = username
        self["battleUnits"] = battleUnits
        self["gameId"] = gameId