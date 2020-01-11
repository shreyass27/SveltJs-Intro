<script>
  import meetups from "../../store/meetups.store";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { editMeetUpsAPI } from "../../helper/api.service";
  import Error from "../UI/Error.svelte";

  export let id;
  export let title;
  export let subTitle;
  export let description;
  export let imageUrl;
  export let address;
  export let contactEmail;
  export let isFavorite = false;

  let showError = false;
  let errorMessage = "";

  const dispatch = createEventDispatcher();

  async function toggleFavorite() {
    try {
      await editMeetUpsAPI({
        isFavorite: !isFavorite,
        id
      });
      meetups.toggleFavorite(id);
    } catch (error) {
      showError = true;
      errorMessage = error.message || error;
    }
  }

  function onShowDetail() {
    dispatch("show-detail", id);
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }

  .isFavorite {
    font-style: italic;
  }
</style>

<article transition:scale>
  <header>
    <h1 class:isFavorite>
      {title}
      {#if isFavorite}
        <Badge>Favourite</Badge>
      {/if}
    </h1>
    <h2>{subTitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button mode="outline" on:click={() => dispatch('edit', id)}>Edit</Button>
    <Button href="mailTo:{contactEmail}">Contact</Button>
    <Button
      mode="outline"
      color={isFavorite ? '' : 'success'}
      on:click={toggleFavorite}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </Button>
    <Button href="/meetups/{id}">Show Details</Button>
  </footer>
</article>
<Error bind:showError {errorMessage} />
