<template>
  <div class="pagination">
    <select
      class="count width-xs"
      tabindex="4"
      aria-label="Results per page option"
      @change="onChangeEvent($event)"
    >
      <option
        v-for="(number, index) in perPageCounts"
        :key="index"
        :value="number"
        :selected="userAction.pagination.perPageCount === number"
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
import { mapState } from "vuex";
import { constants } from "@/lib/CONSTANTS.js";

export default {
  name: "Pagination",
  data() {
    return {
      perPageCounts: constants.perPageCount,
    };
  },
  computed: {
    ...mapState({
      userAction: (state) => state.userAction,
    }),
  },
};
</script>
