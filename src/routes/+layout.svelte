<script>
  import { client } from "$lib/graphql/client";
  import { setContextClient } from "@urql/svelte";

  setContextClient(client);
</script>

<header>
  <div class="grid">
    <nav class="overflow-auto">
      <a href="/">Home</a>
      <a href="/search">Search</a>
    </nav>
  </div>
</header>

<main class="container-fluid">
  <slot />
</main>

<footer>
  <small>footer</small>
</footer>

<style>
  header,
  footer {
    text-align: center;
    margin: 1rem;
  }
  a{
    text-decoration: none;
   color: rgb(252, 33, 4);
  }
  footer {
    width: 100%;
    text-align: center;
    bottom: 0;
  }
  main {
    margin: 2rem auto;
  }
</style>
