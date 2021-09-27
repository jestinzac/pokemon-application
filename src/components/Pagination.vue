<template>
  <div class="pagination">
    <select
      class="count width-xs"
      tabindex="4"
      aria-label="Results per page option"
      v-model="getPageCount"
      @change="onChangeEvent($event)"
    >
      <option
        v-for="(number, index) in perPageCountList"
        :key="index"
        :value="number"
      >
        {{ number }}
      </option>
    </select>
    cards per page
    <button
      class="prev width-xs"
      tabindex="5"
      aria-label="Go to previous page"
      :disabled="userAction.pagination.page === 1"
      @click.prevent="paginate('p')"
    >
      &#10094; Prev
    </button>
    <button
      class="next width-xs"
      tabindex="6"
      aria-label="Go to next page"
      @click.prevent="paginate('n')"
    >
      Next &#10095;
    </button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { constants } from "@/lib/CONSTANTS.js";

export default {
  name: "Pagination",
  data() {
    return {
      perPageCount: "",
      perPageCountList: constants.perPageCount,
    };
  },
  computed: {
    ...mapState({
      userAction: (state) => state.userAction,
    }),
    getPageCount: {
      get() {
        return this.userAction.pagination.perPageCount;
      },
      set(newValue) {
        this.perPageCount = newValue;
      },
    },
  },
  methods: {
    ...mapActions(["getPaginatedPokemonData"]),
    ...mapMutations(["setPerPageCount", "setPageAndOffset"]),
    onChangeEvent(e) {
      this.setPerPageCount(parseInt(e.target.value));
      this.getPaginatedPokemonData(true);
    },
    paginate(type) {
      this.setPageAndOffset(type);
      this.getPaginatedPokemonData(true);
    },
  },
};
</script>
