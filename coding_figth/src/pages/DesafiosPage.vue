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
                    <option v-for="conteudo in contudos" :key="conteudo.id"
                    :value="conteudo.nome">{{ conteudo.nome }}</option>
                </select>
            </label>
        </div>
        <div class="linha-input">
            <label for="pergunta">
                Pergunta do Desafio <br>
                <input
                    type="text" id="desafio" placeholder="Digite a pergunta do desafio"
                    v-model="pergunta.value">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao1">
                Opção de Resposta 1 <br>
                <input
                    type="text" id="opcao1" placeholder="Digite a opção 1"
                    v-model="opcao1.value">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao2">
                Opção de Resposta 2 <br>
                <input
                    type="text" id="opcao2" placeholder="Digite a opção 2"
                    v-model="opcao2.value">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao3">
                Opção de Resposta 1 <br>
                <input
                    type="text" id="opcao3" placeholder="Digite a opção 3"
                    v-model="opcao3.value">
            </label>
        </div>
        <div class="linha-input">
            <label for="opcao4">
                Opção de Resposta 1 <br>
                <input
                    type="text" id="opcao4" placeholder="Digite a opção 4"
                    v-model="opcao4.value">
            </label>
        </div>
        <div class="linha-input">
            <label for="dica">
                Dica <br>
                <input type="text" id="dica" placeholder="Digite a dica"
                v-model="dica.value">
            </label>
        </div>
        <div>
          <BaseButton type="submit">Criar</BaseButton>
        </div>
      </form>
    </BaseDialog>
    <div class="linha-input">
        <label for="conteudo">
            Conteúdo <br>
            <select id="desafio" v-model="conteudo">
              <option v-for="conteudo in contudos" :key="conteudo.id"
              :value="conteudo.nome">{{ conteudo.nome }}</option>
            </select>
        </label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      criandoDesafio: false,

      dificuldade: 2,
      conteudo: [],
      pergunta: '',
      opcoesResposta: [],
      opcao1: '',
      opcao2: '',
      opcao3: '',
      opcao4: '',
      respostaCorreta: 0,
      dica: '',
    };
  },

  methods: {
    ...mapActions(['createNewDesafio']),
    criaDesafio() {
      const objDesafio = {
        id: Date.now(),
        nome: this.nomeDesafio,
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
