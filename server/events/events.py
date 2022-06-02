from .classes.event import Event

class Events:

    __instance = None

    def __init__(self):
        self.__player_queues = {}

    @staticmethod
    def instance()->'Events':
        if Events.__instance is None:
            Events.__instance = Events()
        return Events.__instance

    def add_event(self, username:str, event:Event):

        """
        Add an event to a player's queue.
        """
        
        if username not in self.__player_queues:
            events = []
        else:
            events = self.__player_queues[username]

        events.append(event)
        self.__player_queues[username] = events

    def pop_event_queue(self, username:str)->[Event]:

        """
        Get the events for a player and remove them
        from the queue.
        """

        if username not in self.__player_queues:
            return []

        b = list(self.__player_queues[username])
        self.__player_queues[username].clear()

        return b 