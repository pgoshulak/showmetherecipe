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

# Chrome Store Description
The 'Adblock' for recipe blogs! When you just need to know how many eggs, but don't want to read about the divorce.

This extension hides blog posts and images from many popular food blog sites, making the recipe the main focus. 

We believe that food bloggers have a tough enough job, generating a fresh stream of recipes on a weekly basis. However, the mandatory blog post preceding the recipe doesn't add value for some site visitors, and is often a nuisance to bypass. We chose to give you site traffic for the recipe, so let that be the star of the show!

Want to see the blog post? Click the icon to temporarily reveal the entire page.

Think the author's blog post should take precedence over the recipe? Don't install this extension.

SUPPORT:
- website doesn't hide the blog post as promised?
- recipe itself is hidden as well?
Contact the support email below and we'll fix it ASAP