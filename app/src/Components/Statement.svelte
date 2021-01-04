<script lang="ts">
  import copy from "copy-to-clipboard";

  export let statement;
  export let filename;
  export let line;
  export let has_changes = false;
  function copyLocation (e: MouseEvent) {
    if (e.metaKey || e.ctrlKey) {
      copy(`${ filename }:${ line }`);
      e.stopPropagation();
    }
  }

</script>

<span on:click={copyLocation} title="(ctrl/cmd click to copy location)&#13;{statement}">
  <span title="Component state change detected">{has_changes ? '*': ''}</span> {statement}
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
