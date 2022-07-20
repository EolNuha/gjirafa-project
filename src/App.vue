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
        document.title = to.meta.title || "Some Default Title";
      },
    },
  },
};
</script>

<style lang="scss">
@import "@/styles/setup/variables.scss";
@import "@/styles/setup/typography.scss";
@import "@/styles/basics/base.scss";
</style>
