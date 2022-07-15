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
      loginFinished: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userData = payload;
      state.userId = payload.id;
      state.loginFinished = true;
    },
    load(state, payload) {
      state.loginFinished = payload;
    },
    logoutUser(state) {
      state.userData = null;
      state.userId = null;
    },
  },
  actions: {
    async signup(context, payload) {
      const auth = getAuth();
      try {
        await createUserWithEmailAndPassword(auth, payload.email, payload.senha);
        // Signed in
        let userData = {};
        if (payload.isProfessor) {
          userData = {
            id: -1,
            email: payload.email,
            nomeUsuario: payload.nomeUsuario,
            isProfessor: payload.isProfessor,
          };
        } else {
          userData = {
            id: -1,
            email: payload.email,
            nomeUsuario: payload.nomeUsuario,
            isProfessor: payload.isProfessor,
            turma: payload.turma,
            pontosDesafios: [],
            totalPontos: 0,
          };
        }

        const res = await axios.post('https://coding-fight-default-rtdb.firebaseio.com/users.json', userData);

        const newId = String(res.data.name);
        let newUser = {};
        if (payload.isProfessor) {
          newUser = {
            id: newId,
            email: payload.email,
            nomeUsuario: payload.nomeUsuario,
            isProfessor: payload.isProfessor,
          };
        } else {
          newUser = {
            id: newId,
            email: payload.email,
            nomeUsuario: payload.nomeUsuario,
            isProfessor: payload.isProfessor,
            turma: payload.turma,
            pontosDesafios: [],
            totalPontos: 0,
          };
        }

        await axios.put(`https://coding-fight-default-rtdb.firebaseio.com/users/${newId}.json`, newUser);
        const objLogin = {
          email: payload.email,
          senha: payload.senha,
        };

        context.dispatch('login', objLogin);
      } catch (error) {
        throw new Error(error.message || 'Failed to Create User');
      }
    },
    async login(context, payload) {
      context.commit('load', false);

      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, payload.email, payload.senha);

        const res = await axios.get('https://coding-fight-default-rtdb.firebaseio.com/users.json');

        Object.values(res.data).forEach((user) => {
          if (user.email === payload.email) {
            localStorage.setItem('userId', user.id);
            context.dispatch('setLoggedUserInfo', user);
          }
        });
      } catch (error) {
        throw new Error(error.message || 'Failed to Login');
      }
    },
    async autoLogin(context) {
      context.commit('load', false);

      const userId = localStorage.getItem('userId');

      if (userId) {
        try {
          const res = await axios.get('https://coding-fight-default-rtdb.firebaseio.com/users.json');
          Object.values(res.data).forEach((user) => {
            if (user.id === userId)
              context.dispatch('setLoggedUserInfo', user);
          });
        } catch (error) {
          throw new Error(error.message || 'Failed to Login');
        }
      } else {
        context.commit('load', true);
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
    loginFinished(state) {
      return state.loginFinished;
    },
  },
};
