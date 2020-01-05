<script>

  export let num = 1;
</script>

<style>
    button:disabled {
        opacity: 0.6;
    }
</style>

<button disabled={num === 1} on:click={() => (num = 1)}>Chose 1</button>
<button disabled={num === 2} on:click={() => (num = 2)}>Chose 2</button>
