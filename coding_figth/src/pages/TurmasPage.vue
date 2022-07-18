<template>
  <BaseLoading v-if="loading" />
  <div id="geral-turmas" v-else>
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
    <div class="list-turmas">
      <TurmaBlock v-for="turma in turmasProf" :key="turma.id" :turma="turma"
      @delete-turma="deletaTurma"/>
    </div>
    <BaseDialog :show="deletandoTurma" title="Deletar turma" @close="deletandoTurma = false">
      <h1>Deseja Deletar turma {{ turmaSelecionada.nome }}</h1>
      <div class="linha-btns">
        <BaseButton @click="confirmDeleteTurma">Sim</BaseButton>
        <BaseButton @click="deletandoTurma = false">Não</BaseButton>
      </div>
    </BaseDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TurmaBlock from '@/components/TurmaBlock.vue';

export default {
  components: {
    TurmaBlock,
  },
  data() {
    return {
      loading: false,

      criandoTurma: false,

      nomeTurma: '',

      deletandoTurma: false,
      turmaSelecionada: null,
      delTurma: false,
    };
  },

  async created() {
    this.loading = true;
    await this.setTurmas();
    this.loading = false;
  },
  methods: {
    ...mapActions(['createNewTurma', 'setTurmas', 'deleteTurma']),
    async criaTurma() {
      const objTurma = {
        nome: this.nomeTurma,
        professor: this.userLogado.id,
      };

      await this.createNewTurma(objTurma);

      this.criandoTurma = false;
    },
    deletaTurma(turma) {
      this.turmaSelecionada = turma;
      this.deletandoTurma = true;
    },
    async confirmDeleteTurma() {
      await this.deleteTurma(this.turmaSelecionada.id);
      this.deletandoTurma = false;
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
