import { createStore } from 'vuex';

import jogador from './modules/jogador';
import turma from './modules/turma';
import professor from './modules/professor';
import conteudo from './modules/conteudo';
import desafio from './modules/desafio';

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
    jogador,
    turma,
    professor,
    conteudo,
    desafio,
  },
});
