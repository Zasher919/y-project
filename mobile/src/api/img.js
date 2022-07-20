import request from '@/utils/request'
const urlPath = '/img'

export function getData() {
  return request({
    url: '/product',
    method: 'get',

  })
}

export function getListBenner(query = {}) {
  return request({
    url: urlPath + '/' + '2',
    method: 'get',
    params: query,
  })
}

export function getListIcon(query = {}) {
  return request({
    url: urlPath + '/' + '1',
    method: 'get',
    params: query,
  })
}

export function getProduct() {
  return request({
    url: '/products',
    method: 'get',
  })
}

export function remove(data) {
  return request({
    url: urlPath,
    method: 'delete',
    data,
  })
}



export function create(data) {
  return request({
    url: urlPath,
    method: 'post',
    data,
  })
}

export function update(data) {
  return request({
    url: urlPath,
    method: 'put',
    data,
  })
}

export function addUser(data) {
  return request({
    url: urlPath,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: 'post',
    data,
  })
}
