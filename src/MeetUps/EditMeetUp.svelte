<script>
  import { createEventDispatcher, onMount } from "svelte";
  import meetups from "./meetups.store";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { notEmpty, validEmail } from "../helper/validation";
  import {
    addMeetUpsAPI,
    editMeetUpsAPI,
    deleteMeetUpsAPI
  } from "../helper/api.service";
  import Error from "../UI/Error.svelte";

  export let id = null;

  let currentMeet = {
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    address: "",
    contactEmail: ""
  };
  let showError = false;
  let errorMessage = "";

  onMount(() => {
    if (id) {
      const unsubscribe = meetups.subscribe(items => {
        const editMeetup = items.find(itm => itm.id === id);
        currentMeet = { ...editMeetup };
      });
      unsubscribe();
    }
  });

  const dispatch = createEventDispatcher();

  async function submitMeetup() {
    try {
      const isValid =
        notEmpty(currentMeet.title) &&
        notEmpty(currentMeet.subTitle) &&
        notEmpty(currentMeet.description) &&
        notEmpty(currentMeet.imageUrl) &&
        notEmpty(currentMeet.address) &&
        validEmail(currentMeet.contactEmail);

      if (isValid) {
        if (id) {
          const response = await editMeetUpsAPI({ ...currentMeet });
          meetups.updateMeetup(id, { ...currentMeet });
        } else {
          const newMeetUp = {
            ...currentMeet,
            isFavorite: false
          };

          const response = await addMeetUpsAPI(newMeetUp);

          newMeetUp.id = response.name;
          meetups.addMeetup(newMeetUp);
        }
        dispatch("submitMeetup");
        currentMeet = {
          title: "",
          subTitle: "",
          description: "",
          imageUrl: "",
          address: "",
          contactEmail: ""
        };
      }
    } catch (error) {
      showError = true;
      errorMessage = error.message || error ;
      console.log("Error in submitMeetup function", error);
    }
  }

  async function deleteMeetup() {
    try {
      if (id) {
        await deleteMeetUpsAPI(id);
        meetups.deleteMeetup(id);
        closeEdit();
      }
    } catch (error) {
      showError = true;
      errorMessage = error.message || error ;
      console.log("Error in deleteMeetup function", error);
    }
  }

  function handleFormInput(event) {
    currentMeet = {
      ...currentMeet,
      [event.target.id]: event.target.value
    };
  }

  function closeEdit() {
    dispatch("close");
  }
</script>

<style>
  form {
    width: 100%;
    max-width: 100%;
    margin: auto;
  }
</style>

<!-- To prevent default submit behaviour of form
	Used Svelte Event Modifier  `| preventDefault` -->

<Modal title="Edit Meetup" open={true} on:close>
  <form on:submit|preventDefault={submitMeetup}>

    <TextInput
      label="Title"
      id="title"
      value={currentMeet.title}
      valid={notEmpty(currentMeet.title)}
      on:input={handleFormInput} />
    <!-- Passing function as prop -->
    <!-- onInput={handleFormInput} /> -->

    <TextInput
      label="Sub Title"
      id="subTitle"
      value={currentMeet.subTitle}
      valid={notEmpty(currentMeet.subTitle)}
      on:input={handleFormInput} />

    <TextInput
      label="Image Url"
      id="imageUrl"
      value={currentMeet.imageUrl}
      valid={notEmpty(currentMeet.imageUrl)}
      on:input={handleFormInput} />

    <TextInput
      label="Contact Email"
      id="contactEmail"
      value={currentMeet.contactEmail}
      valid={validEmail(currentMeet.contactEmail)}
      on:input={handleFormInput} />

    <TextInput
      label="Address"
      id="address"
      value={currentMeet.address}
      valid={notEmpty(currentMeet.address)}
      on:input={handleFormInput} />

    <TextInput
      label="Description"
      id="description"
      controlType="textarea"
      row="3"
      value={currentMeet.description}
      valid={notEmpty(currentMeet.description)}
      on:input={handleFormInput} />
  </form>
  <div slot="footer">
    <Button mode="outline" on:click={closeEdit}>Close</Button>
    <Button on:click={submitMeetup}>Save</Button>

    {#if id}
      <Button mode="outline" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>

</Modal>
<Error bind:showError {errorMessage} />
