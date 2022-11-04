<template>
  <div>
    <header class="home-header wrap" :class="{ active: headerScroll }">
      <router-link tag="i" to="./category"
        ><i class="nbicon nbmenu2"></i
      ></router-link>
      <div class="header-search">
        <span class="app-name">购物软件</span>
        <i class="iconfont icon-search"></i>
        <router-link
          tag="span"
          class="search-title"
          to="./product-list?from=home"
          >山河无恙，人间皆安</router-link
        >
      </div>
      <router-link class="login" tag="span" to="./login" v-if="!isLogin"
        >登录</router-link
      >
      <router-link class="login" tag="span" to="./user" v-else>
        <van-icon name="manager-o" />
      </router-link>
    </header>
    <nav-bar />

    <!-- 轮播图 -->
    <swiper :list="swiperList"></swiper>
    <!-- 图标 -->
    <div class="category-list">
      <div
        v-for="item in categoryList"
        v-bind:key="item.categoryId"
        @click="tips(item.toPath)"
      >
        <img :src="item.imgUrl" />
        <span>{{ item.imgName }}</span>
      </div>
    </div>
    <!-- 产品列表 -->
    <div class="good">
      <header class="good-header">新品上线</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-box">
          <div
            class="good-item"
            v-for="item in newGoodses"
            :key="item.id"
            @click="goToDetail(item)"
          >
            <img :src="imgHeadUrl + item.pic" alt="" />
            <div class="good-desc">
              <div class="title">{{ item.name }}</div>
              <div class="price">¥ {{ item.price }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
    <div class="good">
      <header class="good-header">热门商品</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-box">
          <div
            class="good-item"
            v-for="item in hots"
            :key="item.goodsId"
            @click="goToDetail(item)"
          >
            <img :src="item.productCoverImg" alt="" />
            <div class="good-desc">
              <div class="title">{{ item.productName }}</div>
              <div class="price">¥ {{ item.productPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
    <div class="good" :style="{ paddingBottom: '100px' }">
      <header class="good-header">最新推荐</header>
      <van-skeleton title :row="3" :loading="loading">
        <div class="good-box">
          <div
            class="good-item"
            v-for="item in recommends"
            :key="item.goodsId"
            @click="goToDetail(item)"
          >
            <img :src="item.productCoverImg" alt="" />
            <div class="good-desc">
              <div class="title">{{ item.productName }}</div>
              <div class="price">¥ {{ item.productPrice }}</div>
            </div>
          </div>
        </div>
      </van-skeleton>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
// import { imgEnum } from "../utils/enum";
import { Toast } from "vant";
import swiper from "@/components/Swiper";
import navBar from "@/components/NavBar";
export default {
  name: "home",
  components: {
    swiper,
    navBar
  }
};
  const router = useRouter();
const state = reactive({
  swiperList: [], // 轮播图列表
  isLogin: false, // 是否已登录
  headerScroll: false, // 滚动透明判断
  hots: [],
  imgHeadUrl: "https://4h1s324364.qicp.vip/",
  newGoodses: [],
  recommends: [],
  categoryList: [],
  loading: true
});

onMounted(() => {
  console.log("home-mounted", state);
  init();
});

function init() {
  Toast.loading({ message: "加载中...", forbidClick: true });
  console.log('router',router)
  console.log("init");

  setTimeout(() => {
    Toast.clear();
  }, 3000);

  // router.push('/login');
}

// setup() {

//   const { proxy } = getCurrentInstance();
//   const state = reactive({
//     swiperList: [], // 轮播图列表
//     isLogin: false, // 是否已登录
//     headerScroll: false, // 滚动透明判断
//     hots: [],
//     imgHeadUrl: "https://4h1s324364.qicp.vip/",
//     newGoodses: [],
//     recommends: [],
//     categoryList: [],
//     loading: true
//   });
//   onMounted(async () => {

//     initHomeIcon();
//     initProdectList();

//   });

//   const initHomeIcon = async () => {
//     const { data } = await proxy.$api.http("get", `/api/img`);
//     state.categoryList = data.filter(v => v.imgType == "1");
//     state.swiperList = data.filter(v => v.imgType == "2");
//     state.categoryList = state.categoryList.map(v => ({
//       ...v,
//       imgUrl: state.imgHeadUrl + v.imgUrl
//     }));
//     state.swiperList = state.swiperList.map(v => ({
//       ...v,
//       imgUrl: state.imgHeadUrl + v.imgUrl
//     }));
//   };

//   const initHomeSlideshow = async () => {
//     const { code, data } = await proxy.$api.http(
//       "get",
//       `/img/${imgEnum.homeSlideshow}`
//     );

//     if (code != 200) {
//       Toast.loading({
//         message: "数据异常",
//         forbidClick: true
//       });
//     }
//     state.swiperList = data[0];
//   };

//   const initProdectList = async () => {
//     const res = await proxy.$api.http("get", `api/products`);
//     state.newGoodses = res.data;
//     state.loading = false;
//     res.data.forEach(v => {
//       console.log("pic", state.imgHeadUrl + v.pic);
//     });
//     console.log("res", state.newGoodses);
//   };

//   nextTick(() => {
//     window.addEventListener("scroll", () => {
//       let scrollTop =
//         window.pageYOffset ||
//         document.documentElement.scrollTop ||
//         document.body.scrollTop;
//       scrollTop > 100
//         ? (state.headerScroll = true)
//         : (state.headerScroll = false);
//     });
//   });

//   const goToDetail = item => {
//     router.push({ path: `/product/${item.id}` });
//   };

//   const tips = path => {
//     // Toast("敬请期待");
//     router.push({ path: path || "/category" });
//   };

//   // return {
//   //   ...toRefs(state),
//   //   goToDetail,
//   //   initHomeIcon,
//   //   initHomeSlideshow,
//   //   initProdectList,
//   //   // init,
//   //   tips
//   // };
// }
// };
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.home-header {
  position: fixed;
  left: 0;
  top: 0;
  .wh(100%, 50px);
  .fj();
  line-height: 50px;
  padding: 0 15px;
  .boxSizing();
  font-size: 15px;
  color: #fff;
  z-index: 10000;
  .nbmenu2 {
    color: @primary;
  }
  &.active {
    background: @primary;
    .nbmenu2 {
      color: #fff;
    }
    .login {
      color: #fff;
    }
  }

  .header-search {
    display: flex;
    .wh(74%, 20px);
    line-height: 20px;
    margin: 10px 0;
    padding: 5px 0;
    color: #232326;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    .app-name {
      padding: 0 10px;
      color: @primary;
      // font-size: 20px;
      font-size: 16px;
      // font-weight: bold;
      border-right: 1px solid #666;
    }
    .icon-search {
      padding: 0 10px;
      font-size: 17px;
    }
    .search-title {
      font-size: 12px;
      color: #666;
      line-height: 21px;
    }
  }
  .icon-iconyonghu {
    color: #fff;
    font-size: 22px;
  }
  .login {
    color: @primary;
    line-height: 52px;
    .van-icon-manager-o {
      font-size: 20px;
      vertical-align: -3px;
    }
  }
}
.category-list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  width: 100%;
  padding-bottom: 13px;
  div {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    img {
      .wh(36px, 36px);
      margin: 13px auto 8px auto;
    }
  }
}
.good {
  .good-header {
    background: #f9f9f9;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    font-size: 16px;
    font-weight: 500;
  }
  .good-box {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .good-item {
      box-sizing: border-box;
      width: 50%;
      border-bottom: 1px solid #e9e9e9;
      padding: 10px 10px;
      img {
        display: block;
        width: 120px;
        margin: 0 auto;
      }
      .good-desc {
        text-align: center;
        font-size: 14px;
        padding: 10px 0;
        .title {
          color: #222333;
        }
        .price {
          color: @primary;
        }
      }
      &:nth-child(2n + 1) {
        border-right: 1px solid #e9e9e9;
      }
    }
  }
}
.floor-list {
  width: 100%;
  padding-bottom: 50px;
  .floor-head {
    width: 100%;
    height: 40px;
    background: #f6f6f6;
  }
  .floor-content {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    .boxSizing();
    .floor-category {
      width: 50%;
      padding: 10px;
      border-right: 1px solid #dcdcdc;
      border-bottom: 1px solid #dcdcdc;
      .boxSizing();
      &:nth-child(2n) {
        border-right: none;
      }
      p {
        font-size: 17px;
        color: #333;
        &:nth-child(2) {
          padding: 5px 0;
          font-size: 13px;
          color: @primary;
        }
      }
      .floor-products {
        .fj();
        width: 100%;
        img {
          .wh(65px, 65px);
        }
      }
    }
  }
}
</style>
