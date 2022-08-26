/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

const fileRouter = {
  path: "/demo",
  component: Layout,
  redirect: "/demo",
  name: "demo",
  meta: {
    title: "空白页",
    icon: "tab"
  },
  children: [
    {
      path: "demo",
      component: () => import("@/views/demo"),
      name: "demo",
      meta: { title: "空白页1", noCache: true }
    }
  ]
};
export default fileRouter;
