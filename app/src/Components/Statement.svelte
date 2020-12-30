<script>
  import copy from 'copy-to-clipboard';

  export let statement;
  export let filename;
  export let line;

  function copyLocation() {
    copy(`${filename}:${line}`);
  }

</script>

<span on:click={copyLocation} title="(click to copy location {filename}:{line})&#13;{statement}">{statement}</span>

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