<script lang="ts">
  import { TableSort } from "svelte-tablesort";
  import { fade } from "svelte/transition";
  import { ev_store, pref_store, ui_store } from "../store";
  import type { ReactiveEvent, Sort } from "../types";
  import { trigger } from "../utils";
  import Statement from "./Statement.svelte";

  function time (ms) {
    return new Date(ms).toISOString().slice(11, -1);
  }

  let sort: Sort;
  $: sort = $pref_store?.sort?.list ?? {
    name     : "start_time",
    direction: "descending",
  };

  function saveSort (ev) {
    $pref_store.sort = $pref_store.sort || {};
    $pref_store.sort.list = ev.detail;
  }

  let current_row: HTMLTableRowElement = null;
  function showDetails (ev: MouseEvent, item: ReactiveEvent) {
    current_row = ev.currentTarget;
    $ui_store.show_details = true;
    $ui_store.inspected_item = item;
  }

  function handleKeyUp (ev: KeyboardEvent) {
    if (!current_row) {
      return;
    }
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      if (current_row.previousSibling) {
        trigger(current_row.previousSibling, "click");
      }
    }
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      if (current_row.nextSibling) {
        trigger(current_row.nextSibling, "click");
      }
    }
  }
</script>

{#if $ev_store.length > 0}
  <div id="statements-list" in:fade={{duration: 100}} tabindex="0" on:keydown|capture|nonpassive={handleKeyUp}>
    <TableSort items={$ev_store} on:sort={saveSort}>
      <tr slot="thead">
        <th data-sort="statement" data-sort-initial={sort.name === 'statement' ? sort.direction : null}>Statement</th>
        <th data-sort="duration" data-sort-initial={sort.name === 'duration' ? sort.direction : null}>Duration</th>
        <th data-sort="start_time" data-sort-initial={sort.name === 'start_time' ? sort.direction : null}>Start time
        </th>
      </tr>
      <tr slot="tbody" let:item={item}
          class:highlight={$ui_store.inspected_item && $ui_store.inspected_item.exec_id === item.exec_id}
          class:same={$ui_store.inspected_item && $ui_store.inspected_item.id === item.id}
          on:click={(ev) => showDetails(ev, item)}>
        <td style="display:grid;">
          <Statement statement={item.statement} filename={item.filename} line={item.line}/>
        </td>
        <td>{item.duration}</td>
        <td>{time(item.start_time)}</td>
      </tr>
    </TableSort>
  </div>
{/if}

<style>
  #statements-list {
    outline: none;
  }

  tr.same {
    background-color: rgba(255, 62, 0, 0.2) !important;
  }

  tr.highlight {
    background-color: rgb(255, 62, 0) !important;
    color: #fff;
  }
</style>
