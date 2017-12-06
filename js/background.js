// Ref: https://gist.github.com/danharper/8364399

console.log('hello background')

chrome.browserAction.onClicked.addListener((tab) => {
  console.log('onClicked.addListener()')
  chrome.tabs.executeScript(tab.id, {
    file: 'content--hide-by-selector.js'
  })
})