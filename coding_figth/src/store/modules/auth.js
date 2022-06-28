import axios from 'axios';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export default {
  state() {
    return {
      userId: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload;
    },
    logoutUser(state) {
      state.userId = null;
    },
  },
  actions: {
    signup(_context, payload) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, payload.email, payload.senha)
        .then(() => {
          // Signed in
          const userData = {
            id: auth.currentUser.reloadUserInfo.localId,
            email: payload.email,
            nomeUsuario: payload.nomeUsuario,
            isProfessor: payload.isProfessor,
          };

          axios.post('https://coding-fight-default-rtdb.firebaseio.com/users.json', userData)
            .then() // Return true to make redirect
            .catch((err) => {
              throw new Error(err.message || 'Failed to add User to list');
            });
        })
        .catch((error) => {
          throw new Error(error.message || 'Failed to Create User');
        });
    },
    login(context, payload) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, payload.email, payload.senha)
        .then(() => {
          localStorage.setItem('userId', auth.currentUser.reloadUserInfo.localId);
          context.dispatch('setLoggedUserInfo', auth.currentUser);
        })
        .catch((error) => {
          throw new Error(error.message || 'Failed to Login');
        });
    },
    autoLogin(context) {
      if (localStorage.getItem('userId')) {
        context.commit('setUser', localStorage.getItem('userId'));
      }
    },
    logout(context) {
      localStorage.removeItem('userId');

      const auth = getAuth();
      signOut(auth).then(() => {
        context.commit('logoutUser');
      }).catch((error) => {
        throw new Error(error.message || 'Failed to logout');
      });
    },
    setLoggedUserInfo(context, payload) {
      context.commit('setUser', payload.reloadUserInfo.localId);
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    isAuthenticated(state) {
      return state.userId !== null;
    },
  },
};
