import { writable as localStorageWritable } from "svelte-local-storage-store";
import { get, writable } from "svelte/store";
import type { DbgStore, EventStore, PrefStore, UiStore } from "./types";

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
export const ev_store: EventStore = createStore();


function createPrefStore (): PrefStore {
  const { subscribe, update, set } = localStorageWritable("svrd_prefs", {
    group_statements: true,
    preserve_log    : false,
    changes_only    : false,
    filter_text     : null,
    sort            : {
      list   : {
        name: "start_time",
        dir : "descending",
      },
      summary: {
        name: "count",
        dir : "descending",
      },
    },
    details_width   : null,
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
export const pref_store: PrefStore = createPrefStore();


function createDbgStore () {
  const { subscribe, set, update } = writable({
    tab_connected   : false,
    debugger_enabled: false,
    paused          : false,
  });

  let store = {
    subscribe,
    update,
    set,

    setProp (name, value) {
      return update(state => {
        state[name] = value;
        return state;
      });
    },

    getProp (name) {
      const store_data = get(store);
      return store_data[name];
    },
  };
  return store;
}
export const dbg_store: DbgStore = createDbgStore();


function createUiStore (): UiStore {
  const { subscribe, update, set } = writable({
    show_details  : false,
    inspected_item: null,
  });

  return {
    subscribe,
    set,
    update,

    setProp (name, value) {
      return update(state => {
        state[name] = value;
        return state;
      });
    },
  };
}
export const ui_store: UiStore = createUiStore();
