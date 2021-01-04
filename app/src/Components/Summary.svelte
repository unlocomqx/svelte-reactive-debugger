<script lang="ts">
  import { TableSort } from "svelte-tablesort";
  import { fade } from "svelte/transition";
  import { ev_store, pref_store } from "../store";
  import type { Sort } from "../types";
  import Statement from "./Statement.svelte";

  $: statements = groupStatements($ev_store);
  $: items = Array.from(statements.values());

  function groupStatements (events) {
    let statements = new Map();
    events.forEach(event => {
      let eventId = event.id;
      if (statements.has(eventId)) {
        const info = statements.get(eventId);
        statements.set(eventId, {
          ...event,
          duration: info.duration + event.duration,
          count   : info.count + 1,
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

  let sort: Sort;
  $: sort = $pref_store?.sort?.summary ?? {
    name     : "count",
    direction: "descending",
  };

  function saveSort (ev) {
    $pref_store.sort = $pref_store.sort || {};
    $pref_store.sort.summary = ev.detail;
  }
</script>

{#if statements.size > 0}
  <div in:fade={{duration: 100}}>
    <TableSort {items} on:sort={saveSort}>
      <tr slot="thead">
        <th data-sort="statement" data-sort-initial={sort.name === 'statement' ? sort.direction : null}>Statements ({items.length})</th>
        <th data-sort="count" data-sort-initial={sort.name === 'count' ? sort.direction : null}>Count</th>
        <th data-sort="duration" data-sort-initial={sort.name === 'duration' ? sort.direction : null}>Duration</th>
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
