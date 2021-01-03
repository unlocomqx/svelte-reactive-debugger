<script lang="ts">

  import { pref_store } from "../store";

  export let details_div: HTMLDivElement;
  export let details_width: number;

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
    pref_store.setPref("details_width", details_width);
  }
</script>

<svelte:window on:mousemove={resize} on:mouseup={stopResize}/>

<div id="details_resize" on:mousedown={startResize}></div>

<style>
  #details_resize {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
    cursor: ew-resize;
  }
</style>