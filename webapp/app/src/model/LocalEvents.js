export default class LocalEvents{

    static events = []

    
    static postEvent(event){
        LocalEvents.events.push(event)
    }

    /**
     * 
     * @returns {[{}]}
     */
    static get(){
        let buf = LocalEvents.events
        LocalEvents.events = []
        return buf
    }

}

