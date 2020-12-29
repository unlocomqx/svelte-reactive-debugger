<script>
  import {TableSort} from 'svelte-tablesort'
  import { store } from "./store";

  let statements = new Map();
  let group_statements = true;

  $: group_statements && (statements = groupStatements($store));

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

  function time(ms) {
    return new Date(ms).toISOString().slice(11, -1);
  }
</script>

<div>
  <div>
    <label for="group_statements">
      <input type="checkbox" bind:checked={group_statements}> Group statement
    </label>
  </div>
  {#if group_statements}
    <TableSort items={Array.from(statements.values())}>
      <tr slot="thead">
        <th data-sort="statement">Statement</th>
        <th data-sort="count">Count</th>
        <th data-sort="duration">Duration</th>
      </tr>
      <tr slot="tbody" let:item={item}>
        <td>{item.statement}</td>
        <td>{item.count}</td>
        <td>{item.duration}</td>
      </tr>
    </TableSort>
  {:else}
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
  {/if}
</div>

<style>
  ul  {
    padding: 0;
    list-style-type: none;
  }

  li {
    padding: 2px 0;
    border-bottom: 1px solid #3a3a3a;
  }

	.count {
    color: rgb(148 148 148);
		background-color: rgb(66 89 127);
    border-radius: 10px;
    padding: 0 5px;
	}
</style>