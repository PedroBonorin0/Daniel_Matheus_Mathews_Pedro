<template>
  <BaseLoading v-if="loading"/>
  <div id="geral-desafios" v-else>
    <div v-if="!criandoDesafio">
      <div class="add-desafio">
        <BaseButton @click="iniciaCriacao">Criar Desafio</BaseButton>
      </div>
    </div>
    <div class="linha-input">
        <label for="desafio">
            Desafio <br>
            <select id="desafio" v-model="desafioSelecionado" @change="criandoDesafio = false">
              <option v-for="desafio in desafiosProfLogado" :key="desafio.id"
              :value="desafio.id">{{ desafio.dica }}</option>
            </select>
        </label>
      </div>
    <FormDesafio v-if="criandoDesafio"/>
    <DesafioInfo v-if="desafioSelecionado" @close-edicao="desafioSelecionado = null"
    :desafioId="desafioSelecionado"/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DesafioInfo from '@/components/DesafioInfo.vue';
import FormDesafio from '@/components/FormDesafio.vue';

export default {
  components: {
    DesafioInfo,
    FormDesafio,
  },
  data() {
    return {
      loading: false,
      criandoDesafio: false,
      desafioSelecionado: null,
    };
  },

  async created() {
    this.loading = true;
    await this.setDesafios();

    await this.setConteudos();
    this.loading = false;
  },

  methods: {
    ...mapActions(['createNewDesafio', 'setConteudos', 'setDesafios']),
    iniciaCriacao() {
      this.criandoDesafio = true;
      this.desafioSelecionado = null;
    },
  },
  computed: {
    ...mapGetters(['desafios', 'userLogado', 'conteudos', 'desafiosLoaded']),
    desafiosProfLogado() {
      return this.desafios.filter((dsf) => String(dsf.professor) === String(this.userLogado.id));
    },
  },
};
</script>

<style scoped>

#geral-desafios {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}

.add-desafio {
  margin-bottom: 8px;
}

.linha-input {
  max-width: 300px;
  margin-bottom: 8px;
}

#desafio {
  max-width: 60%;
}

</style>
