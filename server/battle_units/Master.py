from battle_unit import BattleUnit

class Master(BattleUnit):
    
    def __init__(self, faction, position):
        BattleUnit.__init__(self, faction, position, "Master", 40 , 40)
        self["missRate"] = 0.1
        self["criticalHitRate"] = 0.7
        self["dodgeRate"] = 0.3
        self["criticalHitMultiplier"] = 2.5
        self["damage"] = 30