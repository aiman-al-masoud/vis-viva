class Event(dict):
    def __init__(self):
        dict.__init__(self)
    

    def set_sent_by_strategos(self, t:bool):
        self["sent_by_strategos"] = t
    
    def is_sent_by_strategos(self)->bool:
        return self["sent_by_strategos"] if "sent_by_strategos" in self else False