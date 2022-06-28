<template>
  <nav>
    <router-link to="/">CODING FIGTH</router-link>
    <router-link to="/login" class="btnLogin">Entrar</router-link>
  </nav>
</template>

<style scoped>
nav {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9cccd3;
}

nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
  font-weight: bold;
  text-decoration: none;
  color: black;
}
</style>
