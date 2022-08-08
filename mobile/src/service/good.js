import axios from "../utils/axios";

export function getDetail(id) {
  return axios.get(`/product/${id}`);
}

export function getCategory() {
  return axios.get("/categories");
}

export function search(params) {
  return axios.get("/api/products", { params });
}
