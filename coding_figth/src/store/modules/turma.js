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
    async setTurmas(context) {
      try {
        const res = await axios.get('https://coding-fight-default-rtdb.firebaseio.com/turmas.json');

        if (res.data)
          context.commit('setAllTurmas', Object.values(res.data));
      } catch (err) {
        throw new Error(err.message || 'Failed to get Turmas');
      }
    },
    async updateTurma(context, payload) {
      try {
        await axios.put(`https://coding-fight-default-rtdb.firebaseio.com/turmas/${payload.id}.json`, payload);
        context.dispatch('setTurmas');
      } catch (err) {
        throw new Error(err.message || 'Failed to update turma');
      }
    },
    async createNewTurma(context, payload) {
      try {
        const res = await axios.post('https://coding-fight-default-rtdb.firebaseio.com/turmas.json', payload);

        const newTurma = {
          ...payload,
          id: res.data.name,
        };

        await axios.put(`https://coding-fight-default-rtdb.firebaseio.com/turmas/${res.data.name}.json`, newTurma);

        context.dispatch('setTurmas');
      } catch (err) {
        throw new Error(err.message || 'Failed to create Turma');
      }
    },
  },
  getters: {
    turmas(state) {
      return orderBy(state.turmas, 'nome');
    },
  },
};
