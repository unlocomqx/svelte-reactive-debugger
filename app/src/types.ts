import type { Readable, Writable } from "svelte/store";

export interface ReactiveEvent {
  id: string;
  statement: string;
  filename: string;
  line: number;
  start_time: number;
  start_state: string;
  end_state: string;
  exec_id: string;
  duration: number;
  has_changes: boolean;
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
  changes_only: boolean;
  filter_text: string;
  sort: {
    [name in "list" | "summary"]: Sort
  }
  details_width: number;
}

export interface PrefStore extends Writable<PrefStoreData> {
  setPref (name: string, value: boolean);
}

export interface DbgStoreData {
  tab_connected: boolean;
  debugger_enabled: boolean;
  paused: boolean;
}

export interface DbgStore extends Writable<DbgStoreData> {
  setProp (name: string, value: boolean);
  getProp (name: string);
}

export interface UiStoreData {
  show_details: boolean;
  inspected_item: ReactiveEvent;
}

export interface UiStore extends Writable<UiStoreData> {
  setProp (name: string, value: boolean);
}
