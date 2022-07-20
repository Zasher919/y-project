/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const fileRouter = {
  path: '/file',
  component: Layout,
  redirect: '/file/list',
  name: 'file',
  meta: {
    title: '文件管理',
    icon: 'tab',
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/file/list'),
      name: 'fileListManagement',
      meta: { title: '文件管理', noCache: true },
    },
   
  ],
}
export default fileRouter
