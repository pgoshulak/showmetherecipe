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
https://deliciouslyella.com/2016/01/23/book-two-recipe-chickpea-quinoa-and-turmeric-curry/ --> .blog-post__recipe-description (nbd because short descr)
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