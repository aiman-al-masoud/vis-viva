from event import Event

class FireAckEvent(Event):

    def __init__(self, toUnit, Id:int, gameId:int, victimDead:bool, allDeadGiveUp:bool):
        self["toUnit"] = toUnit
        self["id"] = Id
        self["gameId"] = gameId
        self["victimDead"] = victimDead
        self["allDeadGiveUp"] = allDeadGiveUp