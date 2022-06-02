<template>
  <div class="geral-endgame">
    <h1>FIM DE JOGO!</h1>
    <div>
      <BaseButton :link="true" to="/">Menu</BaseButton>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EndGame',
};
</script>

<style scoped>
.geral-endgame {
  text-align: center;
  width: 100%;
  margin: 200px auto;
}
</style>
