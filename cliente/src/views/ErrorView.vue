<template>
  <div class="container">
    <i class="icon fa-solid fa-triangle-exclamation"></i>
    <h1>la página está en mantenimiento</h1>
  </div>
</template>

<script>
export default {};
</script>

<style>
.container {
  width: 100vw;
  height: calc(100vh - 7rem);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-transform: uppercase;
  font-family: "Roboto", sans-serif;
}

.icon {
  margin: 0 0 2rem;
  font-size: 12rem;
  color: red;
}
</style>