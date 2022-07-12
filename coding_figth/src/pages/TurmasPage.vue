<template>
  <div id="geral-turmas">
    <div class="add-turma">
      <BaseButton @click="criandoTurma = true">Criar Turma</BaseButton>
    </div>
    <BaseDialog :show="criandoTurma" title="Criar Nova Turma" @close="criandoTurma = false">
      <form @submit.prevent="criaTurma">
        <label for="turma">
          Turma
          <input type="text" placeholder="Digite o nome da turma" v-model="nomeTurma">
        </label>
          <BaseButton type="submit">Criar</BaseButton>
      </form>
    </BaseDialog>
    <ul class="list-turmas">
      <li v-for="turma in turmasProf" :key="turma.id">
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
        nome: this.nomeTurma,
        professor: this.userLogado.id,
      };

      this.createNewTurma(objTurma);

      this.criandoTurma = false;
    },
  },
  computed: {
    ...mapGetters(['turmas', 'userLogado']),
    turmasProf() {
      return this.turmas.filter((trm) => String(trm.professor) === String(this.userLogado.id));
    },
  },
};
</script>

<style scoped>
#geral-turmas {
  text-align: center;
  margin: 30px auto;
}

.add-turma {
  margin-bottom: 30px;
}

li {
  margin: 5px;
}
</style>
