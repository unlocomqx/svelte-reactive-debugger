<script lang="ts">
  import { TableSort } from "svelte-tablesort";
  import { fade } from "svelte/transition";
  import { ev_store, pref_store, ui_store } from "../store";
  import type { ReactiveEvent, Sort } from "../types";
  import Statement from "./Statement.svelte";

  function time (ms) {
    return new Date(ms).toISOString().slice(11, -1);
  }

  let sort: Sort;
  $: sort = $pref_store?.sort?.list ?? {
    name: "start_time",
    direction: "descending",
  };

  function saveSort (ev) {
    $pref_store.sort = $pref_store.sort || {};
    $pref_store.sort.list = ev.detail;
  }

  function showDetails (item: ReactiveEvent) {
    console.log(item);
    $ui_store.show_details = true;
    $ui_store.inspected_item = item;
  }
</script>

{#if $ev_store.length > 0}
  <div in:fade={{duration: 100}}>
    <TableSort items={$ev_store} on:sort={saveSort}>
      <tr slot="thead">
        <th data-sort="statement" data-sort-initial={sort.name === 'statement' ? sort.direction : null}>Statement</th>
        <th data-sort="duration" data-sort-initial={sort.name === 'duration' ? sort.direction : null}>Duration</th>
        <th data-sort="start_time" data-sort-initial={sort.name === 'start_time' ? sort.direction : null}>Start time
        </th>
      </tr>
      <tr slot="tbody" let:item={item} on:click={() => showDetails(item)}>
        <td style="display:grid;">
          <Statement statement={item.statement} filename={item.filename} line={item.line}/>
        </td>
        <td>{item.duration}</td>
        <td>{time(item.start_time)}</td>
      </tr>
    </TableSort>
  </div>
{/if}
