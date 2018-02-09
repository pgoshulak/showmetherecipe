# About
This extension intends to bring focus to the recipe portion of recipe blog entries. It does so using CSS selectors to find valid recipe elements (checking a variety of popular Wordpress recipe plugins) and applying CSS classes to mark content as 'recipe' or 'blog'. It is similar in purpose to the 'scroll to recipe' button many sites have, but skips that interaction.

Not all sites work, and some sites may never work (barring fancy NLP upgrades), since the recipes are not formatted according to common recipe plugins. 

# Program Flow
- scan for valid recipe elements to determine the plugin used (eg. '.tasty-recipes')
- scan for the recipe's sibling elements, which should contain the blog post (eg. &lt;p>, &lt;img>)
- apply a generic CSS class to both recipe and sibling (blog) elements
- move each recipe element to before its first sibling (eg. div.recipe before p.blog)

# Todo:
- [ ] add website whitelist to localstorage
- [ ] add error reporting buttons

# Chrome Store Description
The 'Adblock' for recipe blogs! When you just need to know how many eggs, but don't want to read about the divorce.

This extension finds the actual recipe on many* popular recipe blogs, and brings it to the top of the page - no more scrolling to the bottom to get what you came for.

Think the author's blog post should take precedence over the recipe? Don't install this extension.

SUPPORT:
Recipe isn't above the blog as promised? Something else went wrong? Contact the support email below and we'll fix it ASAP

* Please note: We are working on getting as many to work as possible, but some sites can't be affected for technical reasons. Let us know and we'll do our best!