export {importFont}


/**
 * 
 * @param {string} url 
 */
function importFont(url, fontName) {
    console.log(url.substring(0, 10), "importFont()")
    var font = new FontFace(fontName, 'url(' + url + ')');
    font.load().then(function (loadedFont) {
        document.fonts.add(loadedFont);
        // font was loaded
    }).catch(function (error) {
        // error occurred
    });
}