<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import MeetUpItem from "./MeetUpItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";
  import meetups from "./meetups.store";

  let favOnly = false;
  let meetUps = [];
  let filteredMeetups = [];
  let unSub;

  const dispatch = createEventDispatcher();

  onMount(() => {
    unSub = meetups.subscribe(items => (meetUps = items));
  });

  onDestroy(() => {
    if (unSub) {
      unSub();
    }
  });

  $: filteredMeetups = favOnly
    ? meetUps.filter(itm => itm.isFavorite)
    : meetUps;

  function setFilter(event) {
    favOnly = event.detail;
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

<section class="control">
  <MeetupFilter active={favOnly} on:filter={setFilter} />
  <Button on:click={() => dispatch('add-meetup')}>Add Meetup</Button>
</section>
<section id="meetUps">
  {#each filteredMeetups as meetup, i (meetup.id)}
    <MeetUpItem on:show-detail {...meetup} on:edit />
  {/each}
</section>
