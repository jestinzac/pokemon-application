<template>
  <div class="container">
    <h1>Pokemon Application</h1>
    <section class="wrapper">
      <Filters />
      <Card />
    </section>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Filters from "@/components/Filters.vue";

export default {
  name: "Home",
  components: {
    Card,
    Filters,
  },
};
</script>
