import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/pokemon",
    name: "pokemon-landing",
    component: Home,
  },
  {
    path: "/pokemon/:id",
    name: "pokemon-detail",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Detail.vue"),
    props: true,
  },
  { path: "*", redirect: { name: "pokemon-landing" } },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
