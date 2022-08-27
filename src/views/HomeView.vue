<template>
  <div class="home">
    <nav class="nav">
      <img src="../assets/logo-quick.png" class="nav-icon" />
      <div class="nav-tabs">
        <router-link to="/">
          <i class="fa-solid fa-ranking-star"></i>
          Atletas
        </router-link>

        <router-link to="/about">
          <i class="fa-solid fa-medal"></i>
          Medallas
        </router-link>
      </div>
      <div @click="cerrarSesion" class="nav-logout">
        <i class="fa-solid fa-right-from-bracket"></i>
        <p>Cerrar Sesión</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  props: {},
  methods: {
    cerrarSesion() {
      localStorage.setItem("token", "");
      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style scoped lang="scss">
.nav {
  max-width: 100%;
  height: 3rem;

  padding: 1rem;

  font-size: 18px;
  font-family: "Roboto", sans-serif;

  display: flex;
  justify-content: space-between;
  align-items: center;

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  &-icon {
    width: 6rem;
  }

  &-tabs {
    a {
      margin: 0 8px;
      color: inherit; /* blue colors for links too */
      text-decoration: inherit; /* no underline */
    }
  }

  &-logout {
    width: 9rem;
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    i {
      margin: 0 8px;
    }
  }
}
</style>