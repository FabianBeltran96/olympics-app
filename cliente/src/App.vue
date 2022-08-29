<template>
  <nav-component v-if="this.$store.getters.getEstaLogeado" />
  <router-view />
</template>
<script>
import NavComponent from "@/components/NavComponent.vue";

export default {
  components: {
    NavComponent,
  },

  created() {
    if (this.$store.getters.getEstaLogeado) {
      this.$router.push({ path: "/home" });
    } else {
      this.$router.push({ path: "/login" });
    }
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
</style>
