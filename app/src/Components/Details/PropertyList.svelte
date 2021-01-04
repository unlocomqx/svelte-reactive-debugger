<script>
  import { devtools } from "chrome";
  import CollapsableValue from "./CollapsableValue.svelte";

  export let header
  export let entries = []
  export let id
  export let readOnly = false

  let errorMessages = {}
  function change(key, value) {
    devtools.inspectedWindow.eval(
      `__svelte_devtools_inject_state(${id}, '${key}', ${value})`,
      (result, error) =>
        (errorMessages[key] =
          error && error.isException
            ? error.value.substring(0, error.value.indexOf('\n'))
            : undefined)
    )
  }
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
        errorMessage={errorMessages[key]}
        collapsed={false}
        {readOnly}
        {key}
        {value}
        on:change={e => change(key, e.detail)} />
    {/each}
  </ul>
{:else}
  <div class="empty">None</div>
{/if}
