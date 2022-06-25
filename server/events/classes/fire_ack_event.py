from .event import Event

class FireAckEvent(Event):

    def __init__(self, toUnit, Id:int, gameId:int, victimDead:bool, allDeadGiveUp:bool, miss:bool, dodge:bool, criticalHit:bool):
        self["eventType"] = "fire-ack"
        self["toUnit"] = toUnit
        self["id"] = Id
        self["gameId"] = gameId
        self["victimDead"] = victimDead
        self["allDeadGiveUp"] = allDeadGiveUp
        self["miss"] = miss
        self["dodge"] = dodge
        self["criticalHit"] =criticalHit
