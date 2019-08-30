<script>
  import Product from "./Product.svelte";
  import Modal from "./Modal.svelte";

  export let name;
  let openModal = false;
  let closable = false;

  const myName = "App";
  const products = [
    {
      id: "Cooool",
      title: "A book",
      price: 9.99
    },
    {
      id: "Coooasdads",
      title: "A Fish",
      price: 9.18
    }
  ];

  function alertFunc(event) {
    // event returns custom event dispatched
    console.log(event);
    alert(
      `Just an alert | ${event.type} return : ${JSON.stringify(
        event.detail
      )} object`
    );
  }
</script>

<style>

</style>

{#each products as product (product.id)}
  <Product {...product} on:addToCart={alertFunc} on:deleteCart={alertFunc} />
{/each}

<button on:click={() => (openModal = true)}>Show Modal</button>

{#if openModal}
  <!-- Variable prop can be passed and bind back to Parent compenent which uses SLOT -->
  <Modal on:close={() => (openModal = false)} 
  let:didAgree={closable}>
    <h1 slot="header">Hello</h1>
    <h3>This works</h3>
    <button slot="footer" on:click={() => (openModal = false)} disabled={!closable}>Confirm</button>
  </Modal>
{/if}
