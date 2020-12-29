import { writable } from "svelte/store";

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
  const {subscribe} = writable({
    group_statements: true,
  });

  return {
    subscribe,
  };
}

export const ui_store = createUiStore();