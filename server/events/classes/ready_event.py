from .event import Event

class ReadyEvent(Event):

    def __init__(self, battleUnits:[], gameId:int):
        self["eventType"] = "ready"
        self["battleUnits"] = battleUnits
        self["gameId"] = gameId