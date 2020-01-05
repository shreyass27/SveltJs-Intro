<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import { notEmpty, validEmail } from "../helper/validation";

  let newMeet = {
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    address: "",
    contactEmail: ""
  };

  const dispatch = createEventDispatcher();

  function submitMeetup() {
    const isValid =
      notEmpty(newMeet.title) &&
      notEmpty(newMeet.subTitle) &&
      notEmpty(newMeet.description) &&
      notEmpty(newMeet.imageUrl) &&
      notEmpty(newMeet.address) &&
      validEmail(newMeet.contactEmail);

    if (isValid) {
      dispatch("submitMeetup", { ...newMeet });
      newMeet = {
        title: "",
        subTitle: "",
        description: "",
        imageUrl: "",
        address: "",
        contactEmail: ""
      };
    }
  }

  function handleFormInput(event) {
    newMeet = {
      ...newMeet,
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
      value={newMeet.title}
      valid={notEmpty(newMeet.title)}
      on:input={handleFormInput} />
    <!-- Passing function as prop -->
    <!-- onInput={handleFormInput} /> -->

    <TextInput
      label="Sub Title"
      id="subTitle"
      value={newMeet.subTitle}
      valid={notEmpty(newMeet.subTitle)}
      on:input={handleFormInput} />

    <TextInput
      label="Image Url"
      id="imageUrl"
      value={newMeet.imageUrl}
      valid={notEmpty(newMeet.imageUrl)}
      on:input={handleFormInput} />

    <TextInput
      label="Contact Email"
      id="contactEmail"
      value={newMeet.contactEmail}
      valid={validEmail(newMeet.contactEmail)}
      on:input={handleFormInput} />

    <TextInput
      label="Address"
      id="address"
      value={newMeet.address}
      valid={notEmpty(newMeet.address)}
      on:input={handleFormInput} />

    <TextInput
      label="Description"
      id="description"
      controlType="textarea"
      row="3"
      valid={notEmpty(newMeet.description)}
      bind:value={newMeet.description} />
  </form>
  <div slot="footer">
    <Button mode="outline" on:click={closeEdit}>Close</Button>
    <Button on:click={submitMeetup}>Save</Button>
  </div>

</Modal>
