import { createStore } from 'vuex';


import user from './modules/user.js';
import getters from './getters.js';


const store = new createStore({
  modules:{
    user
  },
  getters,
});

export default store;
