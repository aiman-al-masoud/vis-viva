from events.classes.event import *
from events.classes.fight_accept_event import *
from events.classes.fight_invite_event import *
from events.classes.fire_ack_event import *
from events.classes.fire_event import *
from events.classes.ready_event import *
from events.classes.game_over_event import *
from battle_unit import BattleUnit
from game import Game

class Strategos:

    """
    Plays a game against a client.
    """

    # STRATEGOI_POOL:["Strategos"] = []
    STRATEGOI_POOL = []

    def __init__(self, game:Game):
        self.game=game
        Strategos.STRATEGOI_POOL.append(self)
        
    def add_event(self, event:Event):

        from events.events import Events

        if isinstance(event, FightInviteEvent):

            e = FightAcceptEvent(event["challenger"], event["gameId"] , event["gameId"] )
            Events.instance().add_event(event["challenger"], e)
        
        elif isinstance(event, ReadyEvent):
            
            print("Strategos.add_event()", event)

            b = BattleUnit(None, 1, "Samurai", 20, 20)
            e = ReadyEvent([b], event["gameId"])
            e.set_sent_by_strategos(True)
            Events.instance().add_event(self.game.challenger(), e)

        

        
    @staticmethod
    def get_strategos(gameId:str)->'Strategos':
        
        """
        Get the Strategos that is playing a Game.
        """

        li = [s for s in Strategos.STRATEGOI_POOL if s.game.game_id()==gameId]
        return li[0] if len(li)!=0 else None

    


