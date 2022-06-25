export {probability}

/**
    * True 100*n percent of the times. 
    * 
    * @param {number} n 
    * @returns 
    */
function probability(n) {
    return !!n && Math.random() <= n;
}