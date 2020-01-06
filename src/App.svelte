<script>
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { cubicIn, cubicOut } from "svelte/easing";
  import Spring from "./Spring.svelte";

  //   const progress = writable(0);
  // const progress = tweened(0, {
  //   delay: 0,
  //   duration: 1000,
  //   easing: cubicIn
  // });

  // setTimeout(() => {
  //   progress.set(0.6);
  // }, 1500);

  let boxes = [];
  let boxinput = "";

  function addBox() {
    boxes = [...boxes, boxinput];
    boxinput = '';
  }
</script>

<style>
  div {
    width: 10rem;
    height: 10rem;
    background: #ccc;
    margin: 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    padding: 1rem;
  }
</style>

<!-- <progress value={$progress} /> -->
<!-- <Spring /> -->

<input type="text" bind:value={boxinput} />
<button on:click={addBox}>Add</button>

{#each boxes as box (box)}
  <div>{box}</div>
{/each}
