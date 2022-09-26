const SUCCESS_MESSAGE_TIMEOUT = 3000
const CSS_CLASS_RECIPE = 'smtr-recipe'
const CSS_CLASS_BLOG = 'smtr-blog'
const DEBUG_WITH_COLORS = false
const DEBUG_COLOR_RECIPE = 'rgba(102, 255, 102, 0.5)'
const DEBUG_COLOR_BLOG = 'rgba(255, 102, 102, 0.5)'

findElems = (selectorPair) => {
  let query = `${selectorPair.show}`
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

// Add a small textbox to indicate a recipe was successfully found
showSuccessMessage = () => {
  var elem = document.createElement('div')
  elem.setAttribute('id', 'success-message')
  elem.innerHTML = '<strong>Show Me the Recipe!</strong><br>Recipe successfully moved to the top!'
  document.body.appendChild(elem)
  setTimeout(function(){
    elem.style.opacity = 0
  }, SUCCESS_MESSAGE_TIMEOUT)
}


// Check all possible selectors for a match
/* Note: could be made more efficient by matching to domain, but CSS selectors are 
generic to the WordPress plugins. Therefore, we don't need to account for all
DOMAINS but rather all PLUGINS ... much less effort
*/
let recipeElems = []
for (let i = 0; i < selectors.length; i++) {
  recipeElems = [...recipeElems, ...findElems(selectors[i])]
}

if (recipeElems.length === 0) {
  // console.log('No valid recipe elements detected.')
} else {
  console.log(`Found ${recipeElems.length} recipe elems:`)
  console.log(recipeElems)
  let blogElems = findElemSiblings(recipeElems)
  console.log(`Found ${blogElems.length} recipe sibling elems:`)
  console.log(blogElems)
  showSuccessMessage()

  // Mark blog elements with css class
  for (let i = 0; i < blogElems.length; i++) {
    blogElems[i].classList.add(CSS_CLASS_BLOG)
  }
  // Mark recipe elements with css class
  for (let i = 0; i < recipeElems.length; i++) {
    recipeElems[i].classList.add(CSS_CLASS_RECIPE)
  }

  if (DEBUG_WITH_COLORS) {
    // Highlight elems to show/hide instead of hiding them
    // Note: this is not a foolproof debug, but can be helpful
    // Eg. sometimes the 'show' elements won't highlight since the text elems are nested
   
    let css = document.createElement('style')
    css.type = 'text/css'
    css.innerHTML = ` .${CSS_CLASS_RECIPE} { background-color: ${DEBUG_COLOR_RECIPE} !important} .${CSS_CLASS_BLOG} { background-color: ${DEBUG_COLOR_BLOG} !important}`
    document.body.appendChild(css)
  }

  
  // Move each recipe element to the top 
  /* Note: in case of multiple recipe elements (eg. image shims on pinchofyum.com),
  recipe elems are insert before the top blog element, rather than at top of the
  whole stack, to preserve order.
  */
  var parent = blogElems[0].parentNode
  for (var i = 0; i < recipeElems.length; i++) {
    parent.insertBefore(recipeElems[i], blogElems[0])
  }
}