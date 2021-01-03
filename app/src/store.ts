import { writable as localStorageWritable } from "svelte-local-storage-store";
import { writable } from "svelte/store";
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
  const { subscribe, update, set } = localStorageWritable("svrxd_prefs", {
    group_statements: true,
    preserve_log    : false,
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