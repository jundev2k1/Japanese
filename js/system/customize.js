//===== Customize Prototype =====
/**
 * Set Empty String
 * @returns String Empty
 */
String.prototype.empty = "";

/**
 * Is Null Or Empty
 * @returns True | False
 */
String.prototype.IsNullOrEmpty = function () {
    if (String(this).length === 0 || this === undefined) return true;
    return false;
};

/**
 * Convert string to empty
 * @returns String empty
 */
String.prototype.toEmpty = function () {
    return "";
};
/**
 * Skip Function
 * @param {Number} number 
 * @returns Array
 */
Array.prototype.Skip = function (number) {
    let arr = [];
    for (let i = number; i < this.length; i++) {
        arr.push(this[i]);
    }
    return arr;
};

/**
 * Take Function
 * @param {Number} number Take number
 * @returns Array
 */
Array.prototype.Take = function(number){
    let arr =[];
    for(let i=0; i< number; i++){
        arr.push(this[i]);
    }
    return arr;
}
