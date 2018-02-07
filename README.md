# About
This extension intends to display only the recipe portion of recipe blog entries. It does so using CSS selectors to find valid recipe elements (checking a variety of popular Wordpress recipe plugins) and applying CSS classes to hide blog entry content. It is similar in purpose to the 'scroll to recipe' button many sites have, but skips that interaction 

# Program Flow
- scan for valid recipe elements to determine the plugin used (eg. '.tasty-recipes')
- scan for the recipe's sibling elements, which should contain the blog post (eg. &lt;p>, &lt;img>)
- apply CSS class to these sibling (non-recipe) elements, marking them for hiding
- set 'display:none' on the elements to hide (toggle via Chrome icon)

# Todo:
- [ ] add website whitelist to localstorage
- [ ] add error reporting buttons (eg. 'blog doesn't hide', 'recipe is hidden too', etc)