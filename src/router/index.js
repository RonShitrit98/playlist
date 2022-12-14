import { createRouter, createWebHashHistory } from "vue-router";
import homeView from "../views/home-view.vue";
import aboutView from "../views/about-view.vue";
import authView from "../views/auth-view.vue";
import signUp from "../components/auth/sign-up.vue";
import logIn from "../components/auth/log-in.vue";
import createUser from "../components/user/create-user.vue";
import profileView from "../views/profile-view.vue";
import createView from "../views/create-view.vue";
import createPost from "../components/post/create-post.vue";

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
      path: "/profile/:id",
      name: "profile",
      component: profileView,
    },
    {
      path: "/create",
      name: "create",
      component: createView,
      children: [
        {
          path: "post",
          component: createPost,
        },
      ],
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
        {
          path: "login",
          component: logIn,
        },
        {
          path: "create",
          component: createUser,
        },
      ],
    },
  ],
});

export default router;
