<template>
  <main>
    <article class="login">
      <img src="../assets/logo-quick.png" class="login-icon" />

      <p class="login-msg">Bienvenido, ingresa tus credenciales</p>
      <form>
        <div class="login-input">
          <label for="email">Correo Electronico</label>
          <input id="email" type="email" />
        </div>
        <div class="login-input">
          <label for="password">Contraseña</label>
          <input id="password" type="password" />
        </div>

        <button class="login-btn">Ingresar</button>
      </form>
    </article>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

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