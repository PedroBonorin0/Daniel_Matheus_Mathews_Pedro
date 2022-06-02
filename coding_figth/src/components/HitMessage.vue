<template>
  <div class="geral-message" :class="hit? 'hit-card' : 'miss-card'">
    <p v-if="hit">Resposta Correta!</p>
    <p v-else>Resposta Errada!</p>
  </div>
</template>

<script>
export default {
  props: {
    hit: { type: Boolean, required: true },
  },
};
</script>

<style scoped>
.geral-message {
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

.hit-card {
  background-color: #76c976;
  border-color: #336833;
}

.miss-card {
  background-color: #d36060;
  border-color: #923838;
}
</style>
