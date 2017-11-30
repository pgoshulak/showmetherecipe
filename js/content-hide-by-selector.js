/**
 * Content script to scan for CSS selectors that contain recipe content,
 * then hide sibling elements (ie. assumes siblings contain blog entry)
 * 
 */

findElemsToShow = (query) => {
  // console.log(`Matching for ${selectorPair.show}...`)
  // console.log(document.querySelectorAll(query))
  return document.querySelectorAll(query)
}

findElemSiblings = (elems) => {
  // If only one recipe element
  if (elems.length === 1) {
    let el = elems[0]
    // http://youmightnotneedjquery.com/#siblings
    return Array.prototype.filter.call(el.parentNode.children, (child) => {
      return child !== el
    })
  } else {
    // Else: multiple recipe elements (eg. sibling elems that are image shims, etc; eg. pinchofyum.com)
    // Check if the valid (show) elems are siblings (ie. all elem parents are equal)
    parentTest = elems[0].parentNode
    let elemsAreSiblings = elems.every((elem) => {
      return elem.parentNode === parentTest
    })

    if (elemsAreSiblings) {
      console.log('=== parentTest.Children ===')
      console.log(parentTest.children)
      // Proceed similarly to case where only 1 elem (above), but matching all recipe elems
      return Array.prototype.filter.call(parentTest.children, (child) => {
        return !elems.includes(child)
      })
    } else {
      // Elems are NOT siblings... no idea how to process this yet!!
      console.warn('Recipe elements detected on multiple levels. Cannot proceed (yet!)')
      return []
    }
  }
}

let elemsToShow = []

for (let i = 0; i < selectorsToShow.length; i++) {
  elemsToShow = [...elemsToShow, ...findElemsToShow(selectorsToShow[i])]
}

// console.log(`Final elems to show = `, elemsToShow)

/* Several cases may result: 0, 1, or 2+ elements may be found.
  - 0 matches: do nothing
  - 1 match: apply 'display:none' to siblings
  - 2+ matches: check if matches are all siblings
    - yes: proceed as if 1 match
    - no: do nothing (tbc)
*/

if (elemsToShow.length === 0) {
  console.log('No valid recipe elements detected.')
} else {
  console.log(`Found ${elemsToShow.length} recipe elems:`)
  console.log(elemsToShow)
  let siblings = findElemSiblings(elemsToShow)
  console.log(`Found ${siblings.length} sibling elems`, siblings)

  if (DEBUG_WITH_COLORS) {
    // Highlight elems to show/hide instead of hiding them
    // Note: this is not a foolproof debug, but can be helpful
    // Eg. sometimes the 'show' elements won't highlight since the text elems are nested
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].style.backgroundColor = DEBUG_COLOR_HIDE
    }
    for (let i = 0; i < elemsToShow.length; i++) {
      elemsToShow[i].style.backgroundColor = DEBUG_COLOR_SHOW
    }
  } else {
    // Hide the unwanted elems
    for (let i = 0; i < siblings.length; i++) {
      // siblings[i].style.display = 'none'
      hideElem(siblings[i])
    }
  }
}
