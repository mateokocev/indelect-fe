import { createRouter, createWebHistory } from "vue-router";
import { usePiniaStorage } from "../store/index.js";

import HomeView from "../views/home.vue";
import LoginVue from "../views/Login.vue";
import SignUp from "../views/Signup.vue";
import Exibit from "../views/Exibit.vue";
import BuyTicket from "../views/BuyTicket.vue";
import Explore from "../views/Explore.vue";
import Map from "../views/Map.vue";
import WrongDev from "../views/WrongDev.vue";
import CMSHome from "../views/CMSHome.vue";
import NoAccessDev from "../views/NoAccessDev.vue";
import TicketDetails from "../views/TicketDetails.vue";
import TicketList from "../views/TicketList.vue";
import Payment from "../views/Payment.vue";
import Checkout from "../views/Checkout.vue";




const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/home",
      name: "home",
      component: HomeView,
    },
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
      path: "/exibit",
      name: "Exibit",
      component: Exibit,
    },
    {
      path: "/buyticket",
      name: "BuyTicket",
      component: BuyTicket,
    },
    {
      path: "/explore",
      name: "Explore",
      component: Explore,
    },
    {
      path: "/map",
      name: "Map",
      component: Map,
    },
    {
      path: "/ticketdetails",
      name: "ticketdetails",
      component: TicketDetails,
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
      path: "/checkout",
      name: "checkout",
      component: Checkout,
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