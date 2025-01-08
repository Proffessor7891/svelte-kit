<script lang="ts">
  import { enhance } from "$app/forms";
  import GridContainer from "$lib/components/GridContainer.svelte";
  import Card from "$lib/components/Card.svelte";
  import type { SearchResults } from "./proxy+page.server.ts";

  export let form: SearchResults | null;

  let isLoading = false;

  function onSubmit() {
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
    }, 1000);
  }
</script>

<section>
  <div class="container">
    <h1>Search for Episodes and Characters</h1>
    <form method="POST" on:submit={onSubmit} use:enhance class="form_wrapper">
      <label for="query">Enter your search:</label>
      <input
        type="text"
        id="query"
        name="query"
        placeholder="Enter at least 3 characters"
        minlength="3"
        required
      />
      <button type="submit" disabled={isLoading} class="primary">
        {#if isLoading}
          Searching...
        {:else}
          Search
        {/if}
      </button>
    </form>

    {#if form?.error}
      <p class="error">{form.error}</p>
    {/if}

    {#if form?.success}
      {#if (!form.characters || form.characters.length === 0) && (!form.episodes || form.episodes.length === 0)}
        <p class="no-results">No results found.</p>
      {/if}

      {#if form?.characters && form.characters.length > 0}
        <GridContainer title="Characters">
          {#each form.characters || [] as character}
            <Card
              title={character.name}
              subtitle={`Species: ${character.species}`}
              imageUrl={character.image}
              link={`/character/${character.id}`}
            />
          {/each}
        </GridContainer>
      {/if}

      {#if form.episodes && form.episodes?.length > 0}
        <GridContainer title="Episodes">
          {#each form.episodes || [] as episode}
            <Card
              title={episode.name}
              subtitle={`Episode: ${episode.episode}`}
              link={`/episode/${episode.id}`}
            />
          {/each}
        </GridContainer>
      {/if}
    {/if}
  </div>
</section>

<style>
  h1 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .form_wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  input {
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
  }

  button {
    padding: 0.75rem 1.5rem;
    background-color: #ff4800;
    color: #201313;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button[disabled] {
    background-color: #ccc;
    cursor: not-allowed;
  }

  button:hover {
    background-color: #b37700;
  }

  .error,
  .no-results {
    text-align: center;
    color: red;
    margin-top: 1rem;
  }
</style>
