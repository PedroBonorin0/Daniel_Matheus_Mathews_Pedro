<template>
  <div class="geral">
    <NavBar/>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
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
  font-family: sans-serif;
}

.geral {
  background: #bedadf;
  height: 100vh;
}
</style>
