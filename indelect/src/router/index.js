import { createRouter, createWebHistory } from "vue-router";
import { usePiniaStorage } from "../store/index.js";

import LoginVue from "../views/Login.vue";
import SignUp from "../views/Signup.vue";
import WrongDev from "../views/WrongDev.vue";
import CMSHome from "../views/CMSHome.vue";
import NoAccessDev from "../views/NoAccessDev.vue";
import Museum from "../views/Museum.vue";
import Tickets from "../views/Tickets.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/warning",
      name: "warning",
      component: WrongDev,
      meta: { requiresAuth: true}
    },
    {
      path: "/cms/home",
      name: "cmshome",
      component: CMSHome,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: "/noaccess",
      name: "noaccess",
      component: NoAccessDev,
    },
    {
      path: "/",
      name: "login",
      component: LoginVue,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
    },
    {
      path: '/map/:museumType/:userEmail?',
      name: 'museum',
      component: Museum,
      meta: { requiresAuth: true }
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: Tickets
    },
  ],
});

router.beforeEach((to, from, next) => {
  const piniaStorage = usePiniaStorage();
  const isAuthenticated = !!piniaStorage.jwt;
  const isAdmin = piniaStorage.isAdmin;

  if (to.path.startsWith("/cms/")) {
    if (!isAuthenticated) {
      next({ name: "noaccess" });
    } 
    else if (to.matched.some((record) => record.meta.requiresAdmin) && !isAdmin) {
      next({ name: "noaccess" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;