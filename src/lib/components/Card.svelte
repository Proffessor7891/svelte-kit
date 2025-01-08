<script lang="ts">
  export let title: string;
  export let subtitle: string;
  export let imageUrl: string = "";
  export let link: string = "";
  export let footer: string = "";
</script>

<a href={link} class="card-container">
  <article class="card">
    {#if imageUrl}
      <img src={imageUrl} alt={title} class="card-image" />
    {/if}
    <header>{title}</header>
    {#if subtitle}
      <p class="card-subtitle">{subtitle}</p>
    {/if}
    {#if footer}
      <footer>
        <p class="card-subtitle">{footer}</p>
      </footer>
    {/if}
  </article>
</a>

<style>
  .card-container {
    text-decoration: none;
    color: inherit;
  }

  .card {
    padding: 1rem;
    background: #f1b613;
    border: 1px solid #f53535;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition:
      transform 0.3s,
      box-shadow 0.3s;
    max-width: 250px;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .card-image {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 0.5rem;
  }

  .card header {
    font-size: 1rem;
    font-weight: bold;
    color: #007bff;
    display: flex;
    min-height: 95px;
    align-content: center;
    justify-content: center;
    align-items: center;
  }
  .card footer p {
    font-size: 0.8rem;
    margin: 0;
  }

  .card-subtitle {
    font-size: 0.8rem;
    color: #3f18c1;
  }
</style>
