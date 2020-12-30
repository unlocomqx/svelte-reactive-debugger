import { devtools } from "chrome";
import App from './App.svelte';
import { get } from "svelte/store";
import { store, ui_store } from "./store";

const prefs = get(ui_store);

function setDarkMode(theme) {
	if (theme == 'dark') document.body.classList.add('dark')
	else document.body.classList.remove('dark')
}

setDarkMode(devtools.panels.themeName)
if (devtools.panels.onThemeChanged)
	devtools.panels.onThemeChanged.addListener(setDarkMode)

// Create a connection to the background page
var backgroundPort = chrome.runtime.connect({
	name: "panel"
});

backgroundPort.postMessage({
	name: 'init',
	tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPort.onMessage.addListener(function (request) {
	if (request.type === "SvelteReactiveEnable") {
		ui_store.setPref('debugger_enabled', true);
	}

	if (request.type === "SvelteReactiveEnd") {
		const now = Date.now();
		const duration = now - request.detail.start_time;
		store.insertEvent({
			... request.detail,
			duration,
		});
	}

	if (request.type === "Reload" && !prefs.preserve_log) {
		store.clear();
	}
});

const app = new App({
	target: document.body
});

export default app;