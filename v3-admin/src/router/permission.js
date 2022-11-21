import router from './index';
import { getToken } from '@/utils/auth';
import store from '../store';
import mainRoutes from './mainRoutes';

// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach(async (to, from, next) => {
  // debugger
  let token = getToken();
  // 判断有没有登录
  if (token) {
    if (to.name == 'login') {
      next();
    } else {
      if (!localStorage.getItem('menus')) await store.dispatch('GetPermissionList');

      let menus = JSON.parse(localStorage.getItem('menus'));
      let routes = [];
      menus.forEach((item) => {
        let menu = {
          name: item.name,
          path: item.name,
          component: () => import(/* webpackChunkName: "login" */ `@/views/${item.url}.vue`),
        };

        routes.push(menu);
      });

      mainRoutes.children = mainRoutes.children.concat(routes);

      await router.addRoute(mainRoutes);
      await router.addRoute({
        path: '/:w+',
        redirect: { name: '404' },
      });
      next();
    }
  } else {
    router.push('/login');
  }
});
