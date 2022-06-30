<template>
    <BaseCard>
      <p>Conteudo: {{ desafioData.nomeConteudo }}</p>
      <p>Conteudo: {{ desafioData.pergunta }}</p>
    </BaseCard>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
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
        if (desafio.professor == usr.id)
          this.nomeProfessor = usr.nomeUsuario;
      });

      const obj = {
        ...desafio,
        nomeProfessor: this.nomeProfessor,
        nomeConteudo: this.nomeConteudo,
      };

      console.log(obj);

      return obj;
    },
  },
};
</script>

<style scoped>

</style>
