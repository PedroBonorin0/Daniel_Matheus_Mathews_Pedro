<template>
  <div class="home">
    <h1>HOME PAGE</h1>
    <Desafio />

  </div>
</template>

<script>
import Desafio from '../components/Questoes/Desafio.vue';

export default {
  name: 'HomePage',
  components: {
    Desafio,
  },
};
</script>
