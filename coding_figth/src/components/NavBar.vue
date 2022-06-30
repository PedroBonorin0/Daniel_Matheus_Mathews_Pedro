<template>
  <nav>
    <router-link to="/"><img src="../assets/img/logo-espada.png" alt="Coding Fight"></router-link>
    <div>
      <router-link to="/login" class="btn-login" v-if="!isAuthenticated">Entrar</router-link>
      <router-link to="/login" class="btn-login" @click="logout" v-else>Logout</router-link>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  methods: {
    ...mapActions(['logout']),
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'userLogado']),
    nomeUser() {
      return this.userLogado.nome;
    },
  },
};
</script>

<style scoped>
nav {
  height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 10rem;
  justify-content: space-between;
  background-color: #9cccd3;
}

nav img {
  width: 90px;
  transform: rotateZ(-45deg);
}

nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 30px;
}

nav .btn-login {
  background: #248b8b;
  width: 80px;
  border-radius: 4px;
  text-decoration: none;
  color: white;
}
</style>
