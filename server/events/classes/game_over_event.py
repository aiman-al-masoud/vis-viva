from .event import Event

class GameOverEvent(Event):

    def __init__(self, winner:str, **kwargs:{"opponentLeft":bool}):
        self["eventType"] = "game-over"
        self["winner"] = winner
        self["opponentLeft"] = False
        self.update(kwargs)