import { menuList } from '@/api';

const user = {
  state: {
    token: '',
    username: '',
    realname: '',
    welcome: '',
    avatar: '',
    permissionList: [],
    userInfo: {},
    roleIdList: [],
    routerList: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, { username, realname, welcome }) => {
      state.username = username;
      state.realname = realname;
      state.welcome = welcome;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_PERMISSIONLIST: (state, permissionList) => {
      state.permissionList = permissionList;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    },
    SET_ROLEIDLIST: (state, role) => {
      state.roleIdList = role;
    },
    SET_ROUTERS: (state, routerList) => {
      state.routerList = routerList;
    },
  },

  actions: {
    // 走权限
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((response) => {
            if (response.code == '1000') {
              Vue.cookie.set(ACCESS_TOKEN, response.token, 7 * 24 * 60 * 60 * 1000);
              commit('SET_TOKEN', response.token);
              commit('SET_NAME', {
                username: userInfo.username,
                realname: userInfo.realname,
                welcome: welcome(),
              });

              resolve(response);
            } else {
              reject(response);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 获取用户信息
    GetPermissionList({ commit }) {
      return new Promise(async (resolve, reject) => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        let res = await menuList({ roleId: userInfo.role_id });
        // debugger
        let menus = [];
        let childrenMenu = [];
        res.data.forEach((item, index) => {
          if (item.parent_id == 0) {
            menus.push({...item,url: item.url.replace(/\//g, '-') + `-${item.id}`,});
          } else {
            childrenMenu.push(item);
          }
        });

        menus.forEach((v) => {
          childrenMenu.forEach((j) => {
            if (v.id == j.parent_id) {
              v.children = [];
              v.children.push({ ...j, url: j.url.replace(/\//g, '-') + `-${j.id}` });
            }
          });
        });

        let auth = {
          menuList: res.data,
          authList: res.authList || [],
        };
        commit('SET_PERMISSIONLIST', menus);
        resolve(auth);
      });
    },
    getSsoInfo({ commit }, loginInfo) {
      return new Promise((resolve) => {
        getSso(loginInfo).then((response) => {
          if (response && response.code === 1000) {
            Vue.cookie.set(ACCESS_TOKEN, response.token, 7 * 24 * 60 * 60 * 1000);
            commit('SET_TOKEN', response.token);
          }
          resolve(response);
        });
      });
    },
    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        logout().then((res) => {
          if (res.code === 1000) {
            res.name = Vue.cookie.get('userName');
            commit('SET_TOKEN', '');
            commit('SET_PERMISSIONLIST', []);
            sessionStorage.setItem('permissions', '', -1);
            Vue.cookie.set(ACCESS_TOKEN, '', -1);
            Vue.cookie.set(USER_INFO, '', -1);
            Vue.cookie.set('userId', '', -1);
            Vue.cookie.set('userName', '', -1);
            Vue.cookie.set('roleIdList', '', -1);
            Vue.cookie.set('isMenuShow', '', -1);
            resolve(res);
          }
        });
      });
    },
    UpdateAppRouter({ commit }, routes) {
      return new Promise((resolve) => {
        //const [ roles ] = routes.constRoutes
        let routeList = routes.constRoutes;
        commit('SET_ROUTERS', routeList);
        resolve(routeList);
      });
    },
  },
};

export default user;
