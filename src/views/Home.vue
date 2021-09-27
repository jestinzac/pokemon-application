<template>
  <section class="container">
    <div class="wrapper">
      <Filters @f_s="filterSortData" />
      <Card :pokemonData="pokemonDataResults" />
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
  data() {
    return {
      filter: {
        isFilterEnabled: false,
        filterByName: "",
        filterByAbilities: "",
        sortBy: "name",
        sortOrderBy: "asc",
      },
    };
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
    pokemonDataResults() {
      let filteredDataSet;
      //Filter by Name
      filteredDataSet = [...this.pokemonData].filter((pokemon) => {
        return (
          pokemon.name
            .toLowerCase()
            .indexOf(this.filter.filterByName.toLowerCase()) > -1
        );
      });
      //Filter by Abilities
      filteredDataSet = filteredDataSet.filter((pokemon) => {
        return pokemon.details.abilities.some((c) => {
          return (
            c.ability.name
              .toLowerCase()
              .indexOf(this.filter.filterByAbilities.toLowerCase()) > -1
          );
        });
      });
      //Sorting final set
      if (filteredDataSet.length > 1) {
        filteredDataSet =
          this.filter.sortOrderBy === "desc"
            ? filteredDataSet.sort(this.sortItemsBy.bind(this)).reverse()
            : filteredDataSet.sort(this.sortItemsBy.bind(this));
      }

      return filteredDataSet;
    },
  },
  methods: {
    ...mapActions(["getPaginatedPokemonData"]),
    filterSortData(filters) {
      this.filter = filters;
    },
    sortItemsBy(a, b) {
      if (this.filter.sortBy == "height") {
        if (a.details.height < b.details.height) return -1;
        if (a.details.height > b.details.height) return 1;
      } else if (this.filter.sortBy == "weight") {
        if (a.details.weight < b.details.weight) return -1;
        if (a.details.weight > b.details.weight) return 1;
      } else {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
      }
      return 0; // must be equal
    },
  },
};
</script>
