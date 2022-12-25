import request from '@/utils/request';

// login
export const login = (data) => {
  return request({ method: 'post', url: 'api/admin/user/login', data });
};
export const register = (data) => {
  return request({ method: 'post', url: '/mobile/user/register', data });
};

// menu
export const menuList = (data) => {
  return request({ method: 'get', url: 'admin/menu/List', data });
};


// user
// export const getHomeList = (params) => {
//   return request({ method: 'get', url: 'admin/user/list', params });
// };
export const getUserList = (params) => {
  return request({ method: 'get', url: 'api/admin/user/userList', params });
};
export const postUser = (params) => {
  return request({ method: 'get', url: '/index/products/list', params });
};
export const delUser = (params) => {
  return request({ method: 'get', url: '/index/products/list', params });
};

// dict
