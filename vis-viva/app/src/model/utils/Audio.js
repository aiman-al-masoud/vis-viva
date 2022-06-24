export default class Audio{

    static playBase64(base64String){
        let audio = document.createElement("audio")
        audio.src = base64String
        audio.play()
    }

}



