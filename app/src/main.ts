// @ts-ignore
import { devtools } from "chrome";
import * as jsondiffpatch from "jsondiffpatch";
import { get } from "svelte/store";
import App from "./App.svelte";
import { dbg_store, ev_store, pref_store } from "./store";
import type { ReactiveEvent } from "./types";

const jsonDiff = jsondiffpatch.create({});

const prefs = get(pref_store);

function setDarkMode (theme) {
  if (theme == "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

setDarkMode(devtools.panels.themeName);
if (devtools.panels.onThemeChanged) {
  devtools.panels.onThemeChanged.addListener(setDarkMode);
}

// Create a connection to the background page
var backgroundPort = chrome.runtime.connect({
  name: "panel"
});

backgroundPort.postMessage({
  name : "init",
  tabId: chrome.devtools.inspectedWindow.tabId
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

    const stateDiff = jsonDiff.diff(reactiveEvent.start_state, reactiveEvent.end_state);
    console.log(!!stateDiff);
    ev_store.insertEvent({
      ...reactiveEvent,
      duration,
      has_changes: !!stateDiff,
    });
  }

  if (request.type === "Reload") {
    if (!prefs.preserve_log) {
      ev_store.clear();
    }
  }
});

new App({
  target: document.body
});
