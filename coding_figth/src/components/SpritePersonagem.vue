<template>
  <div class="content">
      <img
        v-if="personagem === 'player' && hp > 0 && !attack"
        src="../assets/img/playerParado.png" alt="personagemVivo">
      <img
        v-if="personagem === 'enemy' && hp > 0  && !attack"
        src="../assets/img/inimigoParado.png" alt="inimigoVivo">
      <img
        v-if="personagem === 'enemy' && hp < 0"
        src="../assets/img/inimigoMorto.png" alt="inimigoMorto">
      <img
        v-if="personagem === 'player' && hp < 0"
        src="../assets/img/playerMorto.png" alt="personagemMorto">
      <img
        v-if="personagem === 'player' && hp > 0 && status && !attack"
        src="../assets/img/playerCorrendo.png" alt="personagemCorrendo">
      <img
        v-if="personagem === 'enemy' && hp > 0 && status && !attack"
        src="../assets/img/inimigoCorrendo.png" alt="inimigoCorrendo">
      <transition name="player">
      <img
        v-if="personagem === 'player' && hp > 0 && attack"
        src="../assets/img/playerAtaque.png" alt="personagemAtaque">
      </transition>
      <transition name="enemy">
      <img
        v-if="personagem === 'enemy' && hp > 0 && attack"
        src="../assets/img/inimigoAtaque.png" alt="inimigoAtaque">
      </transition>
    <span class="vidaPersonagem">HP: {{ hp }}</span>
    </div>
</template>

<script>
export default {
  name: 'SpritePersonagem',
  props: {
    personagem: { type: String, required: true },
    hp: { type: Number, required: true },
    attack: {type: Boolean, required: true},
    status: {type: Boolean, required: true},
  },

  data(){
    playerAparece: false;
    enemyAparece: false;
  },
};

function animaSprite(img){
  if(this.personagem === 'player' && this.hp > 0 && !this.attack){
    document.getElementById(img).src = "../assets/img/ldle_000.png";
  }
}

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

.player-enter-active, .player-leave-active{
  transition: transform .4s;
}

.player-enter, .player-leave-to{
  transform: translateX(300%);
}

.player-leave, .player-enter-to{
  transform: translateX(0);
}

.enemy-enter-active, .enemy-leave-active{
  transition: transform .4s;
}

.enemy-enter, .enemy-leave-to{
  transform: translateX(-400%);
}

.enemy-leave, .enemy-enter-to{
  transform: translateX(0);
}

</style>
