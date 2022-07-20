<template>
  <div>
    <a-layout-header style="background: #fff; padding: 0; height: 200px">
      <!--内容头部title-->
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

        <!-- <span>333333333</span> -->
      </template>
      <div style="color: black; z-index: 333">
        <slot></slot>
      </div>
    </a-layout-header>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
