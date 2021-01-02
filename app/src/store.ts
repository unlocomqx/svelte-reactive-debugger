import { writable as localStorageWritable } from "svelte-local-storage-store";
import { writable } from "svelte/store";
import type { DbgStore, UiStore } from "./types";

function createStore () {
  const { subscribe, update, set } = writable([]);

  return {
    subscribe,

    insertEvent (data) {
      return update(state => {
        state.push(data);
        return state;
      });
    },

    clear () {
      set([]);
    }
  };
}

export const store = createStore();

function createUiStore () {
  const { subscribe, update, set } = localStorageWritable("svrxd_prefs", {
    group_statements: false,
    preserve_log    : false,
    sort: {
      list: {
        name: 'statement',
        dir: 'ascending',
      },
      summary: {
        name: 'statement',
        dir: 'ascending',
      },
    }
  });

  return {
    subscribe,
    update,
    set,

    setPref (name, value) {
      return update(state => {
        state[name] = value;
        return state;
      });
    },
  };
}

export const ui_store: UiStore = createUiStore();


function createDbgStore () {
  const { subscribe, update } = writable({
    tab_connected   : false,
    debugger_enabled: false,
  });

  return {
    subscribe,

    setProp (name, value) {
      return update(state => {
        state[name] = value;
        return state;
      });
    },
  };
}
export const dbg_store: DbgStore = createDbgStore();