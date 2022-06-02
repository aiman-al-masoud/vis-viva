from .event import Event

class FightAcceptEvent(Event):

    def __init__(self, challenger:str, defender:str, gameId:int):
        self["event_type"] = "fight-accept"
        self["challenger"] = challenger
        self["defender"] = defender
        self["gameId"] = gameId