import axios from 'axios';
import { orderBy } from 'lodash-es';

export default {
  state() {
    return {
      conteudos: [],
    };
  },
  mutations: {
    armazenaConteudos(state, payload) {
      state.conteudos = payload;
    },
  },
  actions: {
    setConteudos(context) {
      axios.get('https://coding-fight-default-rtdb.firebaseio.com/conteudos.json')
        .then((res) => {
          context.commit('armazenaConteudos', Object.values(res.data));
        })
        .catch((err) => {
          throw new Error(err.message || 'Failed to create Desafio');
        });
    },
  },
  getters: {
    conteudos(state) {
      return orderBy(state.conteudos, 'nome');
    },
  },
};
