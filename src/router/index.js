import { createRouter, createWebHashHistory } from "vue-router";
import homeView from "../views/home-view.vue";
import aboutView from "../views/about-view.vue";
import authView from "../views/auth-view.vue";
import signUp from "../components/sign-up.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: homeView,
    },
    {
      path: "/about",
      name: "about",
      component: aboutView,
    },
    {
      path: "/auth",
      name: "auth",
      component: authView,
      children: [
        {
          path: "signup",
          component: signUp,
        },
      ],
    },
  ],
});

export default router;
