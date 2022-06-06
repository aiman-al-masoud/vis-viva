from battle_unit import BattleUnit

class Game:
    
    """
    A dataclass to represent an evolving game between two players.
    """

    GAME_POOL = [] 
    
    def __init__(self, challenger:str, defender:str, gameId:int):
        self.__challenger = challenger
        self.__defender = defender
        self.__gameId = gameId
        self.__battle_units_dict = {}
        self.__username_current_turn = challenger # challenger gets first move
        Game.GAME_POOL.append(self)
    
    def challenger(self)->str:
        return self.__challenger
    
    def defender(self)->str:
        return self.__defender

    def game_id(self)->int:
        return self.__gameId

    def set_battle_units(self, username:str, battleUnits:[BattleUnit]):
        self.__battle_units_dict[username] = battleUnits
    
    def get_battle_units(self, username:str)->[BattleUnit]:
        return self.__battle_units_dict[username]

    def game_over(self):

        """
        Terminates a Game.
        """
        Game.GAME_POOL.remove(self)

    def __repr__(self):
        return f"Game(challenger={self.__challenger},defender={self.__defender})"
    
    def get_other_player(self, username:str)->str:
        """
        Given a player, get the other one.
        """

        if username not in [self.__challenger, self.__defender]:
            raise ValueError(f"error: specified player '{username}' not in game: {self}")

        return self.__challenger if username==self.__defender else self.__defender


    def get_turn(self)->str:
        """
        Returns the username of the player whose turn it is.
        """
        return self.__username_current_turn

    def change_turn(self):
        """
        Current player is done playing, it's the other's turn.
        """
        self.__username_current_turn = self.get_other_player(self.__username_current_turn)


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