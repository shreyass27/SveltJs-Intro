<script>
  import { onDestroy } from "svelte";
  import CartItem from "./CartItem.svelte";
  import cartItems from "./cart-items";
  import timer from "../timer.store";

  let items = [];

  // Subscription is added every time component is initialized and added to DOM
  console.log("cartItems.subscribe subscription set");

  // Returns a function to UnSubscribe
  // const unSubscribe = cartItems.subscribe(records => (items = records));

  // onDestroy(() => {
  //   if (unSubscribe) {
  //     console.log("cartItems.subscribe subscription removed");
  //     unSubscribe();
  //   }
  // });

  // export let items = [
  //   {
  //     id: "p1",
  //     title: "Test",
  //     price: 9.99
  //   },
  //   {
  //     id: "p2",
  //     title: "Test",
  //     price: 9.99
  //   }
  // ];

  const unSubscribe = timer.subscribe(time => console.log("Cart  Time", time));

  onDestroy(() => {
    if (unSubscribe) {
      console.log("cartItems.subscribe subscription removed");
      unSubscribe();
    }
  });
  function removeFromCart(event) {
    // Using Custom Store
    cartItems.removeCartItem(event.detail);

    // Using Normal Store
    // cartItems.update(items => [
    //   ...items.filter(itm => itm.id !== event.detail)
    // ]);
  }
</script>

<style>
  section {
    width: 30rem;
    max-width: 90%;
    margin: 2rem auto;
    border-bottom: 2px solid #ccc;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<section>
  <h1>Cart</h1>
  <ul>

    <!-- Subscribed value assigned to local variable -->
    <!-- {#each items as item (item.id)} -->

    <!-- $ sign prefix can be used to extract value from store in HTML. -->
    <!-- Subscriptions and unsubscribing are handled automatically. -->
    {#each $cartItems as item (item.id)}
      <CartItem
        on:remove-item={removeFromCart}
        id={item.id}
        title={item.title}
        price={item.price} />
    {:else}
      <p>No items in cart yet!</p>
    {/each}
  </ul>
</section>
