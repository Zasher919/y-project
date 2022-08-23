import Vue from "vue";
import App from "./App.vue";

import demo from "./customPlugs/demo";
Vue.use(demo);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
