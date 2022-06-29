import axios from 'axios';

export default {
  state() {
    return {
      users: [],
    };
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload.users;
    },
  },
  actions: {
    setUsers(context) {
      axios.get('https://coding-fight-default-rtdb.firebaseio.com/users.json')
        .then((res) => {
          context.commit('setUsers', res.data);
        })
        .catch((err) => {
          throw new Error(err.message || 'Failed to fecth users');
        });
    },
    updatePontos(context, payload) {
      axios.put(`https://coding-fight-default-rtdb.firebaseio.com/users/${payload.userId}.json`, payload.userData)
        .then()
        .catch((err) => {
          throw new Error(err.message || 'Failed to Update User');
        });
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
  },
};
