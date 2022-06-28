import axios from 'axios';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: null,
    };
  },
  mutations: {

  },
  actions: {
    signup(_context, payload) {
      const auth = getAuth();
      console.log(payload);
      console.log(auth);
      createUserWithEmailAndPassword(auth, payload.email, payload.senha)
        .then(() => {
          // Signed in
          const userData = {
            email: payload.email,
            nomeUsuario: payload.nomeUsuario,
            isProfessor: payload.isProfessor,
          };

          axios.post('https://coding-fight-default-rtdb.firebaseio.com/users.json', userData)
            .then(() => {})
            .catch((err) => {
              throw new Error(err.message || 'Failed to add User to list');
            });
        })
        .catch((error) => {
          throw new Error(error.message || 'Failed to Create User');
        });
    },
  },
  getters: {

  },
};
