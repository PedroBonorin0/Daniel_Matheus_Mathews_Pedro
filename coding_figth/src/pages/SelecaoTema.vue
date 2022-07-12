<template>
  <div class="tema">
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
// import { mapGetters } from 'vuex';

export default {
  name: 'SelecaoTema',
};
</script>

<style scoped>
.tema {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
