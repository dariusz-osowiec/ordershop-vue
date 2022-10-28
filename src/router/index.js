import { createRouter, createWebHistory, } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/summary",
    name: "summary",
    component: () => import("../views/SummaryView.vue"),
    props: true
  },
  {
    path: "/basket",
    name: "basket",
    component: () => import("../views/BasketView.vue"),
    props: true
  },
  {
    path: "/confirmation",
    name: "confirmation",
    component: () => import("../views/ConfirmationView.vue"),
    props: true
  },
  {
    path: "/privacy",
    name: "privacy",
    component: () => import("../views/PrivacyView.vue"),
  },
  {
    path: "/account",
    name: "account",
    component: () => import("../views/PrivacyView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
