<template>
  <router-link to="/">
    <logo />
  </router-link>
  <div class="ve_el_menu">
    <el-scrollbar>
      <el-menu router default-active="2" @close="handleClose">
        <template v-for="item in menuList" :key="item.id">
          <el-menu-item v-if="!item.children" :index="item.path">
            {{ item.meta.title }}
          </el-menu-item>

          <template v-if="item.children && item.children.length > 0">
            <el-sub-menu>
              <template #title>
                {{ item.meta.title }}
              </template>
              <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
                {{ child.meta.title }}
              </el-menu-item>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import store from '@/store';
import { menuList } from '@/router/routerList';

const router = useRouter();
// let menus = menuList;

console.log('sideBar-mounted', menuList);
</script>

<style lang="scss" scoped>
.ve_el_menu {
  background: red;
  height: calc(100vh - v-bind(nav_height));
}
</style>
