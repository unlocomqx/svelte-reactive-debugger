<script lang="ts">
  import { TableSort } from "svelte-tablesort";
  import { store, ui_store } from "../store";
  import { fade } from "svelte/transition";
  import type { Sort } from "../types";
  import Statement from "./Statement.svelte";

  function time(ms) {
    return new Date(ms).toISOString().slice(11, -1);
  }

  let sort: Sort = $ui_store?.sort?.summary ?? {
    name: "start_time",
    dir : "descending",
  };
</script>

{#if $store.length > 0}
  <div in:fade={{duration: 100}}>
    <TableSort items={$store}>
      <tr slot="thead">
        <th data-sort="statement" data-sort-initial={sort.name === 'statement' ? sort.dir : null}>Statement</th>
        <th data-sort="duration" data-sort-initial={sort.name === 'duration' ? sort.dir : null}>Duration</th>
        <th data-sort="start_time" data-sort-initial={sort.name === 'start_time' ? sort.dir : null}>Start time</th>
      </tr>
      <tr slot="tbody" let:item={item}>
        <td style="display:grid;">
          <Statement statement={item.statement} filename={item.filename} line={item.line}/>
        </td>
        <td>{item.duration}</td>
        <td>{time(item.start_time)}</td>
      </tr>
    </TableSort>
  </div>
{/if}
