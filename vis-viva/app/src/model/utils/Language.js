const english = require("../../../res/lang-packs/english.js")
const langNames = require.context("../../../res/lang-packs", false, /.js$/).keys().map((key) => { return key.replace("./", "").replace(".js", "") })
const langPacks = require.context("../../../res/lang-packs", false, /.js$/).keys().map(require.context("../../../res/lang-packs", false, /.js$/))
var langs = {}
langNames.forEach((obj, i) => { langs[obj] = langPacks[i] })
import S from "./Settings.js"

/**
 * Re-fetch language from Settings and update entries.
 */
function reload() {
    let langName = S.getInstance().get(S.APP_LANGUAGE) ?? "english"
    Language.currentLang = langName
    Language = { ...Language, ...langs[langName] }
}

/**
 * Get List of available languages.
 * @returns {[string]}
 */
function available() {
    return langNames
}

/**
 * Get Current language.
 * @returns {string}
 */
function current() {
    return Language.currentLang
}


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
 * js file with the name of the language you want to add.
 * 
 * 2) Copy the contents of `english.js` into your new file, and
 * translate each value in the dictionary **(leave the keys unchanged)**.
 * 
 * 
 */
var Language = { ...english, reload, available, current }


// to be called any time the webpage reloads
Language.reload()
console.log(Language.app_name, Language.help)


export default Language;