<template>
  <div class="ranking-information">
    <BaseCard class="menu-options">
      <h2 class="titulo">
        Ranking Geral
      </h2>
      <p class="aluno-info" v-for="user in usersOrderedByPontos" :key="user.id">
      Nome do aluno: {{user.nomeUsuario}} <br>
      Potuação total: {{user.totalPontos}}
      </p>
    </BaseCard>
  </div>
</template>

<script>
// <div class="aluno-info">{{this.nomeAlunos}}</div>
// <p v-for="user in users" :key="user.nomeUsuario">{{user.nomeUsuario}}</p>
import { orderBy } from 'lodash-es';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Ranking',
  data() {
    return {
      nomeAlunos: [],
      emailAlunos: [],
      totalPontos: [],
      turmaAlunos: [],
    };
  },
  mounted() {
    // Busca os users no BD
    this.setUsers();
    this.nomeAlunos = [];
    this.teste();
  },
  methods: {
    ...mapActions(['setUsers']),
    teste() {
      // Salva os nomes dos alunos no BD
      this.users.forEach((element) => {
        if (!element.isProfessor) { // Adiciono todos os alunos na lista de alunos
          this.nomeAlunos.push(element.nomeUsuario);
          this.emailAlunos.push(element.email);
          this.totalPontos.push(element.totalPontos);
        }
      });
    },
  },
  computed: {
    ...mapGetters(['users']),
    usersOrderedByPontos() {
      return orderBy(this.users, 'totalPontos', 'desc')
        .filter((user) => !user.isProfessor);
    },
  },
};

</script>

<style scoped>
.ranking-information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 60em;
  height: auto;
  margin: 2em auto;
  min-height: 30px;
  font-size: 20px;
  border-radius: 8px;
}
.aluno-info{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;

  width: auto;
  height: auto;
  border-width: 1px;
  border-style: solid;
  border-radius: 2em;
  margin: 1em 2em;
  padding: 0.5em 1em;
  min-height: 30px;
  font-size: 20px;
}
.titulo{
  font-size: 30px;
  margin: 20px auto;
  text-align: center;
}
.menu-options {
  margin: auto auto;
}
</style>
