import { devtools } from "chrome";
import App from './App.svelte';
import { store } from "./store";

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
	if (request.type === "SvelteReactiveEnd") {
		const now = Date.now();
		const duration = now - request.detail.start_time;
		store.insertEvent({
			... request.detail,
			duration,
		});
	}
	if (request.type === "Reload") {
		store.clear();
	}
});

const app = new App({
	target: document.body
});

export default app;