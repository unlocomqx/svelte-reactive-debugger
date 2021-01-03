<script lang="ts">
  import { ui_store } from "../store";

  let details_div: HTMLDivElement;
  let details_width: number;

  let resizing = false;
  let start_point = null;
  let start_width = null;
  function startResize (ev: MouseEvent) {
    resizing = true;
    start_point = ev.clientX;
    start_width = details_div.clientWidth;
    document.body.classList.add("noselect");
  }

  function resize (ev) {
    if (resizing) {
      details_width = Math.max(start_width + (start_point - ev.clientX), 100);
    }
  }

  function stopResize () {
    resizing = false;
    document.body.classList.remove("noselect");
  }
</script>

<svelte:window on:mousemove={resize} on:mouseup={stopResize}/>

<div id="details" bind:this={details_div} style="width: {details_width}px;">
  <div id="details-header">
    Details
  </div>
  <div id="details-body">
    {$ui_store.inspected_item}
  </div>
  <div id="details_resize" on:mousedown={startResize}></div>
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

  #details_resize {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
    cursor: ew-resize;
  }
</style>