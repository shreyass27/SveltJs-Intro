<script>
  import { writable } from "svelte/store";
  import { tweened } from "svelte/motion";
  import { cubicIn, cubicOut } from "svelte/easing";
  import Spring from "./Spring.svelte";
  import { fade, fly, slide, scale } from "svelte/transition";
  import { flip } from "svelte/animate";

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
  let showPara = true;

  function addBox() {
    boxes = [boxinput, ...boxes];
    boxinput = "";
  }

  function deleteBox(box) {
    boxes = [...boxes.filter(bx => box !== bx)];
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

{#if showPara}
  {#each boxes as box (box)}
    <div
      transition:fly|local={{ x: 300, y: 0 }}
      on:click={deleteBox.bind(this, box)}
      on:introstart={() => console.log('On Adding Element starts:', box)}
      on:introend={() => console.log('On Adding Element end:', box)}
      on:outrostart={() => console.log('On Removing Element starts:', box)}
      on:outroend={() => console.log('On Removing Element end:', box)}
      animate:flip>
      {box}
    </div>
  {/each}
{/if}

<hr />

<button
  on:click={() => {
    showPara = !showPara;
  }}>
  Toggle Para
</button>

{#if showPara}
  <p in:fade out:fly={{ x: 300 }}>Can you see me ?</p>
{/if}
