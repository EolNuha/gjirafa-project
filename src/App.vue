<template>
  <NavBar></NavBar>
  <router-view />
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: {
    NavBar,
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "Gjirafa Project";
      },
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/setup/variables.scss";
@import "@/styles/basics/base.scss";
@import "@/styles/setup/typography.scss";
@import "@/styles/setup/buttons.scss";
</style>
