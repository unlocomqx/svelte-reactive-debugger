if (!window.svrdAttached) {
  document.addEventListener("SvelteReactiveStart", function (ev) {
    post("SvelteReactiveStart", ev.detail);
  });

  document.addEventListener("SvelteReactiveEnd", function (ev) {
    post("SvelteReactiveEnd", ev.detail);
  });

  document.addEventListener("SvelteReactiveEnable", function () {
    post("SvelteReactiveEnable");
  });
}

window.svrdAttached = true;

var connected = true;

function post(type, detail) {
  if (!connected) {
    // avoid extension context invaluidated errors
    return;
  }
  chrome.runtime.sendMessage({
    type,
    detail,
  });
}

post("Reload");

var runtime_port = chrome.runtime.connect();

runtime_port.onDisconnect.addListener(function () {
  connected = false;
});

function injectScript(file_path, tag) {
  var node = document.getElementsByTagName(tag)[0];
  if (!node) {
    return;
  }
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', file_path);
  node.appendChild(script);
}
injectScript(chrome.extension.getURL('devtools/helper.js'), 'head');
