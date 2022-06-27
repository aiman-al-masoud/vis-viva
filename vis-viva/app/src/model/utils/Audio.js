import S from "./Settings.js"

export default class Audio{

    static playBase64(base64String){
        if(S.getInstance().get(S.SOUND)){
            let audio = document.createElement("audio")
            audio.src = base64String
            audio.play()
        }
    }

}



