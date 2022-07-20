<template>
  <div class="block-turma" @click="redirectPageTurma" title="Clique para ir para página da turma">
      <div class="block-header">
        <h2>{{ turma.nome }}</h2>
        <button @click="removeTurma" class="btn-remove">&#x2718;</button>
      </div>
      <div class="block-body">
        <p>Número de Alunos: {{ numAlunos }}</p>
        <h4 v-if="numAlunos > 0">Media geral da turma</h4>
        <p v-if="numAlunos > 0">{{ mediaTurma.toFixed(2) }}</p>
      </div>
  </div>
</template>

<script>
import { meanBy } from 'lodash-es';
import { mapGetters } from 'vuex';

export default {
  props: {
    turma: { type: Object, required: true },
  },

  methods: {
    removeTurma() {
      this.$emit('delete-turma', this.turma);
    },
    redirectPageTurma() {
      this.$router.push(`/turmas/${this.turma.id}`);
    },
  },
  computed: {
    ...mapGetters(['users']),
    mediaTurma() {
      return meanBy(this.users.filter((usr) => usr.turma === this.turma.id), 'totalPontos');
    },
    numAlunos() {
      return this.users.filter((usr) => usr.turma === this.turma.id).length;
    },
  },
};
</script>

<style scoped>
  .block-turma {
    flex: 1 0 200px;

    height: 40px;
    max-width: 200px;
    border: 1px solid #555;
    margin: 25px;
    border-radius: 4px;
    box-shadow: 1px 1px 2px #555;
    cursor: pointer;
    transition: .5s;
    overflow: hidden;
  }

  .block-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }

  .block-turma h2 {
    width: 80%;
  }

  .block-turma:hover {
    height: 200px;
  }

  .btn-remove {
    background: #b44646;
    color: white;
    border: none;
    width: 10%;
    height: 20px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .btn-remove:hover {
    background: #9a3b3b;
  }
</style>
