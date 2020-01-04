<script>
  import { createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";

  export let id;
  export let title;
  export let subTitle;
  export let description;
  export let imageUrl;
  export let address;
  export let contactEmail;
  export let isFavorite = false;

  const dispatch = createEventDispatcher();

  function addFavorite() {
    dispatch("togglefavorite", {
      id,
      title
    });
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

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
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
    font-weight: 700;
    font-style: italic;
  }
</style>

<article>
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
    <Button href="mailTo:{contactEmail}">Contact</Button>

    <Button
      mode="outline"
      color={isFavorite ? '' : 'success'}
      on:click={addFavorite}>
      {isFavorite ? 'Unfavorite' : 'Favorite'}
    </Button>
    <Button>Show Details</Button>
  </footer>
</article>
