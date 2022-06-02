from time import time

class Users:

    __instance = None
    __duration_of_session = 5*30 # seconds

    def __init__(self):
        self.users = {}

    @staticmethod
    def instance()->"Users":
        if Users.__instance is None:
            Users.__instance = Users()
        return Users.__instance
    
    def set_user_online(self, username:str):
        
        if username not in self.users:
            user = {}
        else:
            user = self.users[username]

        user["last_online"] = int(time())
        self.users[username] = user

    def is_user_online(self, username:str)->bool:

        if username not in self.users:
            return False
        
        return (time() - self.users[username]["last_online"]) <  Users.__duration_of_session