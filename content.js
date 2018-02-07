const DEBUG_WITH_COLORS = false
const DEBUG_COLOR_SHOW = 'rgba(102, 255, 102, 0.5)'
const DEBUG_COLOR_HIDE = 'rgba(255, 102, 102, 0.5)'

const selectors = [
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
    // foodiecrush.com, minimalistbaker.com
    // https://www.foodiecrush.com/spiralized-butternut-squash-and-apple-salad-with-turkey/
    show: '.easyrecipe',
    hide: '.entry_content'
  },
  {
    // http://www.abbeyskitchen.com/recipe-gluten-dairy-free-sticky-figgy-gingerbread-loaf/
    show: '.wprm-recipe-container'
  },
  {
    // https://www.vibrantplate.com/crispy-berries-plum-crumble-vegan/
    show: '.zlrecipe-container-border'
  },
  {
    // https://www.delishknowledge.com/the-best-vegan-stuffing/
    show: '.cookbook-recipe'
  },
  {
    // https://naturallyella.com/pumpkin-ricotta-crostini/
    show: '.simple-recipe-pro, .recipe-container'
  },
  {
    // http://www.foodheavenmadeeasy.com/vegetable-collard-wraps-with-peanut-sauce/
    show: '.blog-yumprint-recipe'
  },
  {
    // https://www.101cookbooks.com/archives/a-simple-carrot-soup-recipe.html
    show: '#recipe'
  },
  {
    // https://www.mynewroots.org/site/2017/10/celebrating-10-years-carrot-cake/
    show: '.print-this-content'
  },
  {
    // http://ohsheglows.com/2013/10/21/smoky-butternut-squash-sauce-with-pasta-and-greens/
    show: '.recipe-content'
  },
  {
    // http://kblog.lunchboxbunch.com/2017/10/chocolate-chip-pumpkin-loaf-vegan.html TODO: see 'non-working' below
    show: '.hrecipe'
  }
]

/* Non-working sites (links are sample posts)
--- Single elem to hide ---
https://smittenkitchen.com/2008/03/vegetarian-cassoulet/ --> single div.print-hide, no div.recipe but many p's
https://deliciouslyella.com/2016/01/23/book-two-recipe-chickpea-quinoa-and-turmeric-curry/ --> .blog-post__recipe-description
https://www.saveur.com/sri-lankan-fish-curry-recipe#page-2
- div.recipe is one layer deep

--- Multi elems to hide ---
http://kblog.lunchboxbunch.com/2017/11/shredded-brussels-sprouts-salad-with.html
- multiple of same div.hrecipe but one inside comments section (?!?!)
- only 1st is visible, other's parent is 'display:none'

--- Probably impossible ---
http://www.greenkitchenstories.com/green-peanut-butter-sandwich-smoothie/ --> just a bunch of p's, no good way to discern
http://thefirstmess.com/2012/02/19/almond-sweet-potato-biscuits-mushroom-gravy/ --> bunch of p's
*/

findElemsToShow = (selectorPair) => {
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


// Check all possible selectors for a match
/* Note: could be made more efficient by matching to domain, but CSS selectors are 
generic to the WordPress plugins. Therefore, we don't need to account for all
DOMAINS but rather all PLUGINS ... much less effort
*/
let elemsToShow = []
for (let i = 0; i < selectors.length; i++) {
  elemsToShow = [...elemsToShow, ...findElemsToShow(selectors[i])]
}

if (elemsToShow.length === 0) {
  console.log('No valid recipe elements detected.')
} else {
  console.log(`Found ${elemsToShow.length} recipe elems:`)
  console.log(elemsToShow)
  let siblings = findElemSiblings(elemsToShow)
  console.log(`Found ${siblings.length} recipe sibling elems:`)
  console.log(siblings)

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
    // Hide the unwanted elems - the main purpose!!!
    for (let i = 0; i < siblings.length; i++) {
      siblings[i].style.display = 'none'
    }
  }
}
