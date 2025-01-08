<script>
  export let data;
</script>

<h1 class="page-title">Seasons</h1>
<div class="season-grid">
  {#if data.seasons}
    {#each Object.entries(data.seasons) as [seasonNumber, episodes]}
      <div class="season-card">
        <h2 class="season-title">Season {seasonNumber}</h2>
        <p class="season-episodes">{episodes.length} Episodes</p>
        <a href={"/season/" + seasonNumber} class="btn">View Season</a>
      </div>
    {/each}
  {:else}
    <p class="no-seasons">No seasons available.</p>
  {/if}
</div>

<style>
  .page-title {
    text-align: center;
    margin-top: 2rem;
    font-size: 2rem;
    font-weight: bold;
    color: #333;
  }

  .season-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem auto;
    max-width: 1200px;
    padding: 0 1rem;
  }

  .season-card {
    padding: 1.5rem;
    background: linear-gradient(135deg, #f9f9f9, #eaeaea);
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s,
      box-shadow 0.3s;
  }

  .season-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  .season-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .season-episodes {
    font-size: 1rem;
    color: #555;
    margin-bottom: 1rem;
  }

  .btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #d0ff00;
    color: #fa0606;
    text-decoration: none;
    border-radius: 6px;
    font-weight: bold;
    transition:
      background-color 0.3s,
      transform 0.2s;
  }

  .btn:hover {
    background-color: #fc9904;
    transform: scale(1.05);
  }

  .no-seasons {
    text-align: center;
    color: #777;
    font-size: 1.2rem;
    margin-top: 2rem;
  }

  @media (max-width: 768px) {
    .season-card {
      padding: 1rem;
    }

    .season-title {
      font-size: 1.25rem;
    }

    .season-episodes {
      font-size: 0.9rem;
    }

    .btn {
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
    }
  }
</style>
