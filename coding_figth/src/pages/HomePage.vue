<template>
  <div class="home">
    <img src="../assets/img/logo.png" alt="Coding Fight">
    <BaseCard class="menu-options">
      <div class="button">
        <BaseButton :link="true" to="/tema">Jogar</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/instruction">Instruções</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/ranking">Ranking Geral</BaseButton>
      </div>
      <div v-if="isAuthenticated" id="btn-turmas">
        <div v-if="!professorLogged" class="button-turmas">
          <BaseButton :link="true" :to="linkSalaAluno">Turma</BaseButton>
        </div>
        <div v-else class="button-turmas">
          <BaseButton :link="true" to="/turmas">Turmas</BaseButton>
          <BaseButton :link="true" to="/desafios">Desafios</BaseButton>
        </div>
      </div>
    </BaseCard>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',

  computed: {
    ...mapGetters(['professorLogged', 'users', 'isAuthenticated', 'userLogado']),
    linkSalaAluno() {
      const user = this.userLogado;
      //console.log(user);
      //return `/turmas/${user.turma.id}`;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  height: 80vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.home img {
  width: 18rem;
}

.menu-options {
  margin: 0 auto;
  text-align: center;
}

.button {
  margin: 2rem;
}
</style>
