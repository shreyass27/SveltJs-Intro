<script>
  import { addHobbiesAPI } from "./api.utility";

  let hobbyName = "";
  let hobbies = [];

  async function addHobby() {
    try {
      hobbies = [...hobbies, hobbyName];
      const res = await addHobbiesAPI(hobbies);
      hobbyName = "";
    } catch (e) {
      console.log(e);
    }
  }
</script>

<style>

</style>

<label for="hobby">Hobby</label>
<input type="text" id="hobby" bind:value={hobbyName} />
<button on:click={addHobby}>Add Bobby</button>

<ul>
  {#each hobbies as hobby (hobby)}
    <li>{hobby}</li>
  {/each}
</ul>
