<!-- eslint-disable no-lonely-if -->
<!-- eslint-disable max-len -->
<!-- eslint-disable max-len -->
<template>
  <BaseLoading v-if="loading" />
  <div class="geral-game" v-else>
    <div class="timer"> {{ countDown }} </div>
    <div class="aviso" v-show="visibilidade"> {{ mensagemAviso }} </div>
    <div class="personagens">
      <SpritePersonagem
        personagem="player"
        :hp="playerHp"
      />
      <SpritePersonagem
        personagem="enemy"
        :hp="enemyHp"
      />
    </div>
    <HitMessage
      :style="{ visibility: visible ? 'visible' : 'hidden'}"
      :hit="playerHit"
    />
    <BaseCard :noUnderWidth="true">
      <div class="conteudo">
        <div class="pergunta">
          <h1>Desafio: </h1>
          <span> {{desafios[this.perguntaEscolhida].pergunta}} </span>
        </div>
        <div class="dica">
          <BaseButton class="Dica" @click="handleDicas()"
          :style="{visibility: dica_visibilidade ? 'hidden' : 'visible'}">Dica</BaseButton>
          <div :style="{ visibility: dica_visibilidade ? 'visible' : 'hidden'}">
            <h1>Dica: </h1>
            <span> {{desafios[this.perguntaEscolhida].dica}} </span>
          </div>
        </div>
        <div class="container-botoes">
          <BaseButton
            class="opcoes"
            v-for="opcao in opcoesResposta"
            :key="opcao.id"
            @click="handleResposta(opcao)"
          >{{opcao.resposta}}</BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SpritePersonagem from '@/components/SpritePersonagem.vue';
import HitMessage from '@/components/HitMessage.vue';

