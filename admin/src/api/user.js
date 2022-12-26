import request from '@/utils/request'

export function login(data) {
  console.log('data-', data);
  return request({
    url: '/auth/login',
    method: 'post',
    data,
  })
}

export function getInfo() {
  return request({
    url: '/users/profile',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post',
  })
}
