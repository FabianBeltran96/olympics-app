<template>
  <div class="home">
    <h1>Bienvenido</h1>
  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
export default {
  name: "HomeView",
  components: {},
  props: {},

  created() {
    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);

    if (decode.usertype === "admin") {
      this.$router.push({ path: "/athletes" });
    } else {
      this.$router.push({ path: "/error" });
    }
  },
};
</script>

<style scoped lang="scss">
</style>