import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/* Router Modules */
// import componentsRouter from './modules/components'
// import nestedRouter from './modules/nested'

import aboutRouter from "./modules/about";
import userRouter from "./modules/user";
import productRouter from "./modules/product";
import homeRouter from "./modules/home";
import fileRouter from "./modules/file";
import demoRouter from "./modules/demo";
import sysRouter from "./modules/sys";

// export const constantRoutes = [
//   {
//     path: "/redirect",
//     component: Layout,
//     hidden: true,
//     children: [
//       {
//         path: "/redirect/:path(.*)",
//         component: () => import("@/views/redirect/index")
//       }
//     ]
//   },

//   {
//     path: "/login",
//     component: () => import("@/views/login/index"),
//     hidden: true
//   },
//   {
//     path: "/auth-redirect",
//     component: () => import("@/views/login/auth-redirect"),
//     hidden: true
//   },
//   {
//     path: "/404",
//     component: () => import("@/views/error-page/404"),
//     hidden: true
//   },
//   {
//     path: "/401",
//     component: () => import("@/views/error-page/401"),
//     hidden: true
//   },
//   {
//     path: "/",
//     component: Layout,
//     redirect: "/home/dashboard",
//     children: []
//   },
//   sysRouter,
//   homeRouter,
//   aboutRouter,
//   productRouter,
//   userRouter,
//   fileRouter,
//   demoRouter
// ];

export const constantRoutes = [
  {
    path: "/test",
    // name: "test",
    component: () => import("@/views/demo/test")
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true
  }
];
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // nestedRouter,

  {
    path: "/error",
    component: Layout,
    redirect: "noRedirect",
    name: "ErrorPages",
    hidden: true,
    meta: {
      title: "errorPages",
      icon: "404"
    },
    children: [
      {
        path: "401",
        component: () => import("@/views/error-page/401"),
        name: "Page401",
        meta: { title: "page401", noCache: true }
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404"),
        name: "Page404",
        meta: { title: "page404", noCache: true }
      }
    ]
  }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
