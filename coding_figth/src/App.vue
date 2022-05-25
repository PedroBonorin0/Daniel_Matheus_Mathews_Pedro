<template>
  <div class="geral">
    <nav>
      <div class="logo-esq divisao-nav">
        LOGO
      </div>
      <div class="btn-dir divisao-nav">
        <button class="btn-cadastro" @click="handleCadastro">Cadastrar</button>
        <button class="btn-entrar" @click="handleEntrar">Entrar</button>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  methods: {
    handleCadastro() {
      console.log('CADASTRO');
    },
    handleEntrar() {
      console.log('ENTRAR');
    },
  },
  computed: {
    ...mapGetters(['jogadores']),
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}

.geral {
  background: #bedadf;
  height: 100vh;
}

nav {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav button {
  width: 80px;
  height: 30px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s;
}

nav button:hover {
  text-decoration: underline;
  transform: translateY(-5px);
}

.btn-cadastro {
  color: #341484;
  background: none;
}

.btn-entrar {
  color: #341484;
}

nav .divisao-nav {
  margin: 0 20rem;
}

</style>
