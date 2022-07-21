<template>
  <BaseCard class="form-desafio">
    <form @submit.prevent="handleSubmit">
      <button v-if="editando" @click="confirmDeleteDesafio"
        class="btn-remove">&#x2718;</button>
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
              <textarea id="desafio" rows="4" cols="100" v-model="pergunta">
                Digite a sua pergunta...
              </textarea>
          </label>
      </div>
      <div class="linha-input">
          <label for="opcao1">
            Opção de Resposta 1 <br>
            <div class="radio-input">
              <input class="radio-circle"
                type="radio" id="opc1" value="1" v-model="picked" checked>
              <input
                type="text" id="opcao1" placeholder="Digite a opção 1"
                class="text-input" v-model="opcao1">
            </div>
          </label>
      </div>
      <div class="linha-input">
          <label for="opcao2">
            Opção de Resposta 2 <br>
            <div class="radio-input">
              <input class="radio-circle"
                type="radio" id="opc2" value="2" v-model="picked">
              <input
                type="text" id="opcao2" placeholder="Digite a opção 2"
                class="text-input" v-model="opcao2">
            </div>
          </label>
      </div>
      <div class="linha-input">
          <label for="opcao3">
            Opção de Resposta 3 <br>
            <div class="radio-input">
              <input class="radio-circle"
                type="radio" id="opc3" value="3" v-model="picked">
              <input
                type="text" id="opcao3" placeholder="Digite a opção 3"
                class="text-input" v-model="opcao3">
            </div>
          </label>
      </div>
      <div class="linha-input">
          <label for="opcao4">
              Opção de Resposta 4 <br>
              <div class="radio-input">
                <input class="radio-circle"
                type="radio" id="opc4" value="4" v-model="picked">
                <input
                  type="text" id="opcao4" placeholder="Digite a opção 4"
                  class="text-input" v-model="opcao4">
              </div>
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
      <p class="msg-erro" v-if="erro">
        Verifique se todos so campos foram preenchidos e se a dificuldade está entre 1 e 3!
      </p>
      <div>
        <BaseButton v-if="!desafioSelecionado" class="btn-submit" type="submit">Criar</BaseButton>
        <BaseButton v-else class="btn-submit" type="submit">Editar</BaseButton>
      </div>
    </form>
  </BaseCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      erro: false,

      id: '',
      conteudo: 0,
      pergunta: '',
      picked: 1,
      dificuldade: 1,
      dica: '',
      opcao1: '',
      opcao2: '',
      opcao3: '',
      opcao4: '',

      editando: false,
      deletandoDesafio: false,
    };
  },

  mounted() {
    if (this.desafioSelecionado) {
      this.editando = true;

      this.id = this.desafioSelecionado.id;
      this.conteudo = this.desafioSelecionado.conteudo;
      this.dificuldade = this.desafioSelecionado.dificuldade;
      this.pergunta = this.desafioSelecionado.pergunta;
      this.picked = this.desafioSelecionado.respostaCorreta;
      this.dica = this.desafioSelecionado.dica;
      this.opcao1 = this.desafioSelecionado.opcoesResposta[0].resposta;
      this.opcao2 = this.desafioSelecionado.opcoesResposta[1].resposta;
      this.opcao3 = this.desafioSelecionado.opcoesResposta[2].resposta;
      this.opcao4 = this.desafioSelecionado.opcoesResposta[3].resposta;
    }
  },

  props: {
    desafioSelecionado: { type: Object, required: false },
  },

  methods: {
    ...mapActions(['createNewDesafio', 'updateDesafio', 'deleteDesafio']),
    async handleSubmit() {
      if(!this.desafioValido()) {
        this.erro = true;
        setTimeout(() => {
          this.erro = false;
        }, 2000);
        return;
      }

      const objDesafio = {
        dificuldade: this.dificuldade,
        conteudo: this.conteudo,
        pergunta: this.pergunta,
        opcoesResposta: [
          { id: 1, resposta: this.opcao1 },
          { id: 2, resposta: this.opcao2 },
          { id: 3, resposta: this.opcao3 },
          { id: 4, resposta: this.opcao4 }],
        respostaCorreta: this.picked,
        dica: this.dica,
        professor: this.userLogado.id,
      };

      if (!this.editando) {
        await this.createNewDesafio(objDesafio);
      } else {
        const objComId = {
          ...objDesafio,
          id: this.id,
        };
        await this.updateDesafio(objComId);
      }

      this.$emit('close-edicao');
      this.resetAll();
    },

    desafioValido() {
      let valido = true;

      if(
        this.conteudo <= 0 || this.conteudo >= 8||
        this.pergunta === '' ||
        this.picked <= 0 || this.picked >= 5 ||
        this.dificuldade <= 0 || this.dificuldade >= 4 ||
        this.dica === '' ||
        this.opcao1 === '' ||
        this.opcao2 === '' ||
        this.opcao3 === '' ||
        this.opcao4 === ''
        ) {
          valido = false;
        }
      return valido;
    },

    resetAll() {
      this.editando = false;

      this.conteudo = 0;
      this.pergunta = '';
      this.picked = 1;
      this.dificuldade = 1;
      this.dica = '';
      this.opcao1 = '';
      this.opcao2 = '';
      this.opcao3 = '';
      this.opcao4 = '';
    },
    async confirmDeleteDesafio() {
      const res = window.confirm(`Deseja deletar desafio de dica: ${this.desafioSelecionado.dica}?`);

      if (res) await this.deleteDesafio(this.desafioSelecionado.id);

      this.deletandoDesafio = false;
    },
  },
  computed: {
    ...mapGetters(['conteudos', 'userLogado']),
  },
  watch: {
    desafioSelecionado(desafio) {
      this.editando = true;

      this.id = desafio.id;
      this.conteudo = desafio.conteudo;
      this.dificuldade = desafio.dificuldade;
      this.pergunta = desafio.pergunta;
      this.picked = desafio.respostaCorreta;
      this.dica = desafio.dica;
      this.opcao1 = desafio.opcoesResposta[0].resposta;
      this.opcao2 = desafio.opcoesResposta[1].resposta;
      this.opcao3 = desafio.opcoesResposta[2].resposta;
      this.opcao4 = desafio.opcoesResposta[3].resposta;
    },
  },
};
</script>

<style scoped>
.form-desafio {
  display: flex;
  align-items: center;
  justify-content: center;
}

.linha-input {
  line-height: 24px;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin: 8px 0;
}

.linha-input select {
  width: 200px;
}

.linha-input .msg-erro {
  font-size: 12px;
  color: #bc2020;
}

.linha-input .radio-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.linha-input .radio-input .radio-circle {
  width: 5%;
}

.linha-input input, textarea {
  width: 85%;
  background: #eee;
  border: 0;
  border-radius: 4px;
  margin-top: 2px;
  padding: 2px 5px;
}

.linha-input input {
  height: 24px;
}

.linha-input textarea {
  height: 48px;
}

.btn-submit {
  margin-top: 15px;
}

.btn-remove {
  float: right;
  background: #b44646;
  color: white;
  border: none;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  position: relative;
  top: 5px;
  cursor: pointer;
}

.btn-remove:hover {
  background: #9a3b3b;
}

.delete-turma {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.delete-turma p {
  font-size: 1.4rem;
  margin-bottom: 8px;
}

.msg-erro {
  color: #bc2020;
}
</style>
