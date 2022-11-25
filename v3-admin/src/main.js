import { createApp } from 'vue';

import ElementPlus from 'element-plus';

import 'element-plus/dist/index.css';
import '@/style/global/index.scss';
import './index.css';

import App from './App.vue';
import router from './router';

// import './router/permission'
// import store from './store'

const app = createApp(App);
// app.use(store)

app.use(ElementPlus);

app.use(router).mount('#app');
// createApp(App).mount('#app')
