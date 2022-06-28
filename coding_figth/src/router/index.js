import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import InstructionPage from '../pages/InstructionPage.vue';
import GamePage from '../pages/GamePage.vue';
import EndGame from '../pages/Endgame.vue';
import LoginPage from '../pages/LoginPage.vue';

import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/instruction',
    name: 'instruction',
    component: InstructionPage,
  },
  {
    path: '/game',
    name: 'game',
    component: GamePage,
    meta: { requiresAuth: true },
  },
  {
    path: '/endgame',
    name: 'endgame',
    component: EndGame,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
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
