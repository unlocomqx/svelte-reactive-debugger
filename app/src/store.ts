import { writable as localStorageWritable } from "svelte-local-storage-store";
import { writable } from "svelte/store";
import type { DbgStore, EventStore, PrefStore } from "./types";

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

function createPrefStore () {
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