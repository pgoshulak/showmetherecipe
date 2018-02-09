// https://stackoverflow.com/questions/16136275/how-to-make-on-off-buttons-icons-for-a-chrome-extension

// Note: uncomment to enable browser-icon toggle capability
/* var toggle = true;
  chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  if(toggle){
    chrome.browserAction.setIcon({path: "icons/icon16.png", tabId:tab.id});
    chrome.browserAction.setTitle({title: 'Show Me the Recipe! ENABLED', tabId: tab.id})
    chrome.tabs.executeScript(tab.id, {file:"content-modify.js"});
  }
  else{
    chrome.browserAction.setIcon({path: "icons/icon16-desat.png", tabId:tab.id});
    chrome.browserAction.setTitle({title: 'Show Me the Recipe! DISABLED', tabId: tab.id})
    chrome.tabs.executeScript(tab.id, {file:"content-revert.js"});
  }
}); */