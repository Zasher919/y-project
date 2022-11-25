<!--  -->
<template>
  <div>
    <el-container class="layout-container-demo" style="height: 500px">
      <el-aside width="200px">
        <!-- 左侧菜单 -->
        <SideBar />
      </el-aside>
      <el-container>

        <el-header>
          头部内容
          <!-- <navigate-bar></navigate-bar> -->
        </el-header>
        <el-main>
          <el-scrollbar style="padding: 20px; box-sizing: border-box; background: #fff">
            <router-view v-slot="{ Component }">
              <transition name="el-zoom-in-top" mode="out-in">
                <component :key="routerAlive" :is="Component" />
              </transition>
            </router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideBar from '@/components/layout/SideBar.vue';
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const routerAlive = ref(null);
watchEffect(() => {
  routerAlive.value = route.name;
  console.log('route.name', route.name);
  //   debugger;
});
</script>

<style scoped>

</style>
