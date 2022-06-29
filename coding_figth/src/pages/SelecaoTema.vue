<template>
  <div class="tema">
    <img src="../assets/img/logo.png" alt="Coding Fight">
    <BaseCard class="menu-options">
      <div class="button">
        <BaseButton :link="true" to="/game">Introdução</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/game">Noções de uma Linguagem de Programação</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/game">Funções</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/game">Estruturas de Controle Condicional</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/game">Estruturas de Controle de Repetição</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/game">Estruturas de Dados Homogêneas</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/game">Estruturas de Dados Heterogêneas</BaseButton>
      </div>
    </BaseCard>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'SelecaoTema',
};
</script>

<style scoped>
.home {
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home img {
  width: 18rem;
}

.menu-options {
  display: grid;
  margin: 0 auto;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 70px;
  width: 1000px;
  height: 350px;
}

.button {
  margin: 2rem;
}
</style>