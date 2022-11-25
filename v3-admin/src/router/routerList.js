export const menuList = [
  {
    path: 'home',
    name: 'Home',
    meta: { title: '首页' },
    component: () => import('@/views/Home.vue'),
  },
  {
    path: 'sys',
    name: 'sys',
    redirect: '/sys-menu-list',
    meta: { title: '系统管理' },
    children: [
      {
        path: '/sys-menu-list',
        name: 'MenuList',
        meta: { title: '菜单管理' },
        component: () => import('@/views/sys/MenuList.vue'),
      },
      {
        path: '/sys-user-list',
        name: 'UserList',
        meta: { title: '用户管理' },
        component: () => import('@/views/sys/UserList.vue'),
      },
      {
        path: '/sys-dict-list',
        name: 'DictList',
        meta: { title: '字典管理' },
        component: () => import('@/views/sys/DictList.vue'),
      },
    ],
  },
];
