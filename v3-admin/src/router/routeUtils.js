// import Vue from 'vue';
// 生成首页路由
const routers = [];
export function generateIndexRouter(data) {

  generateChildRouters(data);


  let indexRouter = [
    {
      path: '/home2',
      name: 'home2',
      // component: () => import('@/components/layouts/BasicLayout'),
      // 生成首页标签
      // component: (resolve) => require(['@/components/layout/index'], resolve),
      component: () => import(/* webpackChunkName: "layout" */ '@/views/Home.vue'),
      // meta: { title: '首页' },
      // redirect: '/dashboard/Analysis',
      children: routers,
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true,
    },
  ];

  console.log('indexRouter', indexRouter);
  return indexRouter;
}

// 生成嵌套路由（子路由）

function generateChildRouters(data) {
  data.forEach((item) => {
    routers.push({
      path: item.url,
      name: item.name,
      // redirect: item.list[0] ? item.list[0].url : '',
      component: () => import(`@/views/${item.url}.vue`),
      // component: `@/${component}.vue`,
      // hidden: item.hide ? true : false,
      meta: {
        title: item.name,
        // icon: item.icon ? item.icon : '',
        internalOrExternal: false,
        keepAlive: false,
      },
    });

    return routers;
  });
}
