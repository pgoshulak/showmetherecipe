# Information
This extension intends to display only the recipe portion of recipe blog entries. It does so using CSS selectors to find valid recipe elements (checking a variety of popular Wordpress recipe plugins) and applying CSS classes to hide blog entry content. It is similar in purpose to the 'scroll to recipe' button many sites have, but skips that interaction (and MAY save network bandwidth due to hidden images?)

# Flow
## General
- scan for valid recipe elements to determine the plugin used (eg. '.tasty-recipes')
- apply .SHOW class to these plugin-specific recipe elements, marking them for display
- apply .HIDE class to plugin-specific non-recipe elements, marking them for hiding
- CSS styles .HIDE elems as display:hidden

## Specific
- loop through list of {show:'.recipe', hide:'.drivel'} selector pairs
  - check for .recipe elems; if found:
    - check for associated .drivel elems; if any found (ie. true positive match, see note):
      - add CSS class .SHOW to .recipe elems
      - add CSS class .HIDE to .drivel:not(.SHOW) elems

Note: some sites may use the multiple .recipe elems nested (eg. .recipe>.tasty-recipe) but the script must be specific in choosing the correct selector or else .HIDE classes may be applied when they shouldn't be.