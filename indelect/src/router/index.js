import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import LoginVue from '../views/Login.vue'
import SignUp from '../views/Signup.vue'
import Exibit from '../views/Exibit.vue'
import BuyTicket from '../views/BuyTicket.vue'
import Explore from '../views/Explore.vue'
import Map from '../views/Map.vue'
import WrongDev from '../views/WrongDev.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/warning',
      name: 'warning',
      component: WrongDev
    },
    {
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/exibit',
      name: 'Exibit',
      component: Exibit
    },
    {
      path: '/buyticket',
      name: 'BuyTicket',
      component: BuyTicket
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/map',
      name: 'Map',
      component: Map
    },

  ]
})

export default router