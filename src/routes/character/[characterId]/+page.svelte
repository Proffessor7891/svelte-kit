<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import GridContainer from '$lib/components/GridContainer.svelte';
  import { formatDate } from '$lib/utils/formatDate';

  export let data;
</script>

<div class="character-header">
  <img src={data.character.image} alt={data.character.name} />
  <div class="character-info">
    <h1>{data.character.name}</h1>
    <p><strong>Status:</strong> {data.character.status}</p>
    <p><strong>Species:</strong> {data.character.species}</p>
    <p><strong>Gender:</strong> {data.character.gender}</p>
  </div>
</div>

<GridContainer title="Episodes">
  {#each data.character.episode as ep}
    <Card
      title={ep.name}
      subtitle={ep.episode}
      footer={`created: ${formatDate(ep.created)}`}
      link={`/episode/${ep.id}`}
    />
  {/each}
</GridContainer>

<style>
  .character-header {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 2rem;
  }

  .character-header img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
  }

  .character-info h1 {
    font-size: 1.5rem;
    color: #333;
  }

  .character-info p {
    color: #555;
  }
</style>
