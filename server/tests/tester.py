import requests as rq

homepage = "http://127.0.0.1:5000"

def i_am_online(username)->[{}]:
    return rq.post(f"{homepage}/i-am-online", cookies={"username":username}).json()    

def users_online()->[str]:
    return rq.get(f"{homepage}/online-users").json()

def 


# print(i_am_online("capra"))
print(users_online())





