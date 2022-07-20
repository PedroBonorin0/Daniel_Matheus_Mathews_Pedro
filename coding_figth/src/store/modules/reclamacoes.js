import axios from 'axios';

export default {
  state() {
    return {
      reclamacoes: [],
    };
  },
  mutations: {
    setAllReclamacoes(state, payload) {
      state.turmas = payload;
    },
  },
  actions: {
    async setReclamacoes(context) {
      try {
        const res = await axios.get('https://coding-fight-default-rtdb.firebaseio.com/reclamacoes.json');

        if (res.data)
          context.commit('setAllReclamacoes', Object.values(res.data));
        else
          context.commit('setAllReclamacoes', []);
      } catch (err) {
        throw new Error(err.message || 'Failed to get Reclamacoes');
      }
    },
    async createNewReclamacao(context, payload) {
      try {
        const res = await axios.post('https://coding-fight-default-rtdb.firebaseio.com/reclamacoes.json', payload);

        const newReclamacao = {
          ...payload,
          id: res.data.name,
        };

        await axios.put(`https://coding-fight-default-rtdb.firebaseio.com/reclamacoes/${res.data.name}.json`, newReclamacao);

        context.dispatch('setReclamacoes');
      } catch (err) {
        throw new Error(err.message || 'Failed to create Reclamacao');
      }
    },
    async deleteReclamacao(context, payload) {
      try {
        await axios.delete(`https://coding-fight-default-rtdb.firebaseio.com/reclamacoes/${payload}.json`);

        context.dispatch('setReclamacoes');
      } catch (err) {
        throw new Error(err.message || 'Failed to delete Reclamacao');
      }
    },
  },
  getters: {
    reclamacoes(state) {
      return state.turmas;
    },
  },
};
