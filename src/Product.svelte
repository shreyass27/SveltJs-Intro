<script>
  import { createEventDispatcher } from "svelte";

  export let title;
  export let price;
  export let id;
  const dispatch = createEventDispatcher();
  const myName = "Product";

  function addToCart() {
    dispatch("addToCart", {
      id: "ItemId addToCart"
    });
  }

  function deleteCart() {
    dispatch("deleteCart", {
      id: "ItemId deleteCart"
    });
  }

</script>

<article>
  <h1>{title}</h1>
  <h3>&#8377;{price}</h3>
  <button on:click={addToCart}>Add To Cart</button>
  <button on:click={deleteCart}>Delete</button>
</article>
