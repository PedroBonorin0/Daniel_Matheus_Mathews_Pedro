<template>
  <BaseLoading class="loader" v-if="loading" />
  <div class="home" v-else>
    <img src="../assets/img/logo.png" alt="Coding Fight">
    <BaseCard :class="!isAuthenticated? 'menu-options' : 'menu-logado'">
      <div class="button">
        <BaseButton :link="true" to="/tema">Jogar</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/instruction">Instruções</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/ranking">Ranking Geral</BaseButton>
      </div>
      <div class="button">
        <BaseButton :link="true" to="/sugestions">Sugestões/Reclamações</BaseButton>
      </div>
      <div v-if="isAuthenticated && !professorLogged" class="button-meio">
        <BaseButton :link="true" :to="linkSalaAluno">Turma</BaseButton>
      </div>
      <div class="button" v-if="isAuthenticated && professorLogged">
        <BaseButton :link="true" to="/turmas">Turmas</BaseButton>
      </div>
      <div class="button" v-if="isAuthenticated && professorLogged">
        <BaseButton :link="true" to="/desafios">Desafios</BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  data() {
    return {
      loading: false,
    }
  },

  async created() {
    if(localStorage.getItem('userId')) {
      this.loading = true;
      await this.autoLogin()
      this.loading = false;
    }
  },
  methods: {
    ...mapActions(['autoLogin'])
  },
  computed: {
    ...mapGetters(['professorLogged', 'users', 'isAuthenticated', 'userLogado']),
    linkSalaAluno() {
      return `/turmas/${this.userLogado.turma}`;
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  height: calc(100vh - 5rem);
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}

.home img {
  width: 18rem;
}

.menu-options {
  margin: 0 auto;
  text-align: center;
}

.menu-logado {
  margin: 0 auto;
  text-align: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  place-items: center;
}

.button, .button-meio {
  margin: 1.2rem;
}

.button-meio {
  grid-column-start: 1;
  grid-column-end: 3;
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
