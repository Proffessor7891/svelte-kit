<script lang="ts">
  import Card from "$lib/components/Card.svelte";
  import GridContainer from "$lib/components/GridContainer.svelte";
  import type { Character } from "$lib/models/Character.type";
  import type { Episode } from "$lib/models/Episode.type";

  export let data: {
    episodes: Episode[];
    characters: Character[];
  };
</script>

<h1 class="page-title">Season {data.episodes[0]?.episode.split("E")[0]}</h1>

<GridContainer title="Episodes">
  {#each data.episodes as episode}
    <Card
      title={episode.name}
      subtitle={`Air Date: ${episode.air_date}`}
      link={`/episode/${episode.id}`}
    />
  {/each}
</GridContainer>

<GridContainer title="Characters">
  {#each data.characters as character}
    <Card
      title={character.name}
      subtitle={character.species}
      imageUrl={character.image}
      link={`/character/${character.id}`}
    />
  {/each}
</GridContainer>
