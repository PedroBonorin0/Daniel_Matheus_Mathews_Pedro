<template>
  <div id="geral-turmas">
    <div class="add-turma">
      <BaseButton @click="criandoTurma = true">Criar Turma</BaseButton>
    </div>
    <BaseDialog :show="criandoTurma" title="Criar Nova Turma">
      <form @submit.prevent="criaTurma">
        <label for="turma">
          Turma
          <input type="text" placeholder="Digite o nome da turma" v-model="nomeTurma">
        </label>
          <BaseButton type="submit">Criar</BaseButton>
      </form>
    </BaseDialog>
    <ul class="list-turmas">
      <li v-for="turma in turmas" :key="turma.id">
        {{ turma.nome }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      criandoTurma: false,

      nomeTurma: '',
    };
  },

  methods: {
    ...mapActions(['createNewTurma']),
    criaTurma() {
      const objTurma = {
        id: Date.now(),
        nome: this.nomeTurma,
        professor: this.userLogado.id,
      };

      this.createNewTurma(objTurma);

      this.criandoTurma = false;
    },
  },
  computed: {
    ...mapGetters(['turmas', 'userLogado']),
  },
};
</script>

<style scoped>

</style>
