<template>
  <div class="geral-endgame">
    <h1 class="mensagem">{{mensagem}}</h1>
    <div class="botoes">
      <div>
        <BaseButton :link="true" to="/">Menu</BaseButton>
      </div>
      <div>
        <BaseButton :link="true" to="/ranking">Ranking Geral</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'EndGame',
  data() {
    return {
      playerhp: 0,
      inimigohp: 0,
      mensagem: '',
    };
  },
  mounted() {
    this.playerhp = this.$route.params.hp;
    this.inimigohp = this.$route.params.hpinimigo;
    if (this.playerhp > 0) {
      this.mensagem = 'Você venceu, parabéns!';
    } else {
      this.mensagem = 'Você perdeu, tente novamente!';
    }

    if (!this.userLogado.jaJogou) {
      this.userLogado.jaJogou = true;
      const res = window.confirm('Deseja que sua pontuação fique disponível no Ranking Geral?');

      if (res) {
        this.userLogado.exibeRanking = true;
      }
      this.updateUser(this.userLogado);
    }
  },
  methods: {
    ...mapActions(['updateUser']),
  },
  computed: {
    ...mapGetters(['userLogado']),
  },
};
</script>

<style scoped>
.geral-endgame {
  display: flex;
  flex-direction: column;
  text-align: center;

  gap: 5em;
  width: 100%;
  margin: 200px auto;
}
.botoes {
  display: flex;
  gap: 1em;
  flex-direction: column;
  justify-content: space-around;
}
</style>
