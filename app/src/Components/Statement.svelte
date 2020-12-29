<script>
  export let statement;
</script>

<span title={statement}>{statement}</span>

<style>
  span {
    max-width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>