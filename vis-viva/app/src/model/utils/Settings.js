import Cookies from "./Cookies.js"

/**
 * A wrapper around localStorage, that provides
 * syntactic sugar to set and get global settings params.
 * 
 * ### Usage:
 * 
 * Settings.getInstance().set(Settings.TEST, "new value")
 * 
 * let val = Settings.getInstance().get(Settings.TEST)
 * 
 */
 export default class Settings{

    //Keys:
    static APP_LANGUAGE = "APP_LANGUAGE"
    static USERNAME = "username"

    //instance
    static __instance = undefined

    constructor(){
        this.settingsDict = JSON.parse( localStorage.getItem("SETTINGS") ?? "{}" )
    }

    /**
     * 
     * @returns {Settings}
     */
    static getInstance(){
        return Settings.__instance = Settings.__instance ?? new Settings()
    }

    /**
     * 
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value){
        this.settingsDict[key] = value
        localStorage.setItem("SETTINGS", JSON.stringify(this.settingsDict))

        //settings to be saved also in cookies
        if( [Settings.USERNAME].includes(key)  ){
            Cookies.setCookie(key.toLowerCase(), value)
        }

    }

    get(key){
        return this.settingsDict[key] 
    }

    delete(key){

        delete this.settingsDict[key]   
        localStorage.setItem("SETTINGS", JSON.stringify(this.settingsDict))

        //settings to be also removed from cookies
        // if( [Settings.USERNAME].includes(key)  ){
        //     // Cookies.
        // }

    }

}

