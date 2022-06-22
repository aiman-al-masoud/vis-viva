from events.classes.event import *
from events.classes.fight_accept_event import *
from events.classes.fight_invite_event import *
from events.classes.fire_ack_event import *
from events.classes.fire_event import *
from events.classes.ready_event import *
from events.classes.game_over_event import *
from battle_unit import BattleUnit
from game import Game
from random import randint

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
            battle_units = [BattleUnit(self.game.game_id(), 2, "Samurai", 20, 20), BattleUnit(self.game.game_id(), 3, "Master", 20, 20)]
            self.game.set_battle_units( self.game.defender() , battle_units)
            e = ReadyEvent(battle_units, event["gameId"])
            e.set_sent_by_strategos(True)
            Events.instance().add_event(self.game.challenger(), e)
        
        elif isinstance(event, FireEvent):
            from_unit = event["fromUnit"]
            to_unit = event["toUnit"]

            print("Strategos.add_event()", from_unit, to_unit)

            battle_units = self.game.get_battle_units(self.game.defender())
            
            # for b in battle_units:
            #     if b["position"]==to_unit["position"]:
            #         b["health"]-=from_unit["damage"]
            #         victim = b

            battle_units = [b for b in battle_units if b["position"]!=to_unit["position"]]
            to_unit["health"]-=from_unit["damage"]
            victim = to_unit
            battle_units.append(victim)

            
            battle_units = [b for b in battle_units if b["health"] > 0]

            self.game.set_battle_units(self.game.defender(), battle_units)

            e = FireAckEvent(victim, event["id"], self.game.game_id(), victim["health"]<=0,  len(battle_units)==0 )
            e.set_sent_by_strategos(True)
            Events.instance().add_event(self.game.challenger(), e)

            # if player wins
            if len(battle_units)==0:
                e = GameOverEvent(self.game.challenger())
                e.set_sent_by_strategos(True)
                Events.instance().add_event(self.game.challenger(),e )
                self.game.game_over()
                return 

            # fire back
            from_unit = battle_units[0]
            to_unit = self.game.get_battle_units(self.game.challenger())[0]
            e = FireEvent(from_unit, to_unit, randint(1, 999999999), self.game.game_id())
            e.set_sent_by_strategos(True)
            Events.instance().add_event(self.game.challenger(), e)
            self.game.change_turn()

        
        elif isinstance(event, FireAckEvent):
            
            to_unit = event["toUnit"]

            battle_units = self.game.get_battle_units(self.game.challenger())
            battle_units = [b for b in battle_units if b["position"]!=to_unit["position"]]

            if to_unit["health"]>0:
                battle_units.append(to_unit)

            # if server wins
            if len(battle_units)==0:
                e = GameOverEvent(self.game.defender())
                e.set_sent_by_strategos(True)
                Events.instance().add_event(self.game.challenger(),e )
                self.game.game_over()
                return 




        

        
    @staticmethod
    def get_strategos(gameId:str)->'Strategos':
        
        """
        Get the Strategos that is playing a Game.
        """

        li = [s for s in Strategos.STRATEGOI_POOL if s.game.game_id()==gameId]
        return li[0] if len(li)!=0 else None

    


