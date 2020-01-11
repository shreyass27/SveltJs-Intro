<script>
  import { fade } from "svelte/transition";

  export let showError = false;
  export let errorMessage = "";

  
</script>

<style>
  .error-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 36px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    color: white;
    font-size: 18px;
  }

  .error-info {
    padding: 4px;
  }

  .error-close {
    padding: 2px 8px;
    border-radius: 16px;
    background-color: #ea4848;
    border: 1px solid white;
  }
</style>

{#if showError}
  <div>
    <div transition:fade class="error-bar">
      <div class="error-info">{errorMessage}</div>
      <div class="error-close" on:click={() => (showError = false)} >x</div>
    </div>
  </div>
{/if}
