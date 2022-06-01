class Game:
    
    """
    A dataclass to represent an evolving game between two players.
    """

    GAME_POOL = [] 
    
    def __init__(self, challenger:str, defender:str, gameId:int):
        self.__challenger = challenger
        self.__defender = defender
        self.__gameId = gameId
        self.__challenger_event_queue = []
        self.__defender_event_queue = []
        Game.GAME_POOL.append(self)
    
    def challenger(self)->str:
        return self.__challenger
    
    def defender(self)->str:
        return self.__defender

    def game_id(self)->int:
        return self.__gameId

    def challenger_battle_units(self)->[]:
        return self.__challenger_battle_units

    def defender_battle_units(self)->[]:
        return self.__defender_battle_units

    def set_challenger_battle_units(self, battleUnits:[]):
        self.__challenger_battle_units = battleUnits
    
    def set_defender_battle_units(self, battleUnits:[]):
        self.__defender_battle_units = battleUnits
    
    def game_over(self):

        """
        Terminates a Game.
        """
        Game.GAME_POOL.remove(self)

    def __repr__(self):
        return f"Game(challenger={self.__challenger},defender={self.__defender})"

    def add_event_for_challenger(self, event):
        self.__challenger_event_queue.append(event)
    
    def add_event_for_defender(self, event):
        self.__defender_event_queue.append(event)
    
    def get_events_for_challenger(self):
        b = list(self.__challenger_event_queue)
        self.__challenger_event_queue.clear()
        return b

    def get_events_for_defender(self):
        b = list(self.__defender_event_queue)
        self.__defender_event_queue.clear()
        return b

    @staticmethod
    def games()->['Game']:

        """
        Get all of the currently open Games.
        """
        return Game.GAME_POOL
    
    @staticmethod
    def get_game_for(username:str)->'Game':
        
        """
        Get the Game (if any) in which username is playing. 
        Returns None if username is not playing any Game currently.
        """

        li = [g for g in Game.GAME_POOL if (g.challenger()==username) or (g.defender()==username)]
        return li[0] if len(li)!=0 else None
        





g = Game("capra", "asino", 1)
x = Game("capra2", "asino2", 2)
print(Game.games())
x.game_over()
print(Game.games())
print(Game.get_game_for("capra"))


