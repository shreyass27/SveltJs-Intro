<script>
  import Header from "./UI/Header.svelte";
  import MeetUpGrid from "./MeetUps/MeetUpGrid.svelte";
  import MeetUpDetail from "./MeetUps/MeetUpDetail.svelte";
  import EditMeetUp from "./MeetUps/EditMeetUp.svelte";

  let editMode = "";
  let page = "";
  let editId = "";

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
  main {
    margin-top: 5rem;
  }
</style>

<Header />
<main>
  {#if page}
    <MeetUpDetail id={page} on:close-details={showDetail} />
  {:else}
    {#if editMode}
      <EditMeetUp
        id={editId}
        on:submitMeetup={closeEditMeetup}
        on:close={closeEditMeetup} />
    {/if}
    <MeetUpGrid
      on:add-meetup={onAddMeetUp}
      on:show-detail={showDetail}
      on:edit={onEditMeetUp} />
  {/if}
</main>
