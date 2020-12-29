<script>
  import { fade } from "svelte/transition";
  import { store } from "../store";
  import { TableSort } from "svelte-tablesort";

  $: statements = groupStatements($store)

  function groupStatements(events) {
    let statements = new Map();
    events.forEach(event => {
      let eventId = event.id;
      if (statements.has(eventId)) {
        const info = statements.get(eventId);
        statements.set(eventId, {
          id: eventId,
          statement: event.statement,
          duration: info.duration + event.duration,
          count: info.count + 1,
        });
      } else {
        statements.set(eventId, {
          id: eventId,
          statement: event.statement,
          duration: event.duration,
          count: 1,
        });
      }
    });

    return statements;
  }
</script>

<TableSort items={Array.from(statements.values())}>
  <tr slot="thead">
    <th data-sort="statement">Statements</th>
    <th data-sort="count">Count</th>
    <th data-sort="duration">Duration</th>
  </tr>
  <tr slot="tbody" let:item={item}>
    <td>{item.statement}</td>
    <td>
      {#key item.count}
        <div in:fade={{duration: 100}}>{item.count}</div>
      {/key}
    </td>
    <td>{item.duration}</td>
  </tr>
</TableSort>