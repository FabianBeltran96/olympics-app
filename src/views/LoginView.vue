<template>
  <main>
    <article class="login">
      <img src="../assets/logo-quick.png" class="login-icon" />

      <p class="login-msg">Bienvenido, ingresa tus credenciales</p>
      <form>
        <div class="login-input">
          <label for="email">Correo Electronico</label>
          <input v-model="email" id="email" type="email" />
        </div>
        <div class="login-input">
          <label for="password">Contraseña</label>
          <input v-model="password" id="password" type="password" />
        </div>

        <button @click.prevent="iniciarSesion" class="login-btn">
          Ingresar
        </button>
      </form>
    </article>
  </main>
</template>

<script>
import axios from "axios";
import store from "../store/index.js";
export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    iniciarSesion: async function () {
      let url = `http://localhost:8000/auth/login`;
      let datosLogin = {
        email: this.email,
        password: this.password,
      };
      axios
        .post(url, datosLogin)
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);

          store.commit("estaAutenticado");

          this.$router.push({ path: "/home" });
        })
        .catch((error) => {
          if (error.response.status == "401") {
            alert("ERROR 401: Credenciales Incorrectas.");
          } else {
            alert("ERROR");
          }
        });
    },
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
main {
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  background-image: url("../assets/ciudad-background.jpg");
  background-repeat: no-repeat;
  background-size: cover;

  font-family: "Roboto", sans-serif;
}

article {
  background: rgb(255, 255, 255, 0.6);
  backdrop-filter: blur(10px) saturate(180%);

  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.login {
  width: 25rem;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &-icon {
    width: 22.5rem;
    margin: 1.25rem 0;
  }

  &-msg {
    font-size: 1.25rem;
  }

  form {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &-input {
    width: 100%;

    margin: 0.625rem 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    label {
      font-size: 14px;
      margin: 4px 0;
    }
    input {
      width: 100%;
      height: 2rem;
      padding: 0 8px 0 8px;
      border-radius: 8px;

      background: white;
      border: none;
      outline: inherit;
    }
  }

  &-btn {
    width: 12rem;
    height: 3rem;

    margin: 12px auto 0;
    border-radius: 12px;

    border: 1px solid black;
    background: #fdd402;

    font: inherit;
    cursor: pointer;
  }
}
</style>