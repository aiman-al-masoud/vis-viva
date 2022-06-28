from battle_unit import BattleUnit

class Mushroom(BattleUnit):
    
    def __init__(self, faction, position):
        BattleUnit.__init__(self, faction, position, "Mushroom", 60 , 60)
        self["missRate"] = 0.1
        self["criticalHitRate"] = 0.9
        self["dodgeRate"] = 0
        self["criticalHitMultiplier"] = 4
        self["damage"] = 20