import { writable } from "svelte/store";

function createStore() {
  const {subscribe, update} = writable([]);

  return {
    subscribe,

    insertEvent(data) {
      return update(state => {
        state.push(data);
        return state;
      });
    }
  };
}

export const store = createStore();