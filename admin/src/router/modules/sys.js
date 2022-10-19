import Layout from "@/layout";

const sysRouter = {
  path: "/sys",
  component: Layout,
  redirect: "/product/menu",
  name: "Sys",
  meta: {
    title: "sys",
    icon: "example"
  },
  children: [
    {
      path: "/menu",
      component: () => import("@/views/sys/menu.vue"),
      name: "sysMenu",
      meta: { title: "sysMenu", noCache: true }
    },
    {
      path: "/dict",
      component: () => import("@/views/sys/dict.vue"),
      name: "sysDict",
      meta: { title: "sysDict", noCache: true }
    }
  ]
};

export default sysRouter;
