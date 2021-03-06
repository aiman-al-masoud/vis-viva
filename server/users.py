from time import time
import json
import os
import sys

my_open = open
my_meta_path = sys.meta_path

class Users:

    path = "./data/users.json"
    __instance = None
    __duration_of_session = 5*30 # seconds

    def __init__(self):
        self.users = {}
        self.load()

    @staticmethod
    def instance()->"Users":
        if Users.__instance is None:
            Users.__instance = Users()
        return Users.__instance

    def get_user(self, username:str):
        """
        Get existing user, else create and return new blank user
        """
        if username not in self.users:
            user = {"xp":0, "last_online":-1}
            self.users[username] = user
            self.save()
        else:
            user = self.users[username]
        
        return user
    
    def set_user_online(self, username:str):
        user = self.get_user(username)
        user["last_online"] = int(time())
        
    def is_user_online(self, username:str)->bool:

        if username not in self.users:
            return False
        
        return (time() - self.users[username]["last_online"]) <  Users.__duration_of_session
    
    def online_users(self)->[str]:
        return [ user for user in self.users.keys() if self.is_user_online(user) ]

    def get_user_xp(self, username)->int:
        """
        Get a user's xp.
        """
        return self.get_user(username)["xp"] or 0

    def add_user_xp(self, username:str, delta_xp:int):
        """
        Add xp to a user.
        """
        user = self.get_user(username)
        user["xp"] = user["xp"] or 0 
        user["xp"]+=delta_xp

        self.save()
    
    def user_xps(self)->[(str, int)]:
        """
        Get a list of tuples where each tuple has username and xp of a user.
        """
        return [ (username, data["xp"]) for username, data in self.users.items() ]

    def save(self):
        
        if not os.path.isdir(os.path.split(Users.path)[0]):
            os.makedirs(os.path.split(Users.path)[0])

        with my_open(Users.path, "w+") as f:
            f.write(json.dumps(self.users))

    def load(self):
        
        if not os.path.exists(Users.path):
            return 

        with open(Users.path, "r") as f:
            self.users = json.loads(f.read())
    