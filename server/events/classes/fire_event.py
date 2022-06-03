from .event import Event

class FireEvent(Event):

    def __init__(self, fromUnit, toUnit, Id:int, gameId:int):
        self["eventType"] = "fire"
        self["fromUnit"] = fromUnit
        self["toUnit"] = toUnit
        self["id"] = Id
        self["gameId"] = gameId