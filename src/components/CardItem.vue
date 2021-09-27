<template>
  <li @click.prevent="goToDetail(pokemon.id)">
    <img
      :src="`${pokemon.details.sprites.other['official-artwork'].front_default}`"
      :alt="pokemon.name"
      class="card-list__img"
    />
    <div class="card-list__body">
      <h2 class="title font--capitalize" v-text="pokemon.name" />
      <span>
        Height:
        <span class="font--bold">{{ pokemon.details.height }} m</span>
      </span>
      <span>
        Weight:
        <span class="font--bold">{{ pokemon.details.weight }} kg</span>
      </span>
      <p>
        Abilities:
        <template
          v-if="pokemon.details && pokemon.details.abilities.length > 0"
        >
          <span
            class="tag tag-blue font--capitalize"
            v-for="(item, index) in pokemon.details.abilities"
            :key="index"
          >
            {{ item.ability.name }}
          </span>
        </template>
      </p>
    </div>
  </li>
</template>

<script>
export default {
  name: "CardItem",
  props: {
    pokemon: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToDetail(pId) {
      this.$router.push({ name: "pokemon-detail", params: { id: pId } });
    },
  },
};
</script>
