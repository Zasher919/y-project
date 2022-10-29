import { get, post, put, del } from "./setting";
import request from "@/utils/request";

export const login = data => {
  return request({ method: "post", url: "/mobile/user/login", data });
};

export const register = data => {
  return request({ method: "post", url: "/mobile/user/register", data });
};

export const addUser = data => post("mobile/user/register", data);

export const loginUser = data => post("mobile/user/login", data);

export const getTest = data => get("mobile/login", data);

export const postTest = data => del("mobile/login", data);

export const putTest = data => put("mobile/login", data);
