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

export const ui_store = localStorageWritable("svrxd_prefs", {
  group_statements: true,
  preserve_log: false,
});