class BattleUnit(dict):
    
    def __init__(self, faction:str, position:int, Type:str, health:int, maxHealth:int):
        self["faction"] = faction
        self["position"] = position
        self["type"] = Type
        self["health"] = health
        self["maxHealth"] = maxHealth