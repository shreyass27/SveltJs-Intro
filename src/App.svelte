<script>
  import { onMount } from "svelte";
  import { addHobbiesAPI, getHobbiesAPI } from "./api.utility";
  import hobbiesSt from "./hoobies.store";

  let hobbyName = "";
  let hobbies = [];
  let isLoading = false;

  onMount(() => {
    getHobbies();
  });

  async function getHobbies() {
    try {
      isLoading = true;
      const res = await getHobbiesAPI();
      hobbies = Object.values(res);
      hobbiesSt.setHobbies(hobbies);
      isLoading = false;
      return hobbies;
    } catch (e) {
      isLoading = false;
      console.log(e);
    }
  }

  console.log("getHobbies", getHobbies);
  console.dir("getHobbies", getHobbies);

  async function addHobby() {
    try {
      isLoading = true;
      const res = await addHobbiesAPI(hobbyName);
      hobbies = [...hobbies, hobbyName];
      hobbiesSt.addHobbies(hobbyName);
      isLoading = false;
      hobbyName = "";
    } catch (e) {
      isLoading = false;
      console.log(e);
    }
  }
</script>

<style>

</style>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:value={hobbyName} />
<button on:click={addHobby}>Add Bobby</button>

<!-- Using Store Observable  -->
{#if isLoading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each $hobbiesSt as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if}

<!-- Using variable with API  -->
<!-- {#if isLoading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each hobbies as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{/if} -->

<!-- Using variable with API  -->
<!-- await block can be used to resolve promises directly in HTML and get response values  -->
<!-- {#await getHobbies}
  <p>Loading...</p>
{:then hobyyData}
  <ul>
    {#each hobyyData as hobby (hobby)}
      <li>{hobby}</li>
    {/each}
  </ul>
{:catch error}
  <p>{error.message}</p>
{/await} -->
