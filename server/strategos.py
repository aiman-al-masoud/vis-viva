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
from random import random

from battle_units.Samurai import Samurai
from battle_units.Master import Master
from battle_units.FireWorm import FireWorm
from battle_units.KingBourouf import KingBourouf
from battle_units.Mushroom import Mushroom


class Strategos:

    """
    Plays a game against a client.
    """

    STRATEGOI_POOL = []

    def __init__(self, game:Game):
        self.game=game
        Strategos.STRATEGOI_POOL.append(self)

    def probability(self, probability):
        return (False if probability==0 else True) and (random() <= probability )

    def get_random_battle_unit(self, position):
            x = randint(1, 5)
            if x==1:
                return Samurai(self.game.game_id(), position) 
            if x==2:
                return Master(self.game.game_id(), position)
            if x==3:
                return FireWorm(self.game.game_id(), position)
            if x==4:
                return KingBourouf(self.game.game_id(), position) 
            if x==5:
                return Mushroom(self.game.game_id(), position)
            
    def generate_random_army(self):
        return [self.get_random_battle_unit(i) for i in range(1, 9)]
        
        
    def add_event(self, event:Event):

        from events.events import Events

        if isinstance(event, FightInviteEvent):
            e = FightAcceptEvent(event["challenger"], event["gameId"] , event["gameId"] )
            Events.instance().add_event(event["challenger"], e)
        
        elif isinstance(event, ReadyEvent):
            battle_units = self.generate_random_army()
            self.game.set_battle_units( self.game.defender() , battle_units)
            e = ReadyEvent(battle_units, event["gameId"])
            e.set_sent_by_strategos(True)
            Events.instance().add_event(self.game.challenger(), e)
        
        elif isinstance(event, FireEvent):
            
            from_unit = event["fromUnit"]
            to_unit = event["toUnit"]

            miss = self.probability(from_unit["missRate"])
            dodge = self.probability(to_unit["dodgeRate"])
            criticalHit = self.probability(from_unit["criticalHitRate"])
            criticalHitMultiplier = from_unit["criticalHitMultiplier"]
            damage = from_unit["damage"]

            # get strategos's battle units
            battle_units = self.game.get_battle_units(self.game.defender())
            battle_units = [b for b in battle_units if b["position"]!=to_unit["position"]]

            # determine damage 
            if miss:
                damage = 0
            elif dodge:
                damage = 0
            elif criticalHit:
                damage = criticalHitMultiplier*damage

            to_unit["health"]-=damage
            victim = to_unit
            battle_units.append(victim)

            # remove dead battle units
            battle_units = [b for b in battle_units if b["health"] > 0]
            self.game.set_battle_units(self.game.defender(), battle_units)

            # send fire-ack
            e = FireAckEvent(victim, event["id"], self.game.game_id(), victim["health"]<=0,  len(battle_units)==0, miss, dodge, criticalHit )
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
            from_unit = battle_units[ randint(0, len(battle_units)-1) ]
            to_unit = event["fromUnit"]
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
