<script lang="ts">
  export let title: string;
</script>

<section class="grid-container">
  {#if title}
    <h2>{title}</h2>
  {/if}
  <div class="grid">
    <slot></slot>
  </div>
</section>

<style>
  .grid-container {
    margin-top: 2rem;
  }

  .grid-container h2 {
    text-align: center;
    color: #333;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
  }
</style>
