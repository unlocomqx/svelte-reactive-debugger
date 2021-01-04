<script>
  import CollapsableValue from "./CollapsableValue.svelte";

  export let header
  export let entries = []
  export let readOnly = false
</script>

<style>
  .empty {
    margin: 8px 0 0 12px;
    color: rgb(118, 118, 118);
  }

  ul {
    padding: 0;
    margin: 5px;
  }

  ul,
  div {
    margin-bottom: 20px;
  }
</style>

{#if header}
  <span style="font-weight: bold;">{header}</span>
{/if}

{#if entries.length}
  <ul>
    {#each entries as { key, value } (key)}
      <CollapsableValue
        {readOnly}
        {key}
        {value}/>
    {/each}
  </ul>
{:else}
  <div class="empty">None</div>
{/if}
