<template>
  <nav>
    <router-link to="/">CODING FIGTH</router-link>
    <router-link to="/login" class="btnLogin" v-if="!isAuthenticated">Entrar</router-link>
    <router-link to="/login" class="btnLogin" @click="logout" v-else>Logout</router-link>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout']),
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
};
</script>

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
