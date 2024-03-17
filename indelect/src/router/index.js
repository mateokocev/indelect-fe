import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import LoginVuie from '../views/Login.vue'
import SignUp from '../views/Signup.vue'
import Explore from '../views/explore.vue'
import BuyTicket from '../views/BuyTicket.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },

    {
      path: '/',
      name: 'login',
      component: LoginVuie
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/buyticket',
      name: 'BuyTicket',
      component: BuyTicket
    },
  ]
})

export default router
