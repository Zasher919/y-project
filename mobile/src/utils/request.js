import axios from "axios";
// import { MessageBox, Message } from "element-ui";
import store from "@/store";
import { getToken } from "@/utils/auth";
import { Toast } from "vant";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    let token = getToken()
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers["token"] = token;
    }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const { status, data } = response;

    // if the custom code is not 20000, it is judged as an error.

    if ([200, 201, 304].includes(status)) {
      const { code, msg } = data;
      // Toast({
      //   message: msg || "Error",
      //   type: "error",
      //   duration: 3 * 1000
      // });
      if (code != 10000) {
        Toast(msg, {
          confirmButtonText: "Re-Login",
          cancelButtonText: "Cancel",
          type: "warning"
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            location.reload();
          });
        });
      }
      // return Promise.reject(new Error(msg || "Error"));
      return Promise.resolve(data)
    } else {
      const { msg, code } = data;
      // debugger
      if ([202, 400].includes(code)) {
        Toast({
          message: msg || "Error",
          type: "error",
          duration: 3 * 1000
        });
        return Promise.reject(data);
      }

      return data;
    }
  },
  error => {
    Toast({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
