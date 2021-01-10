<script lang="ts">
  import copy from "copy-to-clipboard";
  import { spring } from "svelte/motion";

  export let statement;
  export let filename;
  export let line;
  export let has_changes = false;
  function copyLocation (e: MouseEvent) {
    if (e.metaKey || e.ctrlKey) {
      nudge = true;
      setTimeout(() => {
        nudge = false;
      }, 100);
      copy(`${ filename }:${ line }`);
      e.stopPropagation();
    }
  }

  let nudge = false;
  const size = spring();
  $: $size = nudge ? 1.05 : 1;

</script>

<span on:click={copyLocation} style="will-change: transform; transform-origin: center left; transform: scale({$size});"
      title="(ctrl/cmd click to copy location)&#13;{statement}">
  <span title="Component state change detected">{has_changes ? '*' : ''}</span> {statement}
</span>

<style>
  span {
    max-width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
  }
</style>
