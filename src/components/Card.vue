<template>
  <div class="card-container">
    <Pagination />
    <ul class="card-list">
      <CardItem
        v-for="(pokemon, index) in pokemonData"
        :key="pokemon.id"
        :id="`item-${index}`"
        :tabindex="listTabIndexStart + index"
        :pokemon="pokemon"
      />
    </ul>
    <Pagination class="bottom" />
  </div>
</template>

<script>
import CardItem from "@/components/CardItem.vue";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Card",
  components: {
    CardItem,
    Pagination,
  },
  data() {
    return {
      listTabIndexStart: 7,
    };
  },
  props: {
    pokemonData: {
      type: Array,
      required: true,
    },
  },
};
</script>
