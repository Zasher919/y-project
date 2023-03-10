import httprequest from "@/utils/request.js"

export const indexList = (data) => httprequest('api/products/?page=1&limit=4', data);
