<script>
  import Cart from "./Cart/Cart.svelte";
  import Products from "./Products/Products.svelte";
  import Button from "./UI/Button.svelte";
  import { onDestroy } from "svelte";
  import timer from "./timer.store";

  let toggleCart = true;

  const unSubscribe = timer.subscribe(time => console.log("App Time", time));

  onDestroy(() => {
    if (unSubscribe) {
      console.log("cartItems.subscribe subscription removed");
      unSubscribe();
    }
  });
</script>

<Button
  on:click={() => {
    toggleCart = !toggleCart;
  }}>
  Toggle Cart
</Button>

{#if toggleCart}
  <Cart />
{/if}
<Products />
<p>Count: {$timer}</p>
