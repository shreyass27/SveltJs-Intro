<script>
  let passwordList = [];
  let password = "";
  let invalid = "";

  function addPassword() {
    if (password) {
      passwordList = [...passwordList, password];
    }
  }

  function removePassword(i) {
    passwordList = [...passwordList.filter((item, index) => i !== index)];
  }

  $: if (password.trim().length > 12) {
    invalid = "long";
  } else if (password.trim().length > 8) {
    invalid = "";
  } else if (!password) {
    invalid = "empty";
  } else {
    invalid = "short";
  }
</script>

<style>

</style>

<input type="password" bind:value={password} />
<button disabled={!password} on:click={addPassword}>Add</button>
<pre>Password: {password}</pre>

{#if invalid === 'empty'}
  <p>Please enter password</p>
{:else if invalid === 'short'}
  <p>Password length should be greater than 8</p>
{:else if invalid === 'long'}
  <p>Password length should not be greater than 12</p>
{:else}
  <p>Valid Password</p>
{/if}

<ul>
  {#each passwordList as pass, index (index + pass)}
    <li on:click={removePassword.bind(this, index)}>{index + 1}. {pass}</li>
  {:else}
    <b>Start Adding Password</b>
  {/each}
</ul>
