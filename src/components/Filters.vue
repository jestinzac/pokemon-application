<template>
  <div class="filters">
    <span class="input-wrapper input-name">
      <input
        type="text"
        name="name"
        placeholder="Filter by name"
        tabindex="1"
        aria-label="Filter by pokemon name"
        v-model="filterByName"
        @input="emitData"
      />
      <span
        class="close"
        v-if="filterByName !== ''"
        @click.prevent="clearInput('n')"
        >&#10006;</span
      >
    </span>
    <span class="input-wrapper input-powers">
      <input
        type="text"
        name="ability"
        placeholder="Filter by abilities"
        tabindex="2"
        aria-label="Filter by pokemon abilities"
        v-model="filterByAbilities"
        @input="emitData"
      />
      <span
        class="close"
        v-if="filterByAbilities !== ''"
        @click.prevent="clearInput('a')"
        >&#10006;</span
      >
    </span>
    <div>
      Sort by:
      <select
        tabindex="3"
        aria-label="Sort results by"
        v-model="sortBy"
        @change="emitData"
      >
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
      </select>
    </div>
    <div>
      Sort order:
      <select
        tabindex="3"
        aria-label="Sort results order by"
        v-model="sortOrderBy"
        @change="emitData"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Decending</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "Filters",
  data() {
    return {
      filterByName: this.$route.query.name || "",
      filterByAbilities: this.$route.query.abilities || "",
      sortBy: this.$route.query.sort || "name",
      sortOrderBy: this.$route.query.order || "asc",
      onLoadEmitInvoked: false, //handling navigation duplication hack flag
    };
  },
  created() {
    if (
      this.$route.query &&
      Object.keys(this.$route.query).length > 1 &&
      Object.getPrototypeOf(this.$route.query) === Object.prototype
    ) {
      this.onLoadEmitInvoked = true;
      this.emitData();
    }
  },
  methods: {
    emitData() {
      let _fs = {
        filterByName: this.filterByName,
        filterByAbilities: this.filterByAbilities,
        sortBy: this.sortBy,
        sortOrderBy: this.sortOrderBy,
      };
      if (!this.onLoadEmitInvoked) this.generateQueryLink();
      if (this.onLoadEmitInvoked) this.onLoadEmitInvoked = false;
      this.$emit("f_s", _fs);
    },
    clearInput(type) {
      if (type === "a") {
        this.filterByAbilities = "";
      }
      if (type === "n") {
        this.filterByName = "";
      }
      this.emitData();
    },
    generateQueryLink() {
      this.$router.replace({
        path: "pokemon-landing",
        query: {
          name: this.filterByName,
          abilities: this.filterByAbilities,
          sort: this.sortBy,
          order: this.sortOrderBy,
        },
      });
    },
  },
};
</script>
