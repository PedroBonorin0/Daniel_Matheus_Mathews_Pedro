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
    async setConteudos(context) {
      try {
        const res = await axios.get('https://coding-fight-default-rtdb.firebaseio.com/conteudos.json');

        context.commit('armazenaConteudos', Object.values(res.data));
      } catch (err) {
        throw new Error(err.message || 'Failed to fetch conteudos');
      }
    },
  },
  getters: {
    conteudos(state) {
      return orderBy(state.conteudos, 'nome');
    },
  },
};
