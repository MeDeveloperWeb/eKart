/**
 * @summary works with only one level hierarchy objects array
 * @param {Array} objArr
 * @param {Array} keysToBeSearched
 * @param {string} query
 * @returns {Array}
 */
export function searchObject(objArr, keysToBeSearched, query) {
  return objArr.filter((obj) => {
    for (const key of keysToBeSearched) {
      const queryRegex = new RegExp(query, 'i');
      if (obj[key].match(queryRegex)) return obj;
    }
  });
}

/**
 *
 * @param {string} string
 * @returns {string} Capitalized String after spaces
 */
export function capitalize(string) {
  let newStr = '';
  let encounteredSpace = true;

  for (const char of string) {
    if (char === ' ') {
      encounteredSpace = true;
      newStr += char;
    } else if (encounteredSpace) {
      newStr += char.toUpperCase();
      encounteredSpace = false;
    } else newStr += char;
  }

  return newStr;
}
