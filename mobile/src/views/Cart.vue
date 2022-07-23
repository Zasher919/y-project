<template>
  <div class="cart-box">
    <s-header :name="'购物车'" :noback="true"></s-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >


      <ul class="cart-list">
        <li class="cart-item" v-for="v in list" :key="v.id">
          <div class="li-checkbox">
            <van-checkbox-group v-model="selectedCart" @click="selectedEvent" ref="checkboxGroup">
              <van-checkbox :name="v.id" />
            </van-checkbox-group>
          </div>

          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" />

          <div class="name-price">
            <h6>{{ v.name }}</h6>
            <span>￥{{ v.price || '0' }}</span>
          </div>
        </li>
      </ul>
    </van-list>
    
    <van-submit-bar
      v-if="list.length > 0"
      class="submit-all van-hairline--top"
      :price="total * 100"
      button-text="结算"
      @submit="onSubmit"
    >
      <van-checkbox @click="allCheck" v-model="checkAll">全选</van-checkbox>
    </van-submit-bar>
    <div class="empty" v-if="!list.length">
      <img
        class="empty-cart"
        src="https://s.yezgea02.com/1604028375097/empty-car.png"
        alt="空购物车"
      />
      <div class="title">购物车空空如也</div>
      <van-button round color="#1baeae" type="primary" @click="goTo" block
        >前往选购</van-button
      >
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { reactive, onMounted, computed, toRefs, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from "vant";
import navBar from "@/components/NavBar";
import sHeader from "@/components/SimpleHeader";
import { deleteCartItem, modifyCart } from "@/service/cart";

export default {
  components: {
    navBar,
    sHeader
  },
  setup() {
    const router = useRouter();
    const store = useStore();
    const { proxy } = getCurrentInstance();
    const state = reactive({
      checked: false,
      list: [],
      selectedCart: [],
      loading: false,
      finished: false,
      all: false,
      result: [],
      checkAll: false
    });

    onMounted(() => {
      init();
    });

    const init = async () => {
      // Toast.loading({ message: "加载中...", forbidClick: true });
      let userinfo = JSON.parse(sessionStorage.getItem("userInfo"));
      console.log(userinfo, "userinfo");

      let data =
        userinfo &&
        (await proxy.$api.http("get", "api/h5/cart?userId=" + userinfo.id));

      state.list = data.data;
      // Toast.clear();
      console.log(state.list, "datas");

    };

    const onLoad = () => {};

    const total = computed(() => {
      // let sum = 0;
    
     let  a1 = state.list.filter(v=>state.selectedCart.includes(v.id))

     let a2 = a1.map(v=>Number(v.price))

    //  let a3 = [...a2].reduce((j,v)=>j+v) 
    //  console.log(a3)
    // let a4 = eval(a2.join("+")) 
    // console.log(a4,'a4')
    // console.log(a2,'a2')
      // let a1 = state.list(v=>state.selectedCart.includes(v.id))
    // console.log(a1,'a1');
      // let _list = state.list.filter(item =>
      //   state.result.includes(item.cartItemId)
      // );
      // _list.forEach(item => {
      //   sum += item.goodsCount * item.sellingPrice;
      // });
      return eval(a2.join("+")) || 0 ;
    });

    const goBack = () => {
      router.go(-1);
    };

    const goTo = () => {
      router.push({ path: "/home" });
    };
    const selectedEvent = ()=>{
     
      // let a1 = state.selectedCart.includes(v.id)
      let a2 = state.list.filter(v=>state.selectedCart.includes(v.id)).map(v=>Number(v.price)).reduce((j,v)=>j+v)
     
      console.log(a2)
    
      console.log(state.selectedCart,'selectedCart');
    }

    const onChange = async (value, detail) => {
      if (value > 5) {
        Toast.fail("超出单个商品的最大购买数量");
        return;
      }
      if (value < 1) {
        Toast.fail("商品不得小于0");
        return;
      }
      if (
        state.list.filter(item => item.cartItemId == detail.name)[0]
          .goodsCount == value
      )
        return;
      Toast.loading({ message: "修改中...", forbidClick: true });
      const params = {
        cartItemId: detail.name,
        goodsCount: value
      };
      await modifyCart(params);
      state.list.forEach(item => {
        if (item.cartItemId == detail.name) {
          item.goodsCount = value;
        }
      });
      Toast.clear();
    };

    const onSubmit = async () => {
      if (state.selectedCart.length == 0) {
        Toast.fail("请选择商品进行结算");
        return;
      }
      const params = JSON.stringify(state.selectedCart);
      router.push({ path: "/create-order", query: { cartItemIds: params } });
    };

    const deleteGood = async id => {
      await deleteCartItem(id);
      store.dispatch("updateCart");
      init();
    };

    const groupChange = result => {
      console.log(1);
      if (result.length == state.list.length) {
        console.log(2);
        state.checkAll = true;
      } else {
        console.log(3);
        state.checkAll = false;
      }
      state.result = result;
    };

    const allCheck = () => {
      if (state.checkAll) {
        state.selectedCart = state.list.map(item => item.id);
      } else {
        state.selectedCart = [];
      }
    };

    return {
      ...toRefs(state),
      total,
      selectedEvent,
      onLoad,
      goBack,
      goTo,
      onChange,
      onSubmit,
      deleteGood,
      groupChange,
      allCheck
    };
  }
};
</script>

<style lang="less">
@import "../common/style/mixin";
.cart-box {
  .cart-list {
    width: 100%;

    .cart-item {
      height: 2rem;
      margin-top: 0.3rem;
      // text-align: center;
      // line-height: 2rem;
      display: flex;

      .li-checkbox {
        display: inline-block;
        width: 1.5rem;
        padding: 0.75rem 0 0 0.75rem;
      }

      img {
        width: 2.5rem;
      }

      .name-price {
        h6 {
          margin: 0.5rem 0 0 0.5rem;
          padding: 0;
          font-weight: 700;
          font-size: 0.4rem;
          width: 4rem;
          height: 0.50rem;

          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space: nowrap;
        }
        span {
          display: inline-block;
          margin: 0.5rem 0 0 0.5rem;
        }
      }
    }
  }

  .cart-header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    .fj();
    .wh(100%, 44px);
    line-height: 44px;
    padding: 0 10px;
    .boxSizing();
    color: #252525;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    .cart-name {
      font-size: 14px;
    }
  }
  .cart-body {
    margin: 16px 0 100px 0;
    padding-left: 10px;
    .good-item {
      display: flex;
      .good-img {
        img {
          .wh(100px, 100px);
        }
      }
      .good-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        padding: 20px;
        .good-title {
          display: flex;
          justify-content: space-between;
        }
        .good-btn {
          display: flex;
          justify-content: space-between;
          .price {
            font-size: 16px;
            color: red;
            line-height: 28px;
          }
          .van-icon-delete {
            font-size: 20px;
            margin-top: 4px;
          }
        }
      }
    }
    .delete-button {
      width: 50px;
      height: 100%;
    }
  }
  .empty {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    margin-top: 200px;
    .empty-cart {
      width: 150px;
      margin-bottom: 20px;
    }
    .van-icon-smile-o {
      font-size: 50px;
    }
    .title {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .submit-all {
    margin-bottom: 50px;
    .van-checkbox {
      margin-left: 10px;
    }
    .van-submit-bar__text {
      margin-right: 10px;
    }
    .van-submit-bar__button {
      background: @primary;
    }
  }
  .van-checkbox__icon--checked .van-icon {
    background-color: @primary;
    border-color: @primary;
  }
}
</style>
