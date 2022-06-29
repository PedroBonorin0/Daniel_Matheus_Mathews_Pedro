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
      userData: null,
      userId: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userData = payload;
      state.userId = payload.id;
    },
    logoutUser(state) {
      state.userData = null;
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
            turma: payload.turma,
            pontosDesafios: [],
            totalPontos: 0,
          };

          axios.post('https://coding-fight-default-rtdb.firebaseio.com/users.json', userData)
            .then()
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
          axios.get('https://coding-fight-default-rtdb.firebaseio.com/users.json')
            .then((res) => {
              Object.values(res.data).forEach((user) => {
                if (user.id === auth.currentUser.reloadUserInfo.localId) {
                  localStorage.setItem('userId', user.id);
                  context.dispatch('setLoggedUserInfo', user);
                }
              });
            });
        })
        .catch((error) => {
          throw new Error(error.message || 'Failed to Login');
        });
    },
    autoLogin(context) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        axios.get('https://coding-fight-default-rtdb.firebaseio.com/users.json')
          .then((res) => {
            Object.values(res.data).forEach((user) => {
              if (user.id === userId) {
                context.dispatch('setLoggedUserInfo', user);
              }
            });
          })
          .catch((error) => {
            throw new Error(error.message || 'Failed to Login');
          });
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
      context.commit('setUser', payload);
    },
  },
  getters: {
    isAuthenticated(state) {
      return state.userData !== null;
    },
    professorLogged(state) {
      return state.userData.isProfessor;
    },
    userLogado(state) {
      return state.userData;
    },
  },
};
