import axios from "../utils/axios";
import request from "../utils/request";

export function getAddressList(params) {
  return request({
    url: "/api/h5/address",
    method: "get",
    params
  });
}

export function putAddressList(data) {
  return request({
    url: "/api/h5/address",
    method: "put",
    data
  });
}

export function postAddressList(data) {
  return request({
    url: "/api/h5/address",
    method: "post",
    data
  });
}

export function delAddressList(data) {
  return request({
    url: "/api/h5/address",
    method: "delete",
    data
  });
}

export function addAddress(params) {
  return axios.post("/address", params);
}

export function EditAddress(params) {
  return axios.put("/address", params);
}

export function DeleteAddress(id) {
  return axios.delete(`/address/${id}`);
}

export function getDefaultAddress() {
  return axios.get("/address/default");
}

export function getAddressDetail(id) {
  return axios.get(`/address/${id}`);
}
