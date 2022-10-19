import request from "@/utils/request";

export const menuList = data => {
  return request({ method: "get", url: "/admin/menu/list", params: data });
};

export const menuAdd = data => {
  return request({ method: "post", url: "/admin/menu/add", data });
};

export const menuDel = data => {
  return request({ method: "post", url: "/admin/menu/del", data });
};

export const menuUpdate = data => {
  return request({ method: "post", url: "/admin/menu/list", data });
};

export const dictList = data => {
  return request({ method: "get", url: "/admin/dict/list", params: data });
};

export const dictAdd = data => {
  return request({ method: "post", url: "/admin/dict/add", data });
};

export const dictDel = data => {
  return request({ method: "post", url: "/admin/dict/del", data });
};

export const dictUpdate = data => {
  return request({ method: "post", url: "/admin/dict/update", data });
};
