<script>
  import { TableSort } from "svelte-tablesort";
  import { store } from "../store";
  import { fade } from "svelte/transition";
  import Statement from "./Statement.svelte";

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
        <td style="display:grid;">
          <Statement statement={item.statement} filename={item.filename} line={item.line}/>
        </td>
        <td>{item.duration}</td>
        <td>{time(item.start_time)}</td>
      </tr>
    </TableSort>
  </div>
{/if}
