import Vue from "vue";
import App from "./App";
import cooluni from "./cl-uni";
import http from '@/common/utlis/request.js';
import config from '@/common/utlis/config.js'

Vue.config.productionTip = false;
Vue.prototype.$http = http
Vue.prototype.$config = config

App.mpType = "app";

Vue.use(cooluni);

const app = new Vue({
	...App
});
app.$mount();
