import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/HomePage.vue';
import PrincipalPage from '../pages/PrincipalPage.vue';
import InstructionPage from '../pages/InstructionPage.vue';
import ContentsPage from '../pages/ContentsPage.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/principal',
    name: 'principal',
    component: PrincipalPage,
  },
  {
    path: '/instruction',
    name: 'instruction',
    component: InstructionPage,
  },
  {
    path: '/contents',
    name: 'contents',
    component: ContentsPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
