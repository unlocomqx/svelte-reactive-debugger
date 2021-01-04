<script lang="ts">
  import { pref_store, ui_store } from "../store";
  import PropertyList from "./Details/PropertyList.svelte";
  import Resize from "./Resize.svelte";

  let details_div: HTMLDivElement;
  let details_width: number = $pref_store.details_width;

  let endEntries;
  $: end_state = $ui_store.inspected_item.end_state;
  $: endStateObj = parseState(end_state);
  $: endStateObj && (endEntries = Object.entries(endStateObj).map(([key, value]) => ({key, value})));

  let startEntries;
  $: start_state = $ui_store.inspected_item.start_state;
  $: startStateObj = parseState(start_state);
  $: startStateObj && (startEntries = Object.entries(startStateObj).map(([key, value]) => ({key, value})));

  function parseState (state) {
    try {
      return JSON.parse(state);
    } catch (e) {
      return null;
    }
    return null;
  }
</script>

<div id="details" bind:this={details_div} style="width: {details_width}px;">
  <div id="details-header">
    State
  </div>
  <div id="details-body">
    {#if endStateObj}
      <PropertyList
        readOnly
        header="Current"
        entries={endEntries} />
    {/if}

    {#if startEntries}
      <PropertyList
        readOnly
        header="Previous"
        entries={startEntries} />
    {/if}
  </div>
  <Resize {details_div} bind:details_width/>
</div>

<style>
  #details {
    position: relative;
    min-width: 200px;
    min-height: 100%;
    max-height: 100%;
    border-left: 1px solid #3a3a3a;
    border-bottom: 1px solid #3a3a3a;
  }

  #details-header {
    font-weight: bold;
    padding: 0 5px;
    border-top: 1px solid #3a3a3a;
    border-bottom: 1px solid #3a3a3a;
    height: 20px;
    line-height: 20px;
  }

  #details-body {
    padding: 5px;
  }
</style>
