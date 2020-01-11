<script context="module">
  import { getMeetUpByIdApi } from "../../helper/api.service";

  export async function preload({ params, query, path }) {
    try {
      const res = await getMeetUpByIdApi(params.id, this);

      return { selectedMeetup: { ...res, id: params.id } };
    } catch (e) {
      console.log("Error in preload getMeetUpByIdApi | error => ", e);
    }
  }
</script>

<script>
  import { createEventDispatcher } from "svelte";
  import { onDestroy } from "svelte";
  import meetups from "../../store/meetups.store";
  import Button from "../../components/UI/Button.svelte";

  export let selectedMeetup;
  const dispatch = createEventDispatcher();

  function onClose() {
    dispatch("close-details");
  }
</script>

<style>
  section {
    margin-top: 4rem;
  }

  .image {
    width: 100%;
    height: 25rem;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image {
    background: #e7e7e7;
  }

  .content {
    text-align: center;
    width: 80%;
    margin: auto;
  }

  h1 {
    font-size: 2rem;
    font-family: "Roboto Slab", sans-serif;
    margin: 0.5rem 0;
  }

  h2 {
    font-size: 1.25rem;
    color: #6b6b6b;
  }

  p {
    font-size: 1.5rem;
  }
</style>

<svelte:head>
  <title>{selectedMeetup.title} - Meetup</title>
</svelte:head>

<section>
  <div class="image">
    <img src={selectedMeetup.imageUrl} alt={selectedMeetup.title} />
  </div>

  <div class="content">
    <h1>{selectedMeetup.title}</h1>
    <h2>{selectedMeetup.subTitle}</h2>
    <p>{selectedMeetup.description}</p>
    <p>{selectedMeetup.address}</p>

    <Button href="mailto:{selectedMeetup.contactEmail}">Contact</Button>
    <Button mode="outline" href="/">Close</Button>
  </div>
</section>
