import httprequest from "@/utils/request.js"

export const indexList = (data) => httprequest('api/products', data);

export const indexImgList = (data) => httprequest('api/img', data);
