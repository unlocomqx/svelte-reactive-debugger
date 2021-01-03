import type { Readable, Writable } from "svelte/store";

export interface ReactiveEvent {
  id: string;
  statement: string;
  filename: string;
  line: number;
  state: string;
  start_time: number;
  duration: number;
}

export interface EventStore extends Readable<ReactiveEvent[]> {
  insertEvent (ev: ReactiveEvent);
  clear ();
}

export type Sort = {
  name: "statement" | "count" | "duration" | "start_time";
  direction: "ascending" | "descending";
};

export interface PrefStoreData {
  group_statements: boolean;
  preserve_log: boolean;
  sort: {
    [name in "list" | "summary"]: Sort
  }
}

export interface PrefStore extends Writable<PrefStoreData> {
  setPref (name: string, value: boolean);
}

export interface DbgStoreData {
  tab_connected: boolean;
  debugger_enabled: boolean;
}

export interface DbgStore extends Readable<DbgStoreData> {
  setProp (name: string, value: boolean);
}

export interface UiStoreData {
  show_details: boolean;
  show_details_item: ReactiveEvent;
}

export interface UiStore extends Readable<UiStoreData> {
  setProp (name: string, value: boolean);
}
