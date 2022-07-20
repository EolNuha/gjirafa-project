import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PostView from "../views/PostView.vue";
import UserView from "../views/UserView.vue";

const routes = [
  {
    path: "/",
    alias: ["/home"],
    name: "home",
    meta: {
      title: "Home Page",
    },
    component: HomeView,
  },
  {
    path: "/posts/:postId",
    name: "post",
    props: true,
    meta: {
      title: "Post Page",
    },
    component: PostView,
  },
  {
    path: "/users/:userId",
    name: "user",
    props: true,
    meta: {
      title: "User Page",
    },
    component: UserView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
