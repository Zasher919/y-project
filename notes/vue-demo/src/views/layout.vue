<template>
  <!--顶级Laytou 容器-->
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <!--侧边栏容器-->
    <a-layout-sider v-model="collapsed" collapsible>
      <!--logo-->
      <div class="logo">
        <img src="" class="circleImg" />
      </div>
      <!--
                :default-selected-keys="['1']"   初始选中的 子菜单想
                mode   菜单模式  inline为内嵌模式
            -->

      <a-menu
        theme="dark"
        :selectedKeys="menuKey"
        :default-selected-keys="menuKey"
        mode="inline"
      >
        <!--一级菜单-->
        <a-menu-item
          @click="aaaaa(v.path)"
          v-for="v in routers.children"
          :key="v.path"
        >
          <a-icon type="user" />
          <span>{{ v.name }}</span>
          <router-link :to="v.path"></router-link>
        </a-menu-item>
        <!--
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="setting" theme="filled" />
            <span>系统管理</span>
          </span>
          二级菜单 路由嵌套跳转
          <a-menu-item key="1" @click="changeMenu('admin')">
            管理员
          </a-menu-item>
          <a-menu-item key="2" @click="changeMenu('role')"> 角色 </a-menu-item>
          <a-menu-item key="3" @click="changeMenu('admin')"> 菜单 </a-menu-item>
        </a-sub-menu>-->
      </a-menu>
    </a-layout-sider>
    <!--右边主要内容-->
    <a-layout>
      <!--右边头部-->
      <a-layout-header style="background: #fff; padding: 0; height: 200px">
        <template class="h-tag">
          <span
            :class="routerIndex == i ? 'cr' : ''"
            @click="btnLink(v.path, i)"
            v-for="(v, i) in routers.children"
            :key="v.path"
            :to="v.path"
            style="margin: 0 20px"
            >{{ v.name }}</span
          >
        </template>

        <customHead class="h-common" />
      </a-layout-header>
      <!--右边内容-->
      <a-layout-content style="margin: 0 16px">
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <!--定义路由出口-->
          <router-view />
        </div>
      </a-layout-content>
      <!--右边页脚-->
      <a-layout-footer style="text-align: center">
        ThinkPHP5.1_vue2.x_Base-admin ©2020 Created by makalo
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import router from "../router/";
import customHead from "@/components/customHead.vue";
export default {
  components: {
    customHead,
  },
  data() {
    return {
      collapsed: false,
      routers: [],
      menuKey: ["/data1"],
      routerIndex: 0,
    };
  },
  mounted() {
    this.routers = router.options.routes[0];
  },
  methods: {
    aaaaa(path) {
      console.log("333", this.routers);
      let list = [path];
      this.menuKey = list;
      let index = this.routers.children.findIndex((v) => v.path == path);
      this.routerIndex = index;
      // this.btnLink(path, index);
      console.log("this.key", this.menuKey);

      // this.$router.push({ path });
    },
    btnLink(path, i) {
      this.routerIndex = i;
      let list = [path];
      this.menuKey = list;
      console.log("this.key", this.menuKey);

      this.$router.push({ path });
    },
    btnTag() {
      console.log("333");
    },
    //路由内容切换
    // changeMenu(route) {
    //   console.log(route);
    //   //获取路由对象并切换
    //   this.$router.push(route);
    // },
  },
};
</script>

<style>
.h-tag {
  height: 50px;
  background: pink;
}
.h-content {
  height: 100px;
  background: red;
}

.h-common {
  height: 20px;
  background: blue;
}
/*logo 样式*/
/*#components-layout-demo-side .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }*/
/*logo 圆角*/
.circleImg {
  border-radius: 30px;
  width: 60px;
  height: 60px;
}

.cr {
  color: red;
}
</style>
