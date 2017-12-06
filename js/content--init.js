/**
 * Initialize variables for content scripts
 */

let hiddenData = {
  count: 0,
  type: ''
}

hideElem = (elem) => {
  elem.style.display = 'none'
  hiddenData.count += 1
}