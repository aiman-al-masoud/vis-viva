from battle_unit import BattleUnit

class Samurai(BattleUnit):
    
    def __init__(self, faction, position):
        BattleUnit.__init__(self, faction, position, "Samurai", 50 , 50)
        self["missRate"] = 0.2
        self["criticalHitRate"] = 0.6
        self["dodgeRate"] = 0.2
        self["criticalHitMultiplier"] = 2
        self["damage"] = 15