<!--  -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>head</el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar>
            <el-menu :default-openeds="['1', '3']">
              <el-sub-menu index="1">
                <template #title>
            
                  系统管理
                </template>

                <el-menu-item index="1-1">菜单管理</el-menu-item>
                <el-menu-item index="1-2">用户管理</el-menu-item>
              </el-sub-menu>
              <el-menu-item index="1-1">产品管理</el-menu-item>
              <el-sub-menu index="2">
                <template #title>
                  
                  产品管理
                </template>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router';
import { mapState } from 'vuex'

// debugger
const router = useRouter();

const routerList = computed(() => {
    return mapState['routerList']
})

console.log(router.options);
</script>

<style lang="scss" scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>
