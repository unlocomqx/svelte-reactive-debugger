document.addEventListener("SvelteReactiveStart", function (ev) {
  post("SvelteReactiveStart", ev.detail);
});

document.addEventListener("SvelteReactiveEnd", function (ev) {
  post("SvelteReactiveEnd", ev.detail);
});

function post(type, detail) {
  if (typeof chrome.app.isInstalled !== "undefined") {
    chrome.runtime.sendMessage({
      type,
      detail,
    });
  }
}

if (typeof chrome.app.isInstalled !== "undefined") {
  if (window.rxd_debugger) {
    chrome.runtime.sendMessage({
      type: "DebuggerDetected",
    });
  }
  chrome.runtime.sendMessage({
    type: "Reload",
  });
}