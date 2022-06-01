import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import InstructionPage from '../pages/InstructionPage.vue';
import GamePage from '../pages/GamePage.vue';

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
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
