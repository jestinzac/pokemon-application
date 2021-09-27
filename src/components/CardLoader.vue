<template>
  <div class="card-loader-container">
    <div
      class="card-loader-wrapper"
      v-for="index in numberOfLoaders"
      :key="index"
    >
      <div class="card-loader card-loader--tabs"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardLoader",
  computed: {
    numberOfLoaders() {
      return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
        ? 1
        : 3;
    },
  },
};
</script>
