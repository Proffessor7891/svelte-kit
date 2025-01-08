<script lang="ts">
  import GridContainer from "$lib/components/GridContainer.svelte";
  import Card from "$lib/components/Card.svelte";
  import type { Episode } from "$lib/models/Episode.type";
  import { formatDate } from "$lib/utils/formatDate";

  export let data: {
    episode: Episode;
  };
</script>

{#if data.episode}
  <h1 class="page-title">{data.episode.name}</h1>
  <p class="details"><strong>Air Date:</strong> {data.episode.air_date}</p>
  <p class="details"><strong>Episode:</strong> {data.episode.episode}</p>

  {#if data.episode.characters && data.episode.characters.length > 0}
    <GridContainer title="Characters">
      {#each data.episode.characters as character (character.id)}
        <Card
          title={character.name}
          imageUrl={character.image}
          subtitle={`Gender: ${character.gender}`}
          link={`/character/${character.id}`}
          footer={`Created: ${formatDate(character.created)}`}
        />
      {/each}
    </GridContainer>
  {:else}
    <p class="no-characters">No characters available for this episode.</p>
  {/if}
{:else}
  <p class="loading">Loading episode data...</p>
{/if}

<style>
  .page-title {
    margin-top: 1rem;
    text-align: center;
    font-size: 2rem;
    color: #3721db;
  }

  .details {
    text-align: center;
    font-size: 1.1rem;
    color: #3022b1;
    margin: 0.5rem 0;
  }

  .loading {
    text-align: center;
    font-size: 1.2rem;
    color: #1de141;
  }

  .no-characters {
    text-align: center;
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #555;
  }
</style>
