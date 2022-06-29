import { orderBy } from 'lodash-es';
import axios from 'axios';

export default {
  state() {
    return {
      turmas: [],
    };
  },
  mutations: {
    setAllTurmas(state, payload) {
      state.turmas = payload;
    },
  },
  actions: {
    setTurmas(context) {
      axios.get('https://coding-fight-default-rtdb.firebaseio.com/turmas.json')
        .then((res) => {
          context.commit('setAllTurmas', Object.values(res.data));
        })
        .catch((err) => {
          throw new Error(err.message || 'Failed to get Turmas');
        });
    },
    createNewTurma(context, payload) {
      axios.post('https://coding-fight-default-rtdb.firebaseio.com/turmas.json', payload)
        .then(() => {
          context.dispatch('setTurmas');
        })
        .catch((err) => {
          throw new Error(err.message || 'Failed to create Turma');
        });
    },
  },
  getters: {
    turmas(state) {
      return orderBy(state.turmas, 'nome');
    },
  },
};
