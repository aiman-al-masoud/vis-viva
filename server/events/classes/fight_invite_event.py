from .event import Event

class FightInviteEvent(Event):

    def __init__(self, challenger:str, defender:str, gameId:int):
        self["eventType"] = "fight-invite"
        self["challenger"] = challenger
        self["defender"] = defender
        self["gameId"] = gameId