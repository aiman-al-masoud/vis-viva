const langNames = require.context("../../../res/lang-packs", false, /.json$/).keys().map((key)=>{return key.replace("./","").replace(".json", "")  })
const langPacks = require.context("../../../res/lang-packs", false, /.json$/).keys().map(require.context("../../../res/lang-packs", false, /.json$/))
var langs = {}
langNames.forEach( (obj, i)=>{langs[obj] = langPacks[i]})
import S from "./Settings.js"

/**
 * ### Manages the app's (interface) language. 
 * 
 * ### Usage (JSX):
 * 
 * `<h1>{ L.i_am_a_title }</h1>`
 * 
 * ### Add a Language Pack:
 * 
 * 1) Navigate to `/app/res/lang-packs/` and create a new empty 
 * json file with the name of the language you want to add.
 * 
 * 2) Copy the contents of `english.json` into your new file, and
 * translate each value in the dictionary **(leave the keys unchanged)**.
 * 
 * 
 */
export default class Language{

    /**
     * Re-initialize the lang-pack dictionary with the 
     * currently set language from Settings.
     */
    static reload(){
        let langName = S.getInstance().get(S.APP_LANGUAGE) ?? "english"
        Language.currentLang = langName
        Object.entries(langs[langName]).forEach((entry, i)=>{Language[entry[0]] = entry[1]  })
    }

    /**
     * 
     * @returns {[string]}
     */
    static available(){
        return langNames
    }

    /**
     * 
     * @returns {string}
     */
    static current(){
        return Language.currentLang
    }

}

// to be called any time the webpage reloads
Language.reload()