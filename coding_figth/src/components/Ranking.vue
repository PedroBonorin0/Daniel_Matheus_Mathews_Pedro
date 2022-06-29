<template>
  <div class="ranking-information"></div>
</template>

<script>
/*
<div class="ranking-information" :class="hit? 'hit-card' : 'miss-card'">
  <p v-if="hit">Resposta Correta!</p>
  <p v-else>Resposta Errada!</p>
</div>
*/
export default {
  props: {
    hit: { type: Boolean, required: true },
  },
};
</script>

<style scoped>
.ranking-information {
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  width: 500px;
  margin: 20px auto;
  padding: 0 8px;
  min-height: 30px;
  font-size: 20px;
  border-radius: 8px;
}
</style>