export default {
  name: 'GamePage',
  // Referencia o modulo onde o desafio está (provavelmente necessitaria de alterar o store)
  modulo: undefined,
  data() {
    return {
      loading: false,

      id: -0,
      pergunta: '',
      opcoesResposta: '',
      respostaCorreta: '',
      dica: '',

      playerHp: 100,
      enemyHp: 100,

      visible: false,
      playerHit: false,

      countDown: 60 * 3, // 3 minutos
      mensagemAviso: '',
      visibilidade: false,

      // Variáveis de controle do jogo
      tamanhoDesafio: 30, // Total de perguntas por desafio
      contaAcertos: 0, // Conta a qtd de acertos
      contaErros: 0, // Conta a qtd de erros

      dica_visibilidade: false,
      dica_cont: 0,
    };
  },
  components: {
    SpritePersonagem,
    HitMessage,
  },
  async created() {
    this.loading = true;

    await this.setDesafios();
    // Conta a qtd total de desafios de mesma dificuldade
    // const totalPerguntasPorDificuldades = this.desafios.filter((obj) => obj.dificuldade === this.controlaDificuldade).length;

    // Variáveis iniciais do game
    this.contaPerguntas = 1; // Serve para controlar se é a primeira questão - A primeira questão já começa sendo exibida
    // this.controlaDificuldade = 1; // Serve para controlar a dificuldade da questão - A primeira questão deve ser fácil

    // Variáveis gerais
    this.totalPerguntas = this.desafios.length;// Total de perguntas
    this.perguntasMarcadas = [];// Array que guarda as perguntas já marcadas

    // Variáveis de controle do jogo
    this.tamanhoDesafio = 30; // Total de perguntas por desafio
    this.contaAcertos = 0; // Conta a qtd de acertos
    this.contaErros = 0; // Conta a qtd de erros

    this.timer = 0;

    this.loading = false;

    // Inicializa e controla as exibição das perguntas
    this.gerenciaPerguntas();
  },
  methods: {
    ...mapActions(['updateUser', 'setDesafios']),
    countDownTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        if (this.countDown > 0) {
          this.countDown--;
        } else if (this.countDown <= 60 * 3 / 2){
          //clearInterval(this.timer); // Se o tempo acabar, o jogador perde
          this.visibilidade = true;
          this.mensagemAviso = 'Cuidado com o tempo esta na metade!';
        }
        if (this.countDown < 0) {
          this.playerHp = 0;
          this.countDown = 0;
          this.atualizaPontos();
          this.$router.replace(`/endgame/${this.playerHp}${this.enemyHp}`);
        }
      }, 1000);
    },

    handleDicas() {
      this.dica_visibilidade = true;
    },

    /**
     * Verifica a resposta de acordo com o clique do usuário
     * @param {object} Opcao Recebe como parametro as informações do botão
     * pressionado, ID e conteudo
     */
    handleResposta(opcao) {
      this.contaPerguntas += 1;
      this.respostaCorreta = parseInt(this.desafios[this.perguntaEscolhida].respostaCorreta, 10);
      if (opcao.id === this.respostaCorreta) { // Se o usuário acertou a questão
        this.contaAcertos += 1;

        // Dano no inimigo
        this.calcDano(true);
        this.playerHit = true;
      } else { // Se o usuário errou a questão
        this.contaErros += 1;

        // Sofre dano
        this.calcDano(false);
        this.playerHit = false;
      }

      this.visible = true;
      setTimeout(() => {
        // Gerencia a próxima pergunta
        this.exibeCorreta = false;
        this.gerenciaPerguntas();
        this.visible = false;
      }, 1500);
    },

    /**
     * Randomiza as opções de respostas
     * @param {object} Opcoes Recebe como parâmetro as opções de respostas da questão
     */
    shortRespostas(opcoes) {
      this.opcoesResposta = this.desafios[this.perguntaEscolhida].opcoesResposta;

      for (let i = 0; i < opcoes.length / 2 + 1;) {
        const aux = Math.floor(Math.random() * (opcoes.length));
        if (aux !== i) {
          const iAux = this.opcoesResposta[i];
          this.opcoesResposta[i] = this.opcoesResposta[aux];
          this.opcoesResposta[aux] = iAux;
          i++;
        }
      }
    },

    /**
    * Calcula o dano sofrido/causado de acordo com a dificuldade da questão.
    *
    * * Questão fácil:
    *
    *&emsp; ◦ &nbsp; Acertou: Inimigo sofre dano baixo.
    *
    *&emsp; ◦ &nbsp; Errou: Aluno sofre dano alto.
    *
    * * Questão Média:
    *
    *&emsp; ◦ &nbsp; Acertou: Inimigo sofre dano médio.
    *
    *&emsp; ◦ &nbsp; Errou: Aluno sofre médio.
    *
    * * Questão Difícil:
    *
    *&emsp; ◦ &nbsp; Acertou: Inimigo sofre dano alto.
    *
    *&emsp; ◦ &nbsp; Errou: Aluno sofre baixo.
    *
    * @param {boolean} Verificador se o usuario acertou a pergunta
    */
    calcDano(verificador) {
      this.dica_visibilidade = false;
      const dano_base = 10;
      if (this.desafios[this.perguntaEscolhida].dificuldade === 1) { // Fácil
        if (verificador) { // Acertou a pergunta
          this.enemyHp -= dano_base * 0.5;
        } else {
          this.playerHp -= dano_base * 1.5;
        }
      } else if (this.desafios[this.perguntaEscolhida].dificuldade === 2) { // Médio
        if (verificador) { // Acertou a pergunta
          this.enemyHp -= dano_base;
        } else {
          this.playerHp -= dano_base;
        }
      } else { // Difícil
        if (verificador) { // Acertou a pergunta
          this.enemyHp -= dano_base * 1.5;
        } else {
          this.playerHp -= dano_base * 0.5;
        }
      }

      // O Jogador perdeu
      if (this.playerHp <= 0) {
        this.playerHp = 0;
        this.countDown = 0;
        this.atualizaPontos();
        this.$router.replace(`/endgame/${this.playerHp}${this.enemyHp}`);
        this.playerHp = 100;
        this.enemyHp = 100;
      }
      // O Jogador venceu
      if (this.enemyHp <= 0) {
        this.enemyHp = 0;
        this.countDown = 0;
        this.atualizaPontos();
        this.$router.replace(`/endgame/${this.playerHp}${this.enemyHp}`);
        this.playerHp = 100;
        this.enemyHp = 100;
      }
    },

    /**
     * Controla toda a lógica por trás das questões e desafios do jogo.
     *
     */
    gerenciaPerguntas() {
      if (this.contaPerguntas > 1) {
        this.visibilidade = false;
        this.countDownTimer();
      }
<<<<<<< HEAD
      if (this.contaPerguntas > this.desafios.length) {
=======
      // console.log(this.contaPerguntas, this.desafios.length);
      if (this.contaPerguntas > this.desafios.length) {
        console.log('conta');
        this.atualizaPontos();
>>>>>>> a17dee009246f6197173b40570ac7db10eae4df9
        this.$router.replace(`/endgame/${this.playerHp}${this.enemyHp}`);
        console.log('ERRO - Não foi possível encontrar o numero de perguntas para acabar com o jogo');
        return;
      }
      this.auxGerencia();
      /* if (this.contaPerguntas <= Math.floor(this.tamanhoDesafio / 3) || this.controlaDificuldade == 1) {
        // Randomizo as perguntas e respostas
        this.auxGerencia();

        if (this.contaPerguntas == Math.floor(this.tamanhoDesafio / 3)) { // Se for a última pergunta fácil, aumenta a dificuldade
          this.controlaDificuldade = 2;
        }
      } else if (this.contaPerguntas > Math.floor(this.tamanhoDesafio / 3) && this.contaPerguntas <= 2 * Math.floor(this.tamanhoDesafio / 3) && this.controlaDificuldade == 2) {		// dificuldade média
        // Randomizo as perguntas e respostas
        this.auxGerencia();

        if (this.contaPerguntas == 2 * Math.floor(this.tamanhoDesafio / 3)) { // Se for a última pergunta média, aumenta a dificuldade
          this.controlaDificuldade = 3;
        }
      } else if (this.contaPerguntas <= this.tamanhoDesafio && this.contaPerguntas <= this.totalPerguntas) { // Se ainda não superamos o tamanho do desafio e ainda existem perguntas não respondidas
        // Randomizo as perguntas e respostas
        this.auxGerencia();
      } else { // Ao encerrar todas as questões do desafio, devemos prosseguir para uma próxima fase, conteúdo ou para tela de pontuação?
      } */
    },

    /** Função auxiliar responsável por randomizar as perguntas e respostas.
    * Isso é feito "ignorando" as perguntas que já foram respondidas.
    */
    auxGerencia() {
      // Randomizo a pergunta até encontrar o primeiro desafio com dificuldade esperada e que ainda não tenha sido respondida
      let j = Math.floor(Math.random() * (this.totalPerguntas));
      while (this.perguntasMarcadas.includes(j)) {
        j = Math.floor(Math.random() * (this.totalPerguntas));
      }
      this.perguntaEscolhida = j;

      // Essa pergunta será adicionada numa lista para que não seja escolhida novamente
      this.perguntasMarcadas.push(this.perguntaEscolhida);

      // Randomiza as respostas de acordo com a pergunta
      this.shortRespostas(this.desafios[this.perguntaEscolhida].opcoesResposta);
    },
    async atualizaPontos() {
      const user = this.userLogado;
      user.totalPontos += this.contaAcertos;
      await this.updateUser(user);
    },
  },
  mounted() {
    this.countDownTimer();
  },
  computed: {
    ...mapGetters(['desafios', 'userLogado']),
  },
};
</script>

<style>
.timer{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  padding: 0.5em;
  width: 2em;
  height: 1em;

  font-size: 1.5em;
  color: white;
  background-color: rgba(0, 0, 0, 0.76);
  border-radius: 2em;
}

.aviso{
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  padding: 0.5em;
  width: fit-content;
  height: 1em;

  font-size: 1.5em;
  color: white;
  background-color: rgba(187, 60, 60, 0.76);
  border-radius: 2em;
}

.conteudo{
  text-align: center;
  width: 100% auto;
  height: 100% auto;
  padding: 0 10rem;
}

.pergunta h1 {
  display: inline;
}

.container-botoes {
  width: 150% auto;
  margin: 0% auto;
  height: 100% auto;
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template-rows: repeat(3);
  grid-template-columns: 1fr 1fr;
}
.opcoes {
  margin: 16px;
}

.personagens {
  width: 100%;
  margin: 20px auto;
  text-align: center;
}

.res-correta {
  background: #248b3e;
}
</style>
