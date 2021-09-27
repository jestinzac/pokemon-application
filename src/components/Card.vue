<template>
  <div class="card-container">
    <card-loader v-if="loading" />
    <template v-if="!loading && pokemonData.length > 0">
      <pagination />
      <ul class="card-list">
        <card-item
          v-for="(pokemon, index) in pokemonData"
          :key="pokemon.id"
          :id="`item-${index}`"
          :tabindex="listTabIndexStart + index"
          :pokemon="pokemon"
        />
      </ul>
      <pagination class="bottom" />
    </template>
    <template v-if="!loading && pokemonData.length == 0">
      <strong>No records found!</strong>
    </template>
  </div>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import Pagination from "@/components/Pagination.vue";
import CardLoader from "@/components/CardLoader.vue";

export default {
  name: "Card",
  components: {
    CardItem,
    Pagination,
    CardLoader,
  },
  data() {
    return {
      listTabIndexStart: 7,
    };
  },
  props: {
    loading: {
      type: Boolean,
    },
    pokemonData: {
      type: Array,
      required: true,
    },
  },
};
</script>
