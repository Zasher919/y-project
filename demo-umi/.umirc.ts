import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  theme: {
    '@primary-color': 'red',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/one', component: '@/pages/one' },
    { path: '/two', component: '@/pages/two' },
    { path: '/dva', component: '@/pages/dva' },
    { component: '@/pages/404' },
  ],
  fastRefresh: {},
  // mock: false, // 关闭mock请求
});
