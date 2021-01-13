// @ts-ignore
import { devtools, runtime } from "chrome";
import { stringify } from "javascript-stringify";
import { get } from "svelte/store";
import App from "./App.svelte";
import { dbg_store, ev_store, pref_store, ui_store } from "./store";
import type { ReactiveEvent } from "./types";

const prefs = get(pref_store);

function setDarkMode (theme) {
  if (theme == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

setDarkMode(chrome.devtools.panels.themeName);
if (devtools.panels.onThemeChanged) {
  devtools.panels.onThemeChanged.addListener(setDarkMode);
}

// Create a connection to the background page
var backgroundPort = runtime.connect({
  name: "panel"
});

backgroundPort.postMessage({
  name : "init",
  tabId: devtools.inspectedWindow.tabId
});

backgroundPort.onMessage.addListener(function (request) {
  if (request.type === "SvelteReactiveEnable") {
    dbg_store.setProp("tab_connected", true);
    dbg_store.setProp("debugger_enabled", true);
  }

  if (request.type === "SvelteReactiveEnd") {
    const now = Date.now();
    let reactiveEvent: ReactiveEvent = request.detail;
    const duration = now - reactiveEvent.start_time;

    let hasDiff = stringify(reactiveEvent.start_state) !== stringify(reactiveEvent.end_state);

    ev_store.insertEvent({
      ...reactiveEvent,
      duration,
      has_changes: hasDiff,
    });
  }

  if (request.type === "Reload") {
    if (!prefs.preserve_log) {
      ui_store.setProp("show_details", false);
      ui_store.setProp("inspected_item", null);
      ev_store.clear();
    }
  }
});

new App({
  target: document.body
});
