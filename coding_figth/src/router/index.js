import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import InstructionPage from '../pages/InstructionPage.vue';
import GamePage from '../pages/GamePage.vue';
import EndGame from '../pages/Endgame.vue';
import LoginPage from '../pages/LoginPage.vue';
import TurmasPage from '../pages/TurmasPage.vue';
import TurmaInfo from '../pages/TurmaInfo.vue';
import SelecaoTema from '../pages/SelecaoTema.vue';
import RankingPage from '../pages/RankingPage.vue';
import DesafiosPage from '../pages/DesafiosPage.vue';
import SugestionsPage from '../pages/SugestionsPage.vue';

// import store from '../store/index';

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
    path: '/endgame/:hp:hpinimigo',
    props: true,
    component: EndGame,
    meta: { requiresAuth: true },
  },
  {
    path: '/ranking',
    props: true,
    component: RankingPage,
  },
  {
    path: '/sugestions',
    props: true,
    component: SugestionsPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/turmas',
    component: TurmasPage,
    meta: { requiresAuth: true },
    // meta: { requiresAuth: true, requiresProf: true },
  },
  {
    path: '/turmas/:id',
    component: TurmaInfo,
    meta: { requiresAuth: true },
  },
  {
    path: '/desafios',
    component: DesafiosPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/tema',
    component: SelecaoTema,
    meta: { requiresAuth: true },
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
  if (to.meta.requiresAuth && !localStorage.getItem('userId')) next('/login');
  else next();
});

export default router;
