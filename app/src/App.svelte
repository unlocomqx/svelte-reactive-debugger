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

  function clearAll() {
    store.clear();
  }
</script>

<div>
  <div class="toolbar">
    <button on:click={clearAll} class="icon delete"></button>
    <div class="divider"></div>
    <input type="checkbox" id="group_statements" bind:checked={group_statements}/>
    <label style="position: relative; top: -1px;" for="group_statements">Group statements</label>
  </div>
  {#if group_statements}
    <TableSort items={Array.from(statements.values())}>
      <tr slot="thead">
        <th data-sort="statement">Statements</th>
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
  .toolbar {
    display: flex;
    align-items: center;
    padding: 3px 5px;
    border-bottom: 1px solid #3a3a3a;
    margin-bottom: 5px;
  }

  .divider {
    display: inline-block;
    border-left: 1px solid #3a3a3a;
    height: 20px;
    padding: 0 3px;
  }
</style>