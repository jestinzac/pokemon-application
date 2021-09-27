<template>
  <section class="container">
    <div class="wrapper">
      <Filters />
      <Card :pokemonData="pokemonData" />
    </div>
  </section>
</template>

<script>
import Card from "@/components/Card.vue";
import Filters from "@/components/Filters.vue";

import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Card,
    Filters,
  },
  created() {
    this.getPaginatedPokemonData();
  },
  computed: {
    ...mapState({
      pokemonData: (state) => state.data,
      hasError: (state) => state.dataError,
      isLoading: (state) => state.isLoading,
      userAction: (state) => state.userAction,
    }),
  },
  methods: {
    ...mapActions(["getPaginatedPokemonData"]),
  },
};
</script>
