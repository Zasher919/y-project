<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />

    <!-- 底部导航栏 -->
    <!-- <van-tabbar v-model="active">
      <van-tabbar-item
        v-for="item in tabbar"
        @click="goto(item.path)"
        :key="item.path"
        :icon="item.icon"
        >{{ item.text }}</van-tabbar-item
      >
    </van-tabbar> -->
  </div>
</template>

<script>
// import Vue from "vue";
// import { Tabbar, TabbarItem } from "vant";

// Vue.use(Tabbar);
// Vue.use(TabbarItem);

// export default {
//   name: "Layout",
//   data() {
//     return {
//       active: 0,
//       tabbar: [
//         {
//           path: "/home",
//           text: "首页",
//           icon: "home-o",
//         },
//         {
//           path: "/qa",
//           text: "问答",
//           icon: "search",
//         },
//         {
//           path: "/video",
//           text: "视频",
//           icon: "volume-o",
//         },
//         {
//           path: "/me",
//           text: "我的",
//           icon: "friends-o",
//         },
//       ],
//     };
//   },
//   created() {
//     this.tabbar.map((item, idx) => {
//       if (item.path === this.$route.path) {
//         this.active = idx;
//       }
//     });
//   },
//   methods: {
//     goto(path) {
//       this.$router.push(path);
//     },
//   },
//   components: {},
// };
</script>
<style scoped></style>
