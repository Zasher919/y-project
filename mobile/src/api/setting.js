import request from "@/utils/axios.js";

export function get(url, params) {
  return request({
    url,
    method: "GET",
    params,
  });
}

export function post(url, data) {
  return request({
    url,
    method: "POST",
    data,
  });
}

export function put(url, data) {
  return request({
    url,
    method: "PUT",
    data,
  });
}

export function del(url, params) {
  return request({
    url,
    method: "DELETE",
    params,
  });
}
