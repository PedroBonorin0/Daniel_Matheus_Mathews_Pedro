<template>
  <BaseLoading v-if="loading" />
    <BaseCard class="card-turma" v-else>
      <h2>{{ turmaAluno.nome }}</h2>
      <div class="turma-details">
        <div class="lista-alunos">
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Pontos</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="aluno in alunosTurma" :key="aluno.id">
                <td>{{ aluno.nomeUsuario }}</td>
                <td class="pnts-aluno">{{ aluno.totalPontos }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Media de Pontos</th>
                <td>{{ mediaPntsTurma.toFixed(2) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </BaseCard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { meanBy, orderBy } from 'lodash-es';

export default {
  data() {
    return {
      loading: false,

      turmaAluno: null,
    };
  },
  async created() {
    this.loading = true;
    await this.setTurmas();
    await this.setUsers();
    this.turmaAluno = await this.setTurmaAluno(this.$route.params.id);
    this.loading = false;
  },

  methods: {
    ...mapActions(['setTurmas', 'setTurmaAluno', 'setUsers']),
  },

  computed: {
    ...mapGetters(['turmas', 'users']),
    mediaPntsTurma() {
      const usersTurma = this.alunosTurma;
      return meanBy(usersTurma, 'totalPontos');
    },
    alunosTurma() {
      return orderBy(
        this.users.filter((u) => u.turma === this.turmaAluno.id && u.isProfessor === false),
        'totalPontos',
        'desc',
      );
    },
  },
};
</script>

<style scoped>
.card-turma {
  margin: 12px auto;
  text-align: center;
  max-width: 400px;
}

.card-turma h2 {
  margin-bottom: 8px;
}

.turma-details {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lista-alunos table{
  border-collapse: collapse;
}

.lista-alunos table tr{
  height: 24px;
}

.lista-alunos table td{
  width: 150px;
  padding: 2px 6px;
}

.lista-alunos table .pnts-aluno{
  text-align: center;
}

.lista-alunos table tbody{
  text-align: left;
}

.lista-alunos table tbody tr:nth-child(odd) {
  background-color: aliceblue;
}

.lista-alunos table thead, tfoot {
  background-color: #72c8c8;
}
</style>
