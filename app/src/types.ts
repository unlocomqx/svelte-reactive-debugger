import type { Readable, Writable } from "svelte/store";

export interface ReactiveEvent {
  id: string;
  statement: string;
  filename: string;
  line: number;
  start_time: number;
  duration: number;
}

export type Sort = {
  name: "statement" | "count" | "duration" | "start_time";
  dir: "ascending" | "descending";
};

export interface UiStoreData {
  group_statements: boolean;
  preserve_log: boolean;
  sort: {
    [name in "list" | "summary"]: Sort
  }
}

export interface UiStore extends Writable<UiStoreData> {
  setPref (name: string, value: boolean);
}

export interface DbgStoreData {
  tab_connected: boolean;
  debugger_enabled: boolean;
}

export interface DbgStore extends Readable<DbgStoreData> {
  setProp (name: string, value: boolean);
}