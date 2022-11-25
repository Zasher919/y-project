import router from './index';
import { getToken } from '@/utils/auth';
import store from '../store';
import mainRoutes from './mainRoutes';
import { generateChildRouters } from './routeUtils';

// 全局守卫：登录拦截 本地没有存token,请重新登录
router.beforeEach(async (to, from, next) => {
  // debugger;
  let token = getToken();
  // 判断有没有登录
  if (token) {
    if (to.name == 'login') {
      next();
    } else {
      let menus = [];
      let routes = [];
      // console.log('vue-menu', store.getters.permissionList.length);
      if (store.getters.permissionList.length === 0) {
        let { menuList } = await store.dispatch('GetPermissionList');
        console.log('menuList', menuList);
        routes = test(menuList);
      }

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

function test(data) {
  const list = [];

  data.forEach((item) => {
    let route = {
      path: item.url.replace(/\//g, '-') + `-${item.id}`,
      component: null,
      name: item.url.replace(/\//g, '-') + `-${item.id}`,
      // meta: {
      // }
    };

    if (item.type == 1) {
      console.log('route-path',route.path);
      console.log('`@/views/${item.component}.vue`',`@/views/${item.component}.vue`);
      route['component'] = () => import(`@/views/${item.component}.vue`);
      list.push(route);
    }

    let path = '';
    let menu = null;
    // let modules = import.meta.glob('../views/* */*.vue');

    if (item.type == 2) {
      path = `views/${item.component}`;
      console.log('path', path);
      const l = 'views/' + item.component;
      menu = {
        name: item.name,
        path: item.url,
        // component: () => import(`@/${path}.vue`),
        // component: () => import(/* webpackChunkName: "login" */ `@/views/${path ? path : item.component}.vue`),
      };
      // menu['component'] = () => import('@/' + l + '.vue');
    }

    // let pathTwo = item.url.split('/')[0];
    // if (item.url.includes('sys/')) {
    //   path = 'sys' + '/' + item.component;
    //   console.log('path', item.url);
    // }c

    // if (item.type == 2) {
    //   list.push(menu);
    // }
  });

  console.log('list', list);
  return list;
}
