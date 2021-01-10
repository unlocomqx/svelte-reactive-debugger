document.addEventListener("SvelteReactiveStart", function (ev) {
  post("SvelteReactiveStart", ev.detail);
});

document.addEventListener("SvelteReactiveEnd", function (ev) {
  post("SvelteReactiveEnd", ev.detail);
});

document.addEventListener("SvelteReactiveEnable", function () {
  post("SvelteReactiveEnable");
});

let connected = true;

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

let runtime_port = chrome.runtime.connect();

runtime_port.onDisconnect.addListener(function () {
  connected = false;
});
