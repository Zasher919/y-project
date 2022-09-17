import request from "@/utils/request";
const urlPath = "/img";

export function getList(query = {}) {
  return request({
    url: urlPath,
    method: "get",
    params: query
  });
}

export function remove(data) {
  return request({
    url: urlPath + "/" + data,
    method: "delete",
    data
  });
}

export function create(data) {
  return request({
    url: urlPath,
    method: "post",
    data
  });
}

export function update(data) {
  return request({
    url: urlPath,
    method: "put",
    data
  });
}
