<template>
  <section class="container details">
    <a href="#" @click.prevent="$router.go(-1)">&#10094;&nbsp;Back</a>
    <div class="details-container" v-if="detailPokemonData">
      <img
        :src="
          detailPokemonData.details.sprites.other['official-artwork']
            .front_default
        "
        :alt="detailPokemonData.name"
        class="details-image"
      />
      <div class="details-body">
        <h2 class="title font--capitalize" v-text="detailPokemonData.name" />
        <span>
          Height:
          <span class="font--bold"
            >{{ detailPokemonData.details.height }} m</span
          >
        </span>
        <span>
          Weight:
          <span class="font--bold"
            >{{ detailPokemonData.details.weight }} kg</span
          >
        </span>
        <p>
          Abilities:
          <template
            v-if="
              detailPokemonData.details &&
              detailPokemonData.details.abilities.length > 0
            "
          >
            <span
              class="tag tag-blue font--capitalize"
              v-for="(item, index) in detailPokemonData.details.abilities"
              :key="index"
            >
              {{ item.ability.name }}
            </span>
          </template>
        </p>
      </div>
    </div>
    <p v-else>Something went wrong! Please try again later.</p>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "Detail",
  data() {
    return {
      pId: this.$route.params.id,
    };
  },
  created() {
    if (this.pokemonData.length === 0) {
      this.getPokemonDetailData({ pokemon: this.pId, isDetailPage: true });
    }
  },
  computed: {
    ...mapState({
      pokemonData: (state) => state.data,
      dataDetails: (state) => state.specificDataDetails,
    }),
    detailPokemonData() {
      return this.pokemonData.length == 0 && this.dataDetails.length > 0
        ? this.dataDetails[0]
        : this.pokemonData.length > 0 && this.dataDetails.length == 0
        ? this.pokemonData.find((pokemon) => pokemon.id == this.pId)
        : null;
    },
  },
  methods: {
    ...mapActions(["getPokemonDetailData"]),
    ...mapMutations(["clearData"]),
  },
  destroyed() {
    this.clearData("detail");
  },
};
</script>
