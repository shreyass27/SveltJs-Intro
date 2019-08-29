<script>
  import Header from "./UI/Header.svelte";
  import TextInput from "./UI/TextInput.svelte";
  import Button from "./UI/Button.svelte";
  import MeetUpGrid from "./MeetUps/MeetUpGrid.svelte";

  let newMeet = {
    title: "",
    subTitle: "",
    description: "",
    imageUrl: "",
    address: "",
    contactEmail: ""
  };

  let meetUps = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subTitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG/800px-Caffe_Nero_coffee_bar%2C_High_St%2C_Sutton%2C_Surrey%2C_Greater_London.JPG",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "code@test.com"
    },
    {
      id: "m2",
      title: "Swim Together",
      subTitle: "Let's go for some swimming",
      description: "We will simply swim some rounds!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com"
    }
  ];

  function addMeetup() {
    meetUps = [
      {
        id: Math.random().toString(),
        ...newMeet
      },
      ...meetUps
    ];
    newMeet = {
      title: "",
      subTitle: "",
      description: "",
      imageUrl: "",
      address: "",
      contactEmail: ""
    };
  }

  function handleFormInput(event) {
    newMeet = {
      ...newMeet,
      [event.target.id]: event.target.value
    };
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  form {
	  width: 30rem;
	  max-width: 90%;
	  margin: auto;
  }
</style>

<Header />
<main>
  <!-- To prevent default submit behaviour of form
	Used Svelte Event Modifier  `| preventDefault` -->
  <form on:submit|preventDefault={addMeetup}>

    <TextInput
      label="Title"
      id="title"
      value={newMeet.title}
      on:input={handleFormInput} />

    <TextInput
      label="Sub Title"
      id="subTitle"
      value={newMeet.subTitle}
      on:input={handleFormInput} />

    <TextInput
      label="Image Url"
      id="imageUrl"
      value={newMeet.imageUrl}
      on:input={handleFormInput} />

    <TextInput
      label="Contact Email"
      id="contactEmail"
      value={newMeet.contactEmail}
      on:input={handleFormInput} />

    <TextInput
      label="Address"
      id="address"
      value={newMeet.address}
      on:input={handleFormInput} />

    <TextInput
      label="Description"
      id="description"
      controlType="textarea"
      value={newMeet.description}
      on:input={handleFormInput} />

    <Button type="submit" text="Submit" />
  </form>

  <MeetUpGrid meetups={meetUps} />
</main>
