<script>
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import MeetUpGrid from "./MeetUps/MeetUpGrid.svelte";
  import EditMeetUp from "./MeetUps/EditMeetUp.svelte";

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
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Swim Together",
      subTitle: "Let's go for some swimming",
      description: "We will simply swim some rounds!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Olympic_swimming_pool_%28Tbilisi%29.jpg/800px-Olympic_swimming_pool_%28Tbilisi%29.jpg",
      address: "27th Nerd Road, 32523 New York",
      contactEmail: "swim@test.com",
      isFavorite: false
    }
  ];

  let editMode = "";

  function addMeetup(event) {
    meetUps = [
      {
        id: Math.random().toString(),
        ...event.detail
      },
      ...meetUps
    ];

    editMode = "";
  }

  function onFavoriteMeetUp(event) {
    const index = meetUps.findIndex(item => item.id === event.detail.id);
    const updateMeetUp = { ...meetUps[index] };
    updateMeetUp.isFavorite = !updateMeetUp.isFavorite;

    meetUps[index] = updateMeetUp;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-action {
    margin: 1rem;
  }
</style>

<Header />
<main>
  <div class="meetup-action">
    <Button on:click={() => (editMode = 'add')}>Add Meetup</Button>
  </div>

  {#if editMode === 'add'}
    <EditMeetUp on:submitMeetup={addMeetup} on:close={() => (editMode = '')} />
  {/if}
  <MeetUpGrid on:togglefavorite={onFavoriteMeetUp} meetups={meetUps} />
</main>
