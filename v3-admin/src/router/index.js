import { createRouter, createWebHistory } from 'vue-router';
import { menuList } from './routerList';
import { getToken } from '@/utils/auth';

// 省略了routes 中的路由规则
const routes = [
  {
    path: '/',
    name: 'AppMain',
    component: () => import('@/views/AppMain.vue'),
    redirect: { name: 'Home' },
    children: menuList,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },
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
