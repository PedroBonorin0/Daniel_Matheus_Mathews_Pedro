<template>
  <div class="ranking-information">
    <div class="aluno-info">{{this.nomeAlunos}}</div>
  </div>
</template>

<script>
//<p v-for="user in users" :key="user.nomeUsuario">{{user.nomeUsuario}}</p>
import { orderBy } from 'lodash-es';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Ranking',
  data(){
    return{
      nomeAlunos: [],
      emailAlunos: [],
      totalPontos: [],
      turmaAlunos: [],
    };
  },
  mounted(){
    // Busca os users no BD
    this.setUsers();
    this.nomeAlunos = [];
    this.teste();
  },
  methods: {
    ...mapActions(['setUsers']), 
    teste(){
      //Salva os nomes dos alunos no BD
      this.users.forEach(element => {
        if (!element.isProfessor){ //Adiciono todos os alunos na lista de alunos
          this.nomeAlunos.push(element.nomeUsuario)
          this.emailAlunos.push(element.nomeUsuario)
          this.totalPontos.push(element.nomeUsuario)
        }
      });
      //console.log(this.nomeAlunos)
      //console.log(this.users);
    },
  },
  computed: {
    ...mapGetters(['users']),
    usersOrderedByPontos() {
      return orderBy(this.users, 'pontos', 'desc');
    },
  },
}

</script>

<style scoped>
.ranking-information {
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-style: solid;
  width: 500px;
  margin: 20px auto;
  padding: 0 8px;
  min-height: 30px;
  font-size: 20px;
  border-radius: 8px;
}
.aluno-info{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  border-radius: 8px;
  padding: 0 8px;
  min-height: 30px;
  font-size: 20px;
}
</style>
