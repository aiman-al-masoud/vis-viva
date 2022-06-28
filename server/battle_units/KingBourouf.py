from battle_unit import BattleUnit

class KingBourouf(BattleUnit):
    
    def __init__(self, faction, position):
        BattleUnit.__init__(self, faction, position, "King Bourouf", 90 , 90)
        self["missRate"] = 0.1
        self["criticalHitRate"] = 0.2
        self["dodgeRate"] = 0.3
        self["criticalHitMultiplier"] = 10
        self["damage"] = 40