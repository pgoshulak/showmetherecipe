blogElems = document.getElementsByClassName('smtr-blog')

recipeElems = document.getElementsByClassName('smtr-recipe')
var parent = blogElems[0].parentNode

// Move each recipe element to the top 
/* Note: in case of multiple recipe elements (eg. image shims on pinchofyum.com),
  recipe elems are insert before the top blog element, rather than at top of the
  whole stack, to preserve order.
*/
for (var i = 0; i < recipeElems.length; i++) {
  parent.insertBefore(recipeElems[i], blogElems[0])
}