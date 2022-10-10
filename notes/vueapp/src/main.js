import Vue from "vue";


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// import '@/styles/index.scss' // global css


import App from "./App.vue";
import router from './router';



// import demo from "./customPlugs/demo";
// Vue.use(demo);
Vue.use(ElementUI)

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");


