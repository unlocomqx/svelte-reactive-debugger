<script>
  import { ev_store, pref_store, ui_store } from "../store";

  function clearAll() {
    ev_store.clear();
  }

  function handleGroupStatementsChange() {
    $ui_store.show_details = false;
    $ui_store.inspected_item = null;
  }
</script>

<div class="toolbar">
  <button on:click={clearAll} class="icon delete" title="Clear all" style="position: relative; top: -1px;"></button>

  <div class="divider"></div>

  <button on:click={() => $pref_store.show_filters = !$pref_store.show_filters} class="icon filter" class:on={$pref_store.show_filters} title="Toggle filters" style="position: relative; top: -1px;"></button>

  <div class="divider"></div>

  <input type="checkbox" id="group_statements" on:change={handleGroupStatementsChange}
         bind:checked={$pref_store.group_statements}/>
  <label style="position: relative; top: -1px;" for="group_statements">Group statements</label>

  <div class="spacer"></div>

  <input type="checkbox" id="preserve_log" bind:checked={$pref_store.preserve_log}/>
  <label style="position: relative; top: -1px;" for="preserve_log">Preserve log</label>

  <div class="spacer"></div>

  {#if !$pref_store.group_statements}
    <span title="Show only statements which changed the component state">
      <input type="checkbox" id="changes_only" bind:checked={$pref_store.changes_only}/>
      <label style="position: relative; top: -1px;" for="changes_only">Changes only</label>
    </span>
  {/if}
</div>

<style>
  .toolbar {
    display: flex;
    align-items: center;
    padding: 3px 5px;
  }

  .divider {
    display: inline-block;
    border-left: 1px solid #3a3a3a;
    height: 20px;
    margin: 0 3px;
  }

  .spacer {
    margin-right: 5px;
  }
</style>
