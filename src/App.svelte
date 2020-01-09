<script>
  import Product from "./Product.svelte";
  import CartItem from "./CartItem.svelte";
  import FamilyNode from "./FamilyNode.svelte";

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
</script>

<button on:click={toggleProduct}>Toggle Display</button>

<svelte:component this={renderComp.cmp} title={renderComp.title} id="p1" />

{#each familyStructure as familyMem}
  <FamilyNode member={familyMem} />
{/each}
