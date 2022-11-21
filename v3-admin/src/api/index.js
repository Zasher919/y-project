import request from '@/utils/request';

export const login = (data) => {
  return request({ method: 'post', url: 'admin/user/login', data });
};
export const register = (data) => {
  return request({ method: 'post', url: '/mobile/user/register', data });
};

export const menuList = (data) => {
  return request({ method: 'get', url: 'admin/menu/List', data });
};




export const getHomeList = (params) => {
  return request({ method: 'get', url: '/index/products/list', params });
};
