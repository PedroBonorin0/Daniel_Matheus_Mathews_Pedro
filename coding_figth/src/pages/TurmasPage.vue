<template>
  <BaseLoading v-if="loading" />
  <div id="geral-turmas" v-else>
    <div class="add-turma">
      <BaseButton @click="criandoTurma = true">Criar Turma</BaseButton>
    </div>
    <BaseDialog :show="criandoTurma" title="Criar Nova Turma"
      @close="criandoTurma = false"
    >
      <form @submit.prevent="criaTurma" class="cria-turma">
        <label for="turma">
          Turma:
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
      <div class="delete-turma">
        <p>Deseja Deletar turma <strong>{{ turmaSelecionada.nome }}?</strong></p>
        <div class="linha-btns">
          <BaseButton @click="confirmDeleteTurma">Sim</BaseButton>
          <BaseButton @click="deletandoTurma = false">Não</BaseButton>
        </div>
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
    };
  },

  async created() {
    this.loading = true;
    await this.setTurmas();
    await this.setUsers();
    this.loading = false;
  },
  methods: {
    ...mapActions(['createNewTurma', 'setTurmas', 'deleteTurma', 'setUsers']),
    async criaTurma() {
      const objTurma = {
        nome: this.nomeTurma,
        professor: this.userLogado.id,
      };

      await this.createNewTurma(objTurma);

      this.criandoTurma = false;
      this.nomeTurma = '';
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

.cria-turma {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cria-turma input {
  width: 70%;
  height: 24px;
  background: #eee;
  border: 0;
  border-radius: 4px;
  margin-top: 2px;
  padding: 2px 5px;
  margin: 8px 0;
}

.cria-turma button {
  width: 80px;
}

.list-turmas {
  display: flex;
  flex-wrap: wrap;
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
</style>
