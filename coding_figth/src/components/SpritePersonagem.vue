<template>
  <div class="content">
    <img
      v-if="personagem === 'player' && vivo"
      src="../assets/img/playerIdle.png" alt="personagemVivo">
    <img
      v-else-if="personagem === 'player' && !vivo"
      src="../assets/img/playerDead.png" alt="personagemMorto">
    <img
      v-else-if="personagem === 'enemy' && vivo"
      src="../assets/img/enemyIdle.png" alt="inimigoVivo">
    <img
      v-else
      src="../assets/img/enemyDead.png" alt="inimigoMorto">
    <span class="vidaPersonagem">HP: {{ hp }}</span>
    </div>
</template>

<script>
export default {
  name: 'SpritePersonagem',
  props: {
    personagem: { type: String, required: true },
    vivo: { type: Boolean, required: true },
    hp: { type: Number, required: true },
  },
};
</script>

<style scoped>
.content {
  display: inline;
  margin: 0 10rem;
}

img {
  width: 160px;
  max-height: 300px;
  display: inline;
}

span {
  width: 50px;
  font-weight: bold;
}
</style>
