class Server{

    __instance = undefined

    constructor(){
        
    }

    static instance(){
        return (Server.__instance = Server.__instance ?? new Server())
    }

    iAmOnline(){
        fetch()        
    }




}