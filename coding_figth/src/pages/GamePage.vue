<template>
<div class="geral">
  <div class="personagens">
    <SpritePersonagem
      personagem="player"
      :vivo="true"
      :hp="playerHp"
    />
    <SpritePersonagem
      personagem="enemy"
      :vivo="true"
      :hp="enemyHp"
    />
  </div>
  <div class="conteudo">
    <div class="questao">
      Questao: {{desafios[this.perguntaEscolhida].id}}
    </div>

    <div class="dificuldade">
      <h1>Dificuldade: {{desafios[this.perguntaEscolhida].dificuldade}} </h1>
    </div>

    <div class="pergunta">
      <h1>Pergunta: {{desafios[this.perguntaEscolhida].pergunta}} </h1>
    </div>

    <div class="container-botoes">
      <BaseButton
        class="opcoes"
        v-for="opcao in opcoesResposta"
        :key="opcao.id"
        @click="handleResposta(opcao)">{{opcao.resposta}}</BaseButton>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import SpritePersonagem from '@/components/SpritePersonagem.vue';

export default {
  name: 'GamePage',
  // Referencia o modulo onde o desafio está (provavelmente necessitaria de alterar o store)
  modulo: undefined,
  data() {
    return {
      id: -0,
      pergunta: '',
      opcoesResposta: '',
      respostaCorreta: '',
      dica: '',

      playerHp: 100,
      enemyHp: 100,
    };
  },
  components: {
    SpritePersonagem,
  },
  created() {
    // Conta a qtd total de desafios de mesma dificuldade
    // const totalPerguntasPorDificuldades = this.desafios.filter((obj) => obj.dificuldade === this.controlaDificuldade).length;

    // Variáveis iniciais do game
    this.contaPerguntas = 1; // Serve para controlar se é a primeira questão - A primeira questão já começa sendo exibida
    this.controlaDificuldade = 1; // Serve para controlar a dificuldade da questão - A primeira questão deve ser fácil

    // Variáveis gerais
    this.totalPerguntas = this.desafios.length;	// Total de perguntas
    this.perguntasMarcadas = [];	// Array que guarda as perguntas já marcadas

    // Variáveis de controle do jogo
    this.tamanhoDesafio = 10; // Total de perguntas por desafio
    this.contaAcertos = 0; // Conta a qtd de acertos
    this.contaErros = 0; // Conta a qtd de erros

    // Inicializa e controla as exibição das perguntas
    this.gerenciaPerguntas();
  },
  methods: {

    /**
     * Verifica a resposta de acordo com o clique do usuário
     * @param {object} Opcao Recebe como parametro as informações do botão
     * pressionado, ID e conteudo
     */
    handleResposta(opcao) {
      this.contaPerguntas += 1;
      this.respostaCorreta = this.desafios[this.perguntaEscolhida].respostaCorreta;

      if (opcao.id == this.respostaCorreta) { 	// Se o usuário acertou a questão
        console.log('Acertou');
        this.contaAcertos += 1;

        // Dano no enimigo
        this.calcDano(true);

        // Gerencia a próxima pergunta
        this.gerenciaPerguntas();
      } else { // Se o usuário errou a questão
        // console.log("Errou");
        this.contaErros += 1;

        // Sofre dano
        this.calcDano(false);

        this.gerenciaPerguntas();
      }
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
          const i_aux = this.opcoesResposta[i];
          this.opcoesResposta[i] = this.opcoesResposta[aux];
          this.opcoesResposta[aux] = i_aux;
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
      if (this.desafios[this.perguntaEscolhida].dificuldade == 1) { // Facil
        if (verificador) {
          this.enemyHp -= 15;
        } else {
          this.playerHp -= 15;
        }
      } else if (this.desafios[this.perguntaEscolhida].dificuldade == 2) { // Medio
        if (verificador) {
          this.enemyHp -= 20;
        } else {
          this.playerHp -= 20;
        }
      } else { // Dificil
        if (verificador) {
          this.enemyHp -= 30;
        } else {
          this.playerHp -= 30;
        }
      }
    },

    /**
     * Controla toda a lógica por trás das questões e desafios do jogo.
     *
     */
    gerenciaPerguntas() {
      if (this.contaPerguntas <= Math.floor(this.tamanhoDesafio / 3) || this.controlaDificuldade == 1) {
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
        console.log('Desafio concluído! Todas as perguntas do desafio foram respondidas!');
        console.log(`Perguntas Marcadas: ${this.perguntasMarcadas}`);
        console.log(`Você acertou: ${this.contaAcertos}`);
        console.log(`Você errou: ${this.contaErros}`);
      }
    },

    /** Função auxiliar responsável por randomizar as perguntas e respostas.
    * Isso é feito "ignorando" as perguntas que já foram respondidas.
    */
    auxGerencia() {
      // Randomizo a pergunta até encontrar o primeiro desafio com dificuldade esperada e que ainda não tenha sido respondida
      let j = Math.floor(Math.random() * (this.desafios.length));
      while (this.desafios[j].dificuldade != this.controlaDificuldade || (this.perguntasMarcadas.includes(j))) {
        j = Math.floor(Math.random() * (this.desafios.length));
      }
      this.perguntaEscolhida = j;

      // Essa pergunta será adicionada numa lista para que não seja escolhida novamente
      this.perguntasMarcadas.push(this.perguntaEscolhida);

      // Randomiza as respostas de acordo com a pergunta
      this.shortRespostas(this.desafios[this.perguntaEscolhida].opcoesResposta);
    },
  },
  computed: {
    ...mapGetters(['desafios']),
  },
};
</script>

<style>
.conteudo{
  
  width: 100% auto;
  height: 80vh;
  background: #84d6d6;
}
.questao {
  width: 20%;
  height: auto;
  color: rgb(0, 0, 0);
  font-size: 30px;

  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  margin: 2rem auto;
  max-width: 30rem;

  display: flex;
  height: 5vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.pergunta {
  background: #84d6d6;
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
  /* text-align: center; */
  height: auto;
  font-size: 20px;
  margin: 16px;
  text-decoration: none;
  color: #84d6d6;
  padding: 20px;
  background-color: #84d6d6;
  width: auto;
  transition: 0.3s;
  cursor: pointer;
}
.opcoes:hover {
  background-color: #84d6d6;
}

.personagens {
  width: 100%;
  margin: 20px auto;
  text-align: center;
}
</style>
