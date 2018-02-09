blogElems = document.getElementsByClassName('smtr-blog')
/* for (var i = 0; i < blogElems.length; i++) {
  blogElems[i].style.display = 'none'
} */

recipeElems = document.getElementsByClassName('smtr-recipe')
var parent = blogElems[0].parentNode

for (var i = 0; i < recipeElems.length; i++) {
  parent.insertBefore(recipeElems[i], blogElems[0])
}