<script>
  import { createEventDispatcher } from "svelte";

  export let title;
  export let price;
  export let id;
  // export let alertFunc;
  const dispatch = createEventDispatcher();
  const myName = "Product";

  function addToCart() {
    dispatch("addToCart", {
      id: `ItemId addToCart ${title}`
    });
  }

  function deleteCart() {
    dispatch("deleteCart", {
      id: `ItemId deleteCart ${title}`
    });
  }
</script>

<article>
  <h1>{title}</h1>
  <h3>&#8377;{price}</h3>
  <button on:click={addToCart}>Add To Cart</button>
  <button on:click={deleteCart}>Delete</button>

  <!-- Using Prop Function on click event -->
  <!-- <button on:click={alertFunc}>alertFunc</button> -->
</article>
