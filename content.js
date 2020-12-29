document.addEventListener("SvelteReactiveStart", function (ev) {
  post("SvelteReactiveStart", ev.detail);
});

document.addEventListener("SvelteReactiveEnd", function (ev) {
  post("SvelteReactiveEnd", ev.detail);
});

function post(type, detail) {
  chrome.runtime.sendMessage({
    type,
    detail,
  });
}

chrome.runtime.sendMessage({
  type: 'Reload',
});