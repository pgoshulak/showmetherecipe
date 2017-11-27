const DEBUG_WITH_COLORS = false
const DEBUG_COLOR_SHOW = 'rgba(102, 255, 102, 0.5)'
const DEBUG_COLOR_HIDE = 'rgba(255, 102, 102, 0.5)'

const selectorPairs = [
  {
    // pinchofyum.com
    // https://pinchofyum.com/green-curry
    // TODO: check if need to split selectors on comma (for correct behaviour of :not(CSS_SHOW_CLASS) selector))
    show: '.tasty-recipes, .tasty-recipes-image-shim', // , .tasty-recipes-image-shim
    hide: '.entry-content'
  } ,
  {
    // iamafoodblog.com
    // http://iamafoodblog.com/egyptian-kosheri-rice-recipe/
    show: '.recipe',
    hide: '.recipe-body*'
  },
  {
    // foodiecrush.com
    // https://www.foodiecrush.com/spiralized-butternut-squash-and-apple-salad-with-turkey/
    show: '.easyrecipe',
    hide: '.entry_content'
  }/* ,
  {
    // gimmesomeoven.com
    show: '.recipe',
    hide: '.post'
  } ,
  {
    // smittenkitchen.com
    show: '.tasty-recipes, .tasty-recipes-image-shim',
    hide: '.entry-content'
  } */
]

addClass = (selector, classes) => {
  // document.querySelector(selector).classList.add(...classes.split(' '));
  let elems = document.querySelectorAll(selector),
    len = elems !== null ? elems.length : 0,
    i = 0;
  
  for (i; i < len; i++) {
    elems[i].className += " " + classes
  }
  console.log(`--- Found ${len} instances of ${selector} --> added ${classes}`)
  return len
}

addClassToElement = (elem, className) => {
  elem.className += " " + className
}

findElemsToShow = (selectorPair) => {
  let query = `${selectorPair.show}`
  // console.log(`Matching for ${selectorPair.show}...`)
  // console.log(document.querySelectorAll(query))
  return document.querySelectorAll(query)
}

findElemsToHide = (selectorPair) => {
  let query = `${selectorPair.hide}:not(${CSS_HIDE_CLASS})`
  console.log(`Matching for ${selectorPair.hide}...`)
  console.log(document.querySelectorAll(query))
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

for (let i = 0; i < selectorPairs.length; i++) {
  elemsToShow = [...elemsToShow, ...findElemsToShow(selectorPairs[i])]
}

// console.log(`Final elems to show = `, elemsToShow)

/* Several cases may result: 0, 1, or 2+ elements may be found.
  - 0 matches: do nothing
  - 1 match: apply 'display:none' to siblings
  - 2+ matches: check if matches are all siblings
    - yes: proceed as if 1 match
    - no: do nothing (tbc)
*/

switch (elemsToShow.length) {
  case 0:
    console.log('No valid recipe elements detected.')
    break

/*   case 1:
    console.log('Found 1 recipe elem:', elemsToShow[0])
    let siblings = findElemSiblings(elemsToShow)
    console.log(`Found ${siblings.length} sibling elems`, siblings)
    
    if (DEBUG_WITH_COLORS) {
      // Highlight elems to show/hide instead of hiding them
      // Note: this is not a foolproof debug, but can be helpful
      // Eg. sometimes the 'show' elements won't highlight since the text elems are nested
      for (let i = 0; i < siblings.length; i++) {
        siblings[i].style.backgroundColor = DEBUG_COLOR_HIDE
      }
      elemsToShow[0].style.backgroundColor = DEBUG_COLOR_SHOW
    } else {
      // Hide the unwanted elems
      for (let i = 0; i < siblings.length; i++) {
        siblings[i].style.display = 'none'
      }
    }
    break */
    
    default:
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
        siblings[i].style.display = 'none'
      }
    }
    break
}
