from .event import Event

class GameOverEvent(Event):

    def __init__(self, winner:str):
        self["event_type"] = "game-over"
        self["winner"] = winner