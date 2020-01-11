<script context="module">
  import { getMeetUpsAPI } from "../helper/api.service";

  export async function preload({ params, query, path }) {
    try {
      const res = await getMeetUpsAPI(this);

      const resHobbies = [];
      for (let key in res) {
        resHobbies.push({ ...res[key], id: key });
      }

      const fetchedMeetUps = resHobbies.reverse();

      return { fetchedMeetUps };
    } catch (e) {
      console.log("Error in preload getMeetUpsAPI | error => ", e);
    }
  }
</script>

<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import MeetUpItem from "../components/MeetUps/MeetUpItem.svelte";
  import MeetupFilter from "../components/MeetUps/MeetupFilter.svelte";
  import EditMeetUp from "../components/MeetUps/EditMeetUp.svelte";
  import Button from "../components/UI/Button.svelte";
  import Error from "../components/UI/Error.svelte";
  import Loader from "../components/UI/Loader.svelte";
  import meetups from "../store/meetups.store";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";

  export let fetchedMeetUps;
  let meetUps = [];
  let favOnly = false;
  let filteredMeetups = [];
  let unSub;
  let isLoading = false;

  let showError = false;
  let errorMessage = "";
  let editMode = "";
  let page = "";
  let editId = "";

  const dispatch = createEventDispatcher();

  onMount(() => {
    unSub = meetups.subscribe(items => (meetUps = items));
    meetups.setMeetup(fetchedMeetUps);
  });

  onDestroy(() => {
    if (unSub) {
      unSub();
    }
  });

  // async function getMeetUps() {
  //   try {
  //     isLoading = true;
  //     const res = await getMeetUpsAPI();

  //     const resHobbies = [];
  //     for (let key in res) {
  //       resHobbies.push({ ...res[key], id: key });
  //     }

  //     meetups.setMeetup(resHobbies.reverse());
  //     isLoading = false;
  //   } catch (error) {
  //     isLoading = false;
  //     showError = true;
  //     errorMessage = error.message || error;
  //     console.log("getMeetUps API", error);
  //   }
  // }

  $: filteredMeetups = favOnly
    ? meetUps.filter(itm => itm.isFavorite)
    : meetUps;

  function setFilter(event) {
    favOnly = event.detail;
  }

  function closeEditMeetup() {
    editMode = "";
    editId = "";
  }

  function showDetail(event) {
    if (event.detail) {
      page = event.detail;
    } else {
      page = "";
    }
  }
  function onAddMeetUp(event) {
    editMode = "add";
    editId = "";
  }

  function onEditMeetUp(event) {
    editMode = "edit";
    editId = event.detail;
  }
</script>

<style>
  #meetUps {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  .control {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetUps {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<svelte:head>
  <title>All Meetups</title>
</svelte:head>

{#if editMode}
  <EditMeetUp
    id={editId}
    on:submitMeetup={closeEditMeetup}
    on:close={closeEditMeetup} />
{/if}

{#if isLoading}
  <Loader />
{:else if filteredMeetups.length < 1 && !showError}
  <p transition:scale>No meetups found, you can start adding some.</p>
{:else}
  <section class="control">
    <MeetupFilter active={favOnly} on:filter={setFilter} />
    <Button on:click={onAddMeetUp}>Add Meetup</Button>
  </section>
  <section id="meetUps">
    {#each filteredMeetups as meetup, i (meetup.id)}
      <div transition:scale animate:flip={{ duration: 300 }}>
        <MeetUpItem
          on:show-detail={showDetail}
          {...meetup}
          on:edit={onEditMeetUp} />
      </div>
    {/each}
  </section>
{/if}
<Error bind:showError {errorMessage} />
