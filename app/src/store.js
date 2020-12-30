import { writable } from "svelte/store";
import { writable as localStorageWritable } from "svelte-local-storage-store";

function createStore() {
  const {subscribe, update, set} = writable([]);

  return {
    subscribe,

    insertEvent(data) {
      return update(state => {
        state.push(data);
        return state;
      });
    },

    clear() {
      set([]);
    }
  };
}

export const store = createStore();

function createUiStore() {
  const {subscribe, update} = localStorageWritable("svrxd_prefs", {
    debugger_enabled: false,
    group_statements: false,
    preserve_log: false,
  });

  return {
    subscribe,

    setPref(name, value) {
      return update(state => {
        state[name] = value;
        return state;
      });
    },
  };
}

export const ui_store = createUiStore();