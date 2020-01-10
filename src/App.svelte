<script>
  import Product from "./Product.svelte";
  import CartItem from "./CartItem.svelte";
  import FamilyNode from "./FamilyNode.svelte";

  let y;
  let currentTitle = "Svelte Def Title";

  let renderComp = {
    cmp: Product,
    title: "Product title one"
  };

  let familyStructure = [
    {
      isParent: true,
      name: "Chris",
      children: [
        {
          isParent: true,
          name: "Moe",
          children: [{ isParent: false, name: "Julie" }]
        }
      ]
    },
    { isParent: false, name: "Mandy" }
  ];

  $: console.log(y);

  function toggleProduct() {
    if (renderComp.cmp === Product) {
      renderComp = {
        cmp: CartItem,
        title: "CartItem title one"
      };
    } else {
      renderComp = {
        cmp: Product,
        title: "Product title one"
      };
    }
  }
  function switchTitle() {
    currentTitle = "A New Title";
  }
</script>

<style>
  div {
    height: 3000px;
  }
</style>

<svelte:window bind:scrollY={y} />
<svelte:body on:mouseenter />
<button on:click={switchTitle}>Switch Title</button>
<svelte:head>
  <!-- Whatever goes in Head Tag can be manipulate with svelte:head element -->
  <title>{currentTitle}</title>
</svelte:head>

<div>
  <button on:click={toggleProduct}>Toggle Display</button>

  <svelte:component this={renderComp.cmp} title={renderComp.title} id="p1" />

  {#each familyStructure as familyMem}
    <FamilyNode member={familyMem} />
  {/each}

</div>
