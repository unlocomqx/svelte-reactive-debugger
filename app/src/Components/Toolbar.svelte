<script>
  import { store, ui_store } from "../store";

  function clearAll() {
    store.clear();
  }
</script>

<div class="toolbar">
  <button on:click={clearAll} class="icon delete" title="Clear all"></button>
  <div class="divider"></div>
  <input type="checkbox" id="group_statements" bind:checked={$ui_store.group_statements}/>
  <label style="position: relative; top: -1px;" for="group_statements">Group statements</label>
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
</style>