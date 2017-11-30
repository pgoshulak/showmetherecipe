/**
 * Contains data arrays with various CSS selectors:
 * - selectorsToShow: matches elems with recipe content
 * - selectorsToHide: matches elems with blog entry, paired to hostname
 *    NB: need to ensure site is a recipe blog before hiding (eg.) 'div.blog-post'
 */

const DEBUG_WITH_COLORS = false
const DEBUG_COLOR_SHOW = 'rgba(102, 255, 102, 0.5)'
const DEBUG_COLOR_HIDE = 'rgba(255, 102, 102, 0.5)'

hideElem = (elem) => {
  elem.style.display = 'none'
}

/* Non-working sites (links are sample posts)
--- Single elem to hide ---
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

const selectorsToShow = [
  // pinchofyum.com
  // https://pinchofyum.com/green-curry
  // TODO: check if need to split selectors on comma (for correct behaviour of :not(CSS_SHOW_CLASS) selector))
  '.tasty-recipes, .tasty-recipes-image-shim',

  // iamafoodblog.com
  // http://iamafoodblog.com/egyptian-kosheri-rice-recipe/
  '.recipe',

  // foodiecrush.com
  // https://www.foodiecrush.com/spiralized-butternut-squash-and-apple-salad-with-turkey/
  '.easyrecipe',

  // http://www.abbeyskitchen.com/recipe-gluten-dairy-free-sticky-figgy-gingerbread-loaf/
  '.wprm-recipe-container',

  // https://www.vibrantplate.com/crispy-berries-plum-crumble-vegan/
  '.zlrecipe-container-border',

  // https://www.delishknowledge.com/the-best-vegan-stuffing/
  '.cookbook-recipe',

  // https://naturallyella.com/pumpkin-ricotta-crostini/
  '.simple-recipe-pro, .recipe-container',

  // http://www.foodheavenmadeeasy.com/vegetable-collard-wraps-with-peanut-sauce/
  '.blog-yumprint-recipe',

  // https://www.101cookbooks.com/archives/a-simple-carrot-soup-recipe.html
  '#recipe',

  // https://www.mynewroots.org/site/2017/10/celebrating-10-years-carrot-cake/
  '.print-this-content',

  // http://ohsheglows.com/2013/10/21/smoky-butternut-squash-sauce-with-pasta-and-greens/
  '.recipe-content',

  // http://kblog.lunchboxbunch.com/2017/10/chocolate-chip-pumpkin-loaf-vegan.html TODO: see 'non-working' below
  '.hrecipe',
]

const selectorsToHide = [
  {
    site: 'smittenkitchen',
    query: '.smittenkitchen-print-hide'
  },
  {
    site: 'deliciouslyella',
    query: '.blog-post__recipe-description'
  }
]