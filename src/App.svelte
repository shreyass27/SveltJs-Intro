<script>
  import ContactCard from "./ContactCard.svelte";

  let name = "Max";
  let title = "";
  let image = "";
  let description = "";
  let createdContact = {
    name,
    title,
    description,
    image
  };

  let contactList = [];

  let formState = "";

  // Will detect changes for "name", "title" , "image" & "description"
  // And Run below code for Every change
  $: {
    if (name && title && image && description) {
      formState = "done";
    } else {
      formState = "invalid";
    }
  }

  function addFormState() {
    createdContact = {
      id: Math.random().toString(),
      name,
      title,
      description,
      image
    };
    // State changes only on Assignments | "="
    contactList = [...contactList, createdContact];
    name = "";
    title = "";
    image = "";
    description = "";
  }

  function removeCard(id) {
    contactList = contactList.filter(contact => contact.id !== id);
  }

  function handleNameChange(event) {
    // One way event binding
    name = event.target.value || "";
  }
</script>

<style>
  #form {
    width: 30rem;
    max-width: 100%;
  }
</style>

<div id="form">
  <div class="form-control">
    <label for="userName">User Name</label>
    <!-- Input using one way data binding -->
    <input
      type="text"
      on:input={e => handleNameChange(e)}
      value={name}
      id="userName" />
  </div>
  <div class="form-control">
    <label for="jobTitle">Job Title</label>
    <input type="text" bind:value={title} id="jobTitle" />
  </div>
  <div class="form-control">
    <label for="image">Image URL</label>
    <input type="text" bind:value={image} id="image" />
  </div>
  <div class="form-control">
    <label for="desc">Description</label>
    <textarea rows="3" bind:value={description} id="desc" />
  </div>
</div>

<button disabled={!(formState === 'done')} on:click={addFormState}>
  Display card
</button>

<!-- If / else if / else condition statements -->
{#if formState === 'done'}
  <p>All details were added!</p>
{:else if formState === 'invalid'}
  <p>Invalid form state</p>
{:else}
  <p>Please fill the form</p>
{/if}

<!-- For loops -->
<!-- Important to add unique indentifier like (contact.id) for
     Better update cycle in Svelte  -->
{#each contactList as contact, index (contact.id)}
  <h2># {index + 1}</h2>
  <ContactCard
    id={contact.id}
    {removeCard}
    userName={contact.name}
    jobTitle={contact.title}
    description={contact.description}
    userImage={contact.image} />
{:else}
<!-- If array has no element  -->
<p>Please start add elements. We found none!</p>
{/each}
