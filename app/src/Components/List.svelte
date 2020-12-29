<script>
  import { TableSort } from "svelte-tablesort";
  import { store } from "../store";
</script>

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