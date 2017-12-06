chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    switch(message.type) {
      case 'test':
        sendResponse('Hello from addListener!')
        break
      case 'getHiddenData':
        sendResponse(hiddenData)
        break
      default:
        console.error('Unrecognized message: ' + message)
    }
  }
)