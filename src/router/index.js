import { createRouter, createWebHistory } from "vue-router";
import useAuthStore from "@/store/auth.store";
import pinia from "@/includes/pinia";
import AppLogin from "../views/auth/AppLogin.vue";
import AppSignUp from "../views/auth/AppSignUp.vue";
import AppHome from "../views/AppHome.vue";

const authStore = useAuthStore(pinia);

const routes = [
  {
    path: "/",
    name: "home",
    component: AppHome,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: AppLogin,
    meta: {
      authRoute: true,
    },
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: AppSignUp,
    meta: {
      authRoute: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (
    !authStore.isLoggedIn &&
    to.matched.some((route) => route.meta.requiresAuth)
  ) {
    return next({ name: "login" });
  }

  // user is logged in and tries to access login or signup page
  if (
    authStore.isLoggedIn &&
    to.matched.some((route) => route.meta.authRoute)
  ) {
    console.log("called");
    return next({ name: "home" });
  }

  return next();
});

export default router;
