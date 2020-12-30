document.addEventListener("SvelteReactiveStart", function (ev) {
  post("SvelteReactiveStart", ev.detail);
});

document.addEventListener("SvelteReactiveEnd", function (ev) {
  post("SvelteReactiveEnd", ev.detail);
});

console.log('SvelteReactiveEnable');
document.addEventListener("SvelteReactiveEnable", function () {
  post("SvelteReactiveEnable");
});

function post(type, detail) {
  if (typeof chrome.app.isInstalled !== "undefined") {
    chrome.runtime.sendMessage({
      type,
      detail,
    });
  }
}

post("Reload");