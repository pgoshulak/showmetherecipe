/**
 * Scripts for extension's popup window
 */

const currentWindowQuery = {active: true, currentWindow: true}

setMessage = (elem, msg) => {
  document.querySelector(elem).innerHTML = msg
}
hideElem = (elem) => {
  document.querySelector(elem).style.display = 'none'
}

/**
 * Report the current page as not functioning correctly
 */
reportPage = () => {
  // Get page URL
  chrome.tabs.query(currentWindowQuery, (tabs) => {
    let url = new URL(tabs[0].url)
    // TODO: Send bug report here!!!
    setMessage('#message', `<p>Thank you for reporting</p>
      <p class="url-hostname">${url.hostname}</p>
      <p>We'll do our best to fix it!</p>`)
    hideElem('#report-page-link')
  })
}

document.addEventListener('DOMContentLoaded', () => {
  // Query Chrome for current tab's info
  chrome.tabs.query(currentWindowQuery, (tabs) => {
    // Query content script for number of elements hidden
    chrome.tabs.sendMessage(tabs[0].id, {type: 'getHiddenData'}, (resp) => {
      if (resp.count > 0) {
        setMessage('#message', `${resp.count} elements hidden`)
      }
    })
    
  })
  reportLink = document.getElementById('report-page-link')
  reportLink.onclick = () => {
    reportPage()
  }
})