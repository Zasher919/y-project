import { createRouter, createWebHistory } from 'vue-router';

// 省略了routes 中的路由规则
const routes = [
  {
    path: '/',
    name: 'AppMain',
    component: () => import('@/views/AppMain.vue'),
    redirect: { name: 'Home' },
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: 'test',
        name: 'Test',
        component: () => import('@/views/Test.vue'),
      }
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/Index.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },

  // {
  //   path: '/',
  //   name: 'index',
  //   component: () => import(/* webpackChunkName: "login" */ '@/components/layout/Index.vue'),
  // },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import(/* webpackChunkName: "login" */ '@/views/Home.vue'),
  // },
  // @/views/Home.vue
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
