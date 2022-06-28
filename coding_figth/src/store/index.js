import { createStore } from 'vuex';

import user from './modules/user';
import turma from './modules/turma';
import conteudo from './modules/conteudo';
import desafio from './modules/desafio';
import auth from './modules/auth';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    turma,
    conteudo,
    user,
    desafio,
    auth,
  },
});
