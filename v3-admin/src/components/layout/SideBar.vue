<template>
  <router-link to="/">
    <logo />
  </router-link>
  <div class="ve_el_menu">
    <el-scrollbar>
      <el-menu router default-active="2"  @close="handleClose">
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>
          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="test">
          <el-icon><icon-menu /></el-icon>
          <span>测试</span>

        </el-menu-item>
        <el-menu-item index="home">
          <el-icon><document /></el-icon>
          <span>首页</span>

        </el-menu-item>
        <el-menu-item index="TestTwo">
          <el-icon><setting /></el-icon>
          <span>测试第二</span>

        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
// import Logo from "./components/Logo";
// import SlideMenu from "./components/SlideMenu";

// const store = useStore();
const router = useRouter();
let menus = JSON.parse(localStorage.getItem('menus'));

const menuSelect = (index, path) => {
  router.push({ path: '/' + index });
  console.log(index, path, 'index, path');
};
</script>

<style lang="scss" scoped>
// a:active {
//   color: $base-color;
// }
// .ve_el_menu {
//   background: $sideBgColor;
//   height: calc(100vh - v-bind(nav_height));
// }
</style>
