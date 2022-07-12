import axios from 'axios';

export default {
  state() {
    return {
      users: [],
    };
  },
  mutations: {
    setUsers(state, payload) {
      state.users = payload;
    },
  },
  actions: {
    async setUsers(context) {
      try {
        const res = await axios.get('https://coding-fight-default-rtdb.firebaseio.com/users.json');

        context.commit('setUsers', Object.values(res.data));
      } catch (err) {
        throw new Error(err.message || 'Failed to fecth users');
      }
    },
    async updateUser(_context, payload) {
      try {
        axios.put(`https://coding-fight-default-rtdb.firebaseio.com/users/${payload.id}.json`, payload);
      } catch (err) {
        throw new Error(err.message || 'Failed to Update users');
      }
    },
  },
  getters: {
    users(state) {
      return state.users;
    },
  },
};
