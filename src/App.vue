<template>
  <div id="pokemon-app">
    <header>
      <h1>Pokemon Application</h1>
    </header>
    <router-view />
    <footer>
      <div class="copyright-text">&#169; Pokemon application</div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "Pokemon",
};
</script>
