<template>
  <nav class="nav">
    <img src="../assets/logo-quick.png" class="nav-icon" />
    <div class="nav-tabs">
      <router-link to="/athletes">
        <i class="fa-solid fa-ranking-star"></i>
        Atletas
      </router-link>
      <router-link to="/medals">
        <i class="fa-solid fa-medal"></i>
        Medallas
      </router-link>
    </div>
    <h3>{{tipoUsuario}}</h3>
    <div @click="cerrarSesion" class="nav-logout">
      <i class="fa-solid fa-right-from-bracket"></i>
      <p>Cerrar Sesión</p>
    </div>
  </nav>
</template>

<script>
import store from "../store/index.js";
import jwt_decode from "jwt-decode";
export default {
  name: "NavComponent",

  data: function () {
    return {
      tipoUsuario: "",
    };
  },

  methods: {
    cerrarSesion() {
      localStorage.setItem("token", "");
      store.commit("estaAutenticado");
      this.$router.push({ path: "/login" });
    },
  },

  created() {
    let token = localStorage.getItem("token");
    let decode = jwt_decode(token);
    this.tipoUsuario = decode.usertype;
  },
};
</script>

<style scoped lang="scss">
.nav {
  max-width: 100vw;
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

    padding: 0.25rem 0.5rem;
    border-radius: 6px;

    background: rgb(240, 201, 2, 0.5);

    cursor: pointer;

    i {
      margin: 0 8px;
    }
  }
}
</style>