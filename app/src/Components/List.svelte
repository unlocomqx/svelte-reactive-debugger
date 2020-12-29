<script>
  import { TableSort } from "svelte-tablesort";
  import { store } from "../store";
  import { fade } from "svelte/transition";

  function time(ms) {
    return new Date(ms).toISOString().slice(11, -1);
  }
</script>

{#if $store.length > 0}
  <div in:fade={{duration: 100}}>
    <TableSort items={$store}>
      <tr slot="thead">
        <th data-sort="statement">Statement</th>
        <th data-sort="duration">Duration</th>
        <th data-sort="start_time">Start time</th>
      </tr>
      <tr slot="tbody" let:item={item}>
        <td>{item.statement}</td>
        <td>{item.duration}</td>
        <td>{time(item.start_time)}</td>
      </tr>
    </TableSort>
  </div>{/if}
