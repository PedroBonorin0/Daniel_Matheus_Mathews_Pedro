<template>
  <FormDesafio :desafioSelecionado="desafioData" @close-edicao="fechaEdicao"/>
</template>

<script>
import { mapGetters } from 'vuex';
import FormDesafio from './FormDesafio.vue';

export default {
  components: { FormDesafio },
  name: 'DesafioInfo',
  data() {
    return {
      nomeConteudo: '',
      nomeProfessor: '',
    };
  },
  props: {
    desafioId: { type: String, required: true },
  },
  methods: {
    fechaEdicao() {
      this.$emit('close-edicao');
    },
  },
  computed: {
    ...mapGetters(['desafios', 'conteudos', 'users']),
    desafioData() {
      let desafio;
      this.desafios.forEach((des) => {
        // eslint-disable-next-line eqeqeq
        if (des.id == this.desafioId) {
          desafio = des;
        }
      });

      this.conteudos.forEach((cont) => {
        if (desafio.conteudo === cont.id)
          this.nomeConteudo = cont.nome;
      });

      this.users.forEach((usr) => {
        if (desafio.professor === usr.id)
          this.nomeProfessor = usr.nomeUsuario;
      });

      const obj = {
        ...desafio,
        nomeProfessor: this.nomeProfessor,
        nomeConteudo: this.nomeConteudo,
      };

      return obj;
    },
  },
};
</script>

<style scoped>
p {
  margin: 8px;
}

ol {
  list-style-position: inside;
}
</style>
