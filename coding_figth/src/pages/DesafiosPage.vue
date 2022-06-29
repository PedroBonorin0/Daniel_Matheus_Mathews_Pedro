<template>
  <div id="geral-desafios">
    <div class="add-desafio">
      <BaseButton @click="criandoDesafio = true">Criar Desafio</BaseButton>
    </div>
    <BaseDialog :show="criandoDesafio" title="Criar Novo Desafio">
      <form @submit.prevent="criaDesafio">
        <div class="linha-input">
            <label for="conteudo">
                Conteúdo <br>
                <select id="conteudo" v-model="conteudo">
                    <option v-for="conteudo in conteudos" :key="conteudo.id"
                    :value="conteudo.id">{{ conteudo.nome }}</option>
                </select>
            </label>
        </div>
        <div class="linha-input">
            <label for="pergunta">
                Pergunta do Desafio <br>
                <input
                    type="text" id="desafio" placeholder="Digite a pergunta do desafio"
                    v-model="pergunta">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao1">
                Opção de Resposta 1 <br>
                <input type="radio" id="opc1" value="1" v-model="picked" checked>
                <input
                    type="text" id="opcao1" placeholder="Digite a opção 1"
                    v-model="opcao1">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao2">
                Opção de Resposta 2 <br>
                <input type="radio" id="opc2" value="2" v-model="picked">
                <input
                    type="text" id="opcao2" placeholder="Digite a opção 2"
                    v-model="opcao2">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao3">
                Opção de Resposta 3 <br>
                <input type="radio" id="opc3" value="3" v-model="picked">
                <input
                    type="text" id="opcao3" placeholder="Digite a opção 3"
                    v-model="opcao3">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao4">
                Opção de Resposta 4 <br>
                <input type="radio" id="opc4" value="4" v-model="picked">
                <input
                    type="text" id="opcao4" placeholder="Digite a opção 4"
                    v-model="opcao4">
            </label>
        </div>
        <div class="linha-input">
            <label for="dificuldade">
                Dificuldade<br>
                <input
                    type="number" id="dificuldade"
                    v-model="dificuldade">
            </label>
        </div>
        <div class="linha-input">
            <label for="dica">
                Dica <br>
                <input type="text" id="dica" placeholder="Digite a dica"
                v-model="dica">
            </label>
        </div>
        <div>
          <BaseButton type="submit">Criar</BaseButton>
        </div>
      </form>
    </BaseDialog>
    <ul class="list-desafios">
      <li v-for="desafio in desafios" :key="desafio.id">
        {{ desafio.nome }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      criandoDesafio: false,

      dificuldade: 0,
      conteudo: null,
      pergunta: '',
      opcao1: '',
      opcao2: '',
      opcao3: '',
      opcao4: '',
      respostaCorreta: 0,
      dica: '',

      picked: null,
    };
  },

  created() {
    this.setConteudos();
  },

  methods: {
    ...mapActions(['createNewDesafio', 'setConteudos']),
    criaDesafio() {
      this.respostaCorreta = this.picked;

      const objDesafio = {
        dificuldade: this.dificuldade,
        conteudo: this.conteudo,
        pergunta: this.pergunta,
        opcoesResposta: [
          { id: 1, resposta: this.opcao1 },
          { id: 2, resposta: this.opcao2 },
          { id: 3, resposta: this.opcao3 },
          { id: 4, resposta: this.opcao4 }],
        respostaCorreta: this.respostaCorreta,
        dica: this.dica,
        professor: this.userLogado.id,
      };

      this.createNewDesafio(objDesafio);

      this.criandoDesafio = false;
    },
  },
  computed: {
    ...mapGetters(['desafios', 'userLogado', 'conteudos']),
  },
};
</script>

<style scoped>

.linha-input {
  line-height: 24px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 8px 0;
}

</style>
