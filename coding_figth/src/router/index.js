import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import InstructionPage from '../pages/InstructionPage.vue';
import GamePage from '../pages/GamePage.vue';
import EndGame from '../pages/Endgame.vue';
import LoginPage from '../pages/LoginPage.vue';
import TurmasPage from '../pages/TurmasPage.vue';

import store from '../store/index';

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/instruction',
    component: InstructionPage,
  },
  {
    path: '/game',
    component: GamePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/endgame',
    component: EndGame,
    meta: { requiresAuth: true, requiresProf: true },
  },
  {
    path: '/turmas',
    component: TurmasPage,
    meta: { requiresAuth: true },
  },
  // {
  //   path: '/turmas/:id',
  //   component: TurmaDetails,
  //   props: true,
  //   meta: { requiresAuth: true },
  // },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/:notFound(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) next('/login');
  else next();
});

export default router;
