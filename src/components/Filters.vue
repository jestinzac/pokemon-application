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
      <select tabindex="3" aria-label="Sort results by" v-model="sortBy">
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
};
</script>
