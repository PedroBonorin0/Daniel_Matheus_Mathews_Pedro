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
  },
  getters: {
    users(state) {
      return state.users;
    },
  },
};
