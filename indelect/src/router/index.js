import { createRouter, createWebHistory } from "vue-router";
import { usePiniaStorage } from "../store/index.js";

import LoginVue from "../views/Login.vue";
import SignUp from "../views/Signup.vue";
import WrongDev from "../views/WrongDev.vue";
import CMSHome from "../views/CMSHome.vue";
import NoAccessDev from "../views/NoAccessDev.vue";
import TicketList from "../views/TicketList.vue";
import Payment from "../views/Payment.vue";
import Science from "../views/ScienceMuseum.vue";
import Art from "../views/ArtMuseum.vue";
import HistoryMuseum from "../views/HistoryMuseum.vue";
import Tech from "../views/TechnologyMuseum.vue";




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
      path: "/map/Science Museum",
      name: "Science Museum",
      component: Science ,
    },
    {
      path: "/map/Art Museum",
      name: "Art Museum",
      component: Art ,
    },
    {
      path: "/map/History Museum",
      name: "History Museum",
      component: HistoryMuseum ,
    },
    {
      path: "/map/Technology Museum",
      name: "Technology Museum",
      component: Tech ,
    },
    
    {
      path: "/ticketlist",
      name: "ticketlist",
      component: TicketList,
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment,
    },
    {
      path: "/payment/:MuseumName", 
      name: "payment",
      component: () => import("../views/Payment.vue"),  
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