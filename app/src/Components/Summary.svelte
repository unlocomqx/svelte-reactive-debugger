<script>
  import { fade } from "svelte/transition";
  import { store ,ui_store} from "../store";
  import { TableSort } from "svelte-tablesort";
  import Statement from "./Statement.svelte";

  $: statements = groupStatements($store);

  function groupStatements(events) {
    let statements = new Map();
    events.forEach(event => {
      let eventId = event.id;
      if (statements.has(eventId)) {
        const info = statements.get(eventId);
        statements.set(eventId, {
          ...event,
          duration: info.duration + event.duration,
          count: info.count + 1,
        });
      } else {
        statements.set(eventId, {
          ...event,
          count: 1,
        });
      }
    });

    return statements;
  }

  let sort = $ui_store.sort.summary;
</script>

{#if statements.size > 0}
  <div in:fade={{duration: 100}}>
    <TableSort items={Array.from(statements.values())}>
      <tr slot="thead">
        <th data-sort="statement" data-table-sort={sort.name === 'statement' ? sort.dir : null}>Statements</th>
        <th data-sort="count" data-table-sort={sort.name === 'count' ? sort.dir : null}>Count</th>
        <th data-sort="duration" data-table-sort={sort.name === 'duration' ? sort.dir : null}>Duration</th>
      </tr>
      <tr slot="tbody" let:item={item}>
        <td style="display: grid">
          <Statement statement={item.statement} filename={item.filename} line={item.line}/>
        </td>
        <td>
          {#key item.count}
            <div in:fade={{duration: 100}}>{item.count}</div>
          {/key}
        </td>
        <td>{item.duration}</td>
      </tr>
    </TableSort>
  </div>
{/if}
