<template>
  <BaseLoading class="loader" v-if="loading" />
  <div class="tema" v-else>
    <BaseCard class="menu-options">
      <div
        v-for="cont in conteudosOrdered" :key="cont.id"
        class="button"
      >
        <BaseButton :link="true" to="/game">{{ cont.nome }}</BaseButton>
      </div>
    </BaseCard>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { orderBy } from 'lodash-es';

export default {
  name: 'SelecaoTema',
  data() {
    return {
      loading: false,
    };
  },
  async created() {
    this.loading = true;
    await this.setConteudos();
    this.loading = false;
  },
  methods: {
    ...mapActions(['setConteudos']),
  },
  computed: {
    ...mapGetters(['conteudos']),
    conteudosOrdered() {
      return orderBy(this.conteudos, 'id');
    },
  },
};
</script>

<style scoped>
.tema {
  height: calc(100vh - 5rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-options {
  display: grid;
  margin: 0 auto;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 70px;
  width: 1000px;
  height: 350px;
}

.button {
  margin: 2rem;
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>
