import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/exercicios',
      name: 'exercicios',
      component: () => import('../views/ExerciciosView.vue'),
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/SobreView.vue'),
    },
    {
      path: '/createExercicio',
      name: 'createExercicio',
      component: () => import('../views/CreateExercicioView.vue'),
    },
    {
      path: '/exerciciosList',
      name: 'exerciciosList',
      component: () => import('../views/ExerciciosListView.vue'),
    },
    {
      path: '/exercicio/:id/edit',
      name: 'editExercicio',
      component: () => import('../views/EditExercicioView.vue'),
    }
  ],
})

export default router
