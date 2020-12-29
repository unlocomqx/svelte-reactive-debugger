// background.js
var connections = new Map();
console.log("svelte rxd background");
chrome.runtime.onConnect.addListener(function (port) {

  var extensionListener = function (message) {

    // The original connection event doesn't include the tab ID of the
    // DevTools page, so we need to send it explicitly.
    if (message.name == "init") {
      connections.set(message.tabId, port);
      return;
    }

    // other message handling
  };

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(extensionListener);

  port.onDisconnect.addListener(function (port) {
    port.onMessage.removeListener(extensionListener);

    var tabs = connections.keys();
    for (var i = 0, len = tabs.length; i < len; i++) {
      if (connections.get(tabs[i]) == port) {
        connections.delete(tabs[i]);
        break;
      }
    }
  });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function (request, sender) {
  // Messages from content scripts should have sender.tab set
  console.log(request, sender);
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (connections.has(tabId)) {
      connections.get(tabId).postMessage(request);
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});

chrome.tabs.onUpdated.addListener((tabId, changed) => {
  if (!connections.has(tabId) || changed.status != "loading") {
    return;
  }
  console.log('inject script');
  chrome.tabs.executeScript(tabId, {
    file: '/content.js',
    runAt: 'document_start'
  })
});