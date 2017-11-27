// const selectorHide = '.entry-content > *:not(.tasty-recipes):not(.tasty-recipes-image-shim)';
// const selectorShow = '.tasty-recipes, .tasty-recipes-image-shim';
console.log('hello from content.js')

const CSS_SHOW_CLASS = 'smtr-show'
const CSS_HIDE_CLASS = 'smtr-hide'
const CSS_HIDE_SUFFIX = ' > * '
const selectorPairs = [
  {
    // pinchofyum.com
    // https://pinchofyum.com/green-curry
    // TODO: check if need to split selectors on comma (for correct behaviour of :not(CSS_SHOW_CLASS) selector))
    show: '.tasty-recipes', // , .tasty-recipes-image-shim
    hide: '.entry-content'
  } ,
  {
    // iamafoodblog.com
    // http://iamafoodblog.com/egyptian-kosheri-rice-recipe/
    show: '.recipe *',
    hide: '.recipe-body*'
  },
  {
    // foodiecrush.com
    show: '.easyrecipe *',
    hide: '.entry_content'
  },
  {
    // gimmesomeoven.com
    show: '.recipe *',
    hide: '.post'
  } ,
  {
    // smittenkitchen.com
    show: '.tasty-recipes, .tasty-recipes-image-shim',
    hide: '.entry-content'
  }
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
  let query = `${selectorPair.show}:not(${CSS_SHOW_CLASS})`
  console.log(`Matching for ${selectorPair.show}...`)
  console.log(document.querySelectorAll(query))
  return document.querySelectorAll(query)
}

findElemsToHide = (selectorPair) => {
  let query = `${selectorPair.hide}:not(${CSS_HIDE_CLASS})`
  console.log(`Matching for ${selectorPair.hide}...`)
  console.log(document.querySelectorAll(query))
  return document.querySelectorAll(query)
}

let selectorPairsToApply = []
for (let i = 0; i < selectorPairs.length; i++) {
  let selectorPair = selectorPairs[i]
  let elemsToShowQuery = [], elemsToHideQuery = [],
    elemsToShowStack = [], elemsToHideStack = []

  elemsToShow = findElemsToShow(selectorPair)
  if (elemsToShowQuery.length > 0) {
    elemsToHide = findElemsToHide(selectorPair)
    if (elemsToHideQuery.length > 0) {
      selectorPairsToApply.push(selectorPair)
      elemsToShowStack = [...elemsToShowStack, ...elemsToShowQuery]
      elemsToHideStack = [...elemsToHideStack, ...elemsToHideQuery]
    }
  }
}
console.log('Final selector pairs to apply...')
console.log(selectorPairsToApply)



// add '.smtr-show' for all valid selectors[].show
/* for (let i = 0; i < selectors.length; i++) {
  let showSelector = `${selectors[i].show}:not(.${CSS_SHOW_CLASS})` // Avoid repeatedly adding 'show' class
  let matches = addClass(showSelector, CSS_SHOW_CLASS)
} */
// Get the chosen 'show' selector's associated 'hide' selector, then apply it (them???)

// add '.smtr-hide' for all valid selectors: .SHOW ~ selectors[].hide:not(.SHOW):not(.HIDE) (non-.SHOW/HIDE siblings of .SHOW with .HIDE)
/* for (let i = 0; i < selectors.length; i++) {
  let hideSelector = `${CSS_SHOW_CLASS} ~ ${selectors[i].hide}:not(.${CSS_SHOW_CLASS}):not(.${CSS_HIDE_CLASS})` // Ensure 'show' elems are not also tagged 'hidden'
  addClass(hideSelector, CSS_HIDE_CLASS)
} */


// Note: test whether to include first child or all children for both