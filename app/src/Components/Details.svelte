<script lang="ts">
  import { ui_store } from "../store";
  import Resize from "./Resize.svelte";

  let details_div: HTMLDivElement;
  let details_width: number;
</script>

<div id="details" bind:this={details_div} style="width: {details_width}px;">
  <div id="details-header">
    Details
  </div>
  <div id="details-body">
    {$ui_store.inspected_item}
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