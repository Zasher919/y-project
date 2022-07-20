<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div class="categray">
    <div>
      <header class="category-header wrap van-hairline--bottom">
        <i class="nbicon nbfanhui" @click="goHome"></i>
        <div class="header-search">
          <i class="nbicon nbSearch"></i>
          <router-link
            tag="span"
            class="search-title"
            to="./product-list?from=category"
            >全场50元起步</router-link
          >
        </div>
        <i class="iconfont icon-More"></i>
      </header>
      <nav-bar></nav-bar>
      <div class="search-wrap" ref="searchWrap">
        <list-scroll :scroll-data="categoryData" class="nav-side-wrapper">
          <ul class="nav-side">
            <li
              v-for="(item, i) in categoryData"
              :key="item.id"
              v-text="item.name"
              :class="{ active: currentIndex == i }"
              @click="selectMenu(item, i)"
            ></li>
          </ul>
        </list-scroll>
        <div class="search-content">
          <!-- <list-scroll :scroll-data="categoryData"> -->
          <!-- <div class="swiper-container">
            <div class="swiper-wrapper">
              <template v-for="(category, index) in categoryData">
                <div
                  class="swiper-slide"
                  v-if="currentIndex == category.id"
                  :key="index"
                >
                  <div class="category-list">
                    <p class="catogory-title">{{ category.name }}</p>
                    <div class="product-item" @click="selectProduct(product)">
                      <img :src="category.pic" class="product-img" />
                      <p v-text="product.content" class="product-title"></p>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div> -->
          <!-- </list-scroll> -->

          <div
            class="swiper-container"
            v-for="(category, index) in rightData"
            :key="index"
          >
            <!-- <div class="swiper-wrapper"> -->
            <div class="category-list">
              <p class="catogory-title">{{ category.name }}</p>
              <div class="product-item" @click="selectProduct(product)">
                <img :src="imgApi + category.pic" class="product-img" />
              </div>
              <!-- </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref, toRefs, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import navBar from "@/components/NavBar";
import listScroll from "@/components/ListScroll";
// import { getCategory } from "@/service/good";
// import { Toast } from "vant";
export default {
  components: {
    navBar,
    listScroll
  },
  setup() {
    const router = useRouter();

    const { proxy } = getCurrentInstance();
    // composition API 获取 refs 的形式
    const searchWrap = ref(null);
    const state = reactive({
      categoryData: [],
      currentIndex: 0,
      rightData: [],
      imgApi: process.env.VUE_APP_BASE_HOST
    });

    onMounted(async () => {
      //product/category/list
      const { data } = await proxy.$api.http("get", `api/product-categories`);
      console.log("daat", data);
      // let $screenHeight = document.documentElement.clientHeight;
      // console.log("searchWrap.value", searchWrap.value);
      // searchWrap.value.style.height = $screenHeight - 100 + "px";
      // Toast.loading("加载中...");
      // const { data } = await getCategory();
      // Toast.clear();

      state.categoryData = data;
      selectMenu(data[0], 0);
    });

    const goHome = () => {
      router.push({ path: "home" });
    };

    const selectMenu = async (row, index) => {
      let { data } = await proxy.$api.http("get", `api/products`, {
        page: 1,
        limit: 10,
        sort: "+id",
        category: row.id
      });
      console.log("res", data);
      state.rightData = data;
      state.currentIndex = index;
    };

    const selectProduct = item => {
      console.log("item", item.categoryId);
      router.push({
        path: "/product-list",
        query: { categoryId: item.categoryId }
      });
    };
    return {
      ...toRefs(state),
      goHome,
      selectMenu,
      selectProduct,
      searchWrap
    };
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/mixin";

.search-content {
  display: flex !important;
  justify-content: flex-start;
  flex-wrap: wrap;
  .swiper-container {
    display: inline-block;
    width: 49% !important;
    // margin-left: 5px;
    // margin-right: 5px;
    .catogory-title {
      text-align: center;
      width: 100%;
      height: 16px;
      overflow: hidden;
    }

    img {
      width: 120px;
      height: 82px;
    }
  }
}

.categray {
  .category-header {
    background: #fff;
    position: fixed;
    left: 0;
    top: 0;
    .fj();
    .wh(100%, 50px);
    line-height: 50px;
    padding: 0 15px;
    box-sizing: border-box;
    font-size: 15px;
    color: #656771;
    z-index: 10000;
    &.active {
      background: @primary;
    }
    .icon-left {
      font-size: 25px;
      font-weight: bold;
    }
    .header-search {
      display: flex;
      width: 80%;
      height: 20px;
      line-height: 20px;
      margin: 10px 0;
      padding: 5px 0;
      color: #232326;
      background: #f7f7f7;
      border-radius: 20px;
      .nbSearch {
        padding: 0 10px 0 20px;
        font-size: 17px;
      }
      .search-title {
        font-size: 12px;
        color: #666;
        line-height: 21px;
      }
    }
    .icon-More {
      font-size: 20px;
    }
  }
}
.search-wrap {
  .fj();
  width: 100%;
  margin-top: 50px;
  background: #f8f8f8;
  .nav-side-wrapper {
    width: 28%;
    height: 100%;
    overflow: hidden;
    .nav-side {
      width: 100%;
      .boxSizing();
      background: #f8f8f8;
      li {
        width: 100%;
        height: 56px;
        text-align: center;
        line-height: 56px;
        font-size: 14px;
        &.active {
          color: @primary;
          background: #fff;
        }
      }
    }
  }
  .search-content {
    width: 72%;
    height: 100%;
    padding: 0 10px;
    background: #fff;
    overflow-y: scroll;
    touch-action: pan-y;
    * {
      touch-action: pan-y;
    }
    .boxSizing();
  }
}
.fade-out-enter-active,
.fade-out-leave-active {
  // transition: opacity 0.5s;
}

.fade-out-enter,
.fade-out-leave-to {
  // opacity: 0;
}
</style>
