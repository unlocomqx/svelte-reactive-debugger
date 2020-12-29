<script>
  import { ui_store } from "./store";
  import Summary from "./Components/Summary.svelte";
  import Toolbar from "./Components/Toolbar.svelte";
  import List from "./Components/List.svelte";
</script>

<div>
  <Toolbar/>
  {#if $ui_store.group_statements}
    <Summary/>
  {:else}
    <List/>
  {/if}
</div>