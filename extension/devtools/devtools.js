// Create a tab in the devtools area
chrome.devtools.panels.create(
  "Svelte RXD",
  chrome.devtools.panels.themeName == "dark"
    ? "/devtools/svelte-logo-dark.svg"
    : "/devtools/svelte-logo-light.svg",
  "/devtools/panel.html",
  function (panel) {
  }
);
