<script lang="ts">
  declare var browser;

  import Container from "./Components/Container.svelte";
  import Details from "./Components/Details.svelte";
  import LeftPane from "./Components/LeftPane.svelte";
  import List from "./Components/List.svelte";
  import RightPane from "./Components/RightPane.svelte";
  import Summary from "./Components/Summary.svelte";
  import Toolbar from "./Components/Toolbar.svelte";
  import "./scss/global.scss";
  import { dbg_store, pref_store, ui_store } from "./store";

  const isChrome = typeof browser === "undefined";
</script>

<div class:firefox={!isChrome}>
  {#if $dbg_store.debugger_enabled}
    <Toolbar/>
    {#if !$dbg_store.tab_connected}
      <p style="text-align: center;">
        Reload the page to connect to the svelte reactive debugger
      </p>
    {:else}
      <Container>
        <RightPane>
          {#if $pref_store.group_statements}
            <Summary/>
          {:else}
            <List/>
          {/if}
        </RightPane>
        <LeftPane>
          {#if $ui_store.show_details}
            <Details/>
          {/if}
        </LeftPane>
      </Container>
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

<style>
  .firefox {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
    font-size: 12px;
  }
</style>
