export default class LocalEvents{

    static events = []

    
    static postEvent(event){
        Event.events.push(event)
    }

    /**
     * 
     * @returns {[{}]}
     */
    static get(){
        let buf = Events.events
        Event.events = []
        return buf
    }

}

