class Server{

    __instance = undefined

    constructor(username, baseUrl){
        this.username = username
        this.baseUrl = baseUrl
    }

    static instance(){
        return (Server.__instance = Server.__instance ?? new Server())
    }

    iAmOnline(){
        fetch()        
    }




}