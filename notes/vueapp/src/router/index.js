import Vue from "vue";
import Router from "vue-router";
// import { createRouter, createWebHashHistory } from "vue-router";

const router = new Router({
  routes: [
    {
      path: "/",
      redirect:'login',        
      children: [
        {
          path: "/",
          name: "login",
          component: () => import("@/views/Index.vue"),
        },
      ],
    },
    // {path: '/', redirect: '/home'},
  ],
});

// Vue.use(router);

export default router;
