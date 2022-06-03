import BattleUnit from "./BattleUnit.js"
import Game from "./Game.js"
import Settings from "./Settings.js"

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
     * @returns {Promise<[{}]>}
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

    onlineUsers = async () => {
        return (await fetch('/online-users')).json()
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
                    battleUnits: game.getBattleUnits(Settings.getInstance().get(Settings.USERNAME))
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
                    fromUnit: fromUnit,
                    toUnit: toUnit,
                    id: id,
                    victimDead: victimDead,
                    allDeadGiveUp: allDeadGiveUp
                })
            })

        return res.text()
    }

}