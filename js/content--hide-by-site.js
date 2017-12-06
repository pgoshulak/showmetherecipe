/**
 * Hide blog entry content by checking hostname and hiding associated elems.
 */

/**
 * Check to see if the current site is a recipe blog.
 * 
 * @param {string} site The current page hostname
 * @returns {boolean}
 */
checkIfRecipeSite = (site) => {
  if (location.hostname.includes(site)) return true
  return false
}

/**
 * Finds elements to hide given a CSS selector query.
 * 
 * @param {string} query The selector to query
 * @returns {array} matching DOM elements
 */
findElemsToHide = (query) => {
  return document.querySelectorAll(query)
}

selectorsToHide.forEach((selector) => {
  console.log(`Checking ${selector.site}...`)
  if (checkIfRecipeSite(selector.site)) {
    console.log('Success!')
    let elemsToHide = findElemsToHide(selector.query)
    elemsToHide.forEach((elem) => {
      hideElem(elem)
    })
  }
})