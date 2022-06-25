import RemoteEvents from "../RemoteEvents";
import Event from "../Event";

export default class GameOverEvent extends Event{

    /**
     * 
     * @param {{
     * gameId: number,
     * winner: string, 
     * opponentLeft: boolean
     * }} json 
     */
    constructor(json){
        super(RemoteEvents.GAME_OVER)

        this.gameId = json.gameId
        this.winner = json.winner
        this.opponentLeft = json.opponentLeft
    }
    
}



