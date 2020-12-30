<script>
  import { ui_store } from "./store";
  import Summary from "./Components/Summary.svelte";
  import Toolbar from "./Components/Toolbar.svelte";
  import List from "./Components/List.svelte";
</script>

<div>
  {#if $ui_store.debugger_enabled}
    <Toolbar/>
    {#if $ui_store.group_statements}
      <Summary/>
    {:else}
      <List/>
    {/if}
  {:else}
    <div style="text-align: center; padding: 15px;">
      <div>
        Svelte RXD not detected, follow the steps described here to enable it
      </div>
      <div>
        <a href="https://github.com/unlocomqx/svelte-rxd-preprocessor" target="_blank">
          https://github.com/unlocomqx/svelte-rxd-preprocessor
        </a>
      </div>
    </div>
  {/if}
</div>