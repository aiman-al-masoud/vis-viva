import BattleUnit from "./BattleUnit.js"
import Game from "./Game.js"
import S from "./Settings.js"


export default class Server {

    __instance = undefined

    constructor() {

    }

    /**
     * 
     * @returns {Server}
     */
    static instance() {
        return (Server.__instance = Server.__instance ?? new Server())
    }

    /**
     * 
     * @returns {Promise<[{eventType:string }]>}
     */
    iAmOnline = async () => {
        let res = await fetch('/i-am-online',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })

        return (await res.json()).events
    }

    /**
     * Get online users except for myself.
     * @returns {Promise<[string]>}
     */
    onlineUsers = async () => {
        let l = (await fetch('/online-users'))
        l = await l.json()
        return l.filter(u => u != S.getInstance().get(S.USERNAME) )
    }


    /**
     * Get all of the users' experience points (xps)
     * @returns {Promise<[[string, number]]>}
     */
     usersXps = async () => {
        let l = (await fetch('/users-xps'))
        l = await l.json()
        l = l.sort((u1, u2)=>{return u2[1]-u1[1]})
        return l
    }

    /**
     * 
     * @param {Game} game 
     */
    fightInvite = async (game) => {
        let res = await fetch('/fight-invite',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    challenger: game.challenger,
                    defender: game.defender,
                    gameId: game.gameId
                })
            })

        return res.text()
    }

    /**
     * 
     * @param {Game} game 
     */
    fightAccept = async (game) => {
        let res = await fetch('/fight-accept',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    challenger: game.challenger,
                    defender: game.defender,
                    gameId: game.gameId
                })
            })

        return res.text()
    }

    /**
    * 
    * @param {Game} game 
    */
    ready = async (game) => {
        let res = await fetch('/ready',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    gameId: game.gameId,
                    battleUnits: game.getBattleUnits(S.getInstance().get(S.USERNAME))
                })
            })

        return res.text()
    }

    /**
     * 
     * @param {Game} game 
     * @param {BattleUnit} fromUnit 
     * @param {BattleUnit} toUnit 
     * @returns 
     */
    fire = async (game, fromUnit, toUnit) => {
        let res = await fetch('/fire',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    gameId: game.gameId,
                    fromUnit: fromUnit,
                    toUnit: toUnit,
                    id: parseInt(999999 * Math.random())
                })
            })

        return res.text()
    }

    /**
     * 
     * @param {Game} game 
     * @param {BattleUnit} toUnit 
     * @param {number} id 
     * @param {boolean} victimDead 
     * @param {boolean} allDeadGiveUp 
     * @returns 
     */
    fireAck = async (game, toUnit, id, victimDead, allDeadGiveUp) => {
        let res = await fetch('/fire-ack',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    gameId: game.gameId,
                    toUnit: toUnit,
                    id: id,
                    victimDead: victimDead,
                    allDeadGiveUp: allDeadGiveUp
                })
            })

        return res.text()
    }

    /**
     * 
     * @param {Game} game 
     */
    pvc = async (game) =>{
        let res = await fetch('/pvc',
            {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    gameId: game.gameId,
                })
            })
    }



}