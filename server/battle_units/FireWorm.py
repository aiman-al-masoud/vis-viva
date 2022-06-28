from battle_unit import BattleUnit

class FireWorm(BattleUnit):
    
    def __init__(self, faction, position):
        BattleUnit.__init__(self, faction, position, "Fire Worm", 100 , 100)
        self["missRate"] = 0.3
        self["criticalHitRate"] = 0.8
        self["dodgeRate"] = 0.1
        self["criticalHitMultiplier"] = 3
        self["damage"] = 15