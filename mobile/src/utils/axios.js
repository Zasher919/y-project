import axios from "axios";
// import { Toast } from 'vant'
import router from "../router";
import { getToken } from "./auth";
import { Toast } from "vant";

// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//backend-api-01.newbee.ltd/api/v1' : '//backend-api-01.newbee.ltd/api/v1'
// axios.defaults.baseURL = '/'

// axios.defaults.baseURL = process.env.VUE_APP_BASE_HOST;
// axios.defaults.baseURL = "http://localhost:7788/";
axios.defaults.baseURL = "http://localhost:8000/";


// axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['authorization'] = localStorage.getItem('token') || ''
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// axios.interceptors.response.use(res => {
//   if (typeof res.data !== 'object') {
//     Toast.fail('服务端异常！')
//     return Promise.reject(res)

//   }
//   console.log('res-axios',res);
//   // if (res.data.resultCode != 200 || res.data.code != 200) {
//   //   if (res.data.message) Toast.fail(res.data.message)
//   //   if (res.data.resultCode == 416) {
//   //     router.push({ path: '/login' })
//   //   }
//   //   return Promise.reject(res.data)
//   // }

//   router.push({ path: '/' })

//   return res.data
// })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    //拦截响应，做统一处理
    console.log(response.status, "response.status");
    if (response.data.code) {
      console.log(response.status, "response.status");
      switch (response.status) {
        case 301:
          console.log("登录过期");
      }
    }
    return response;
  },
  //接口错误状态处理，也就是说无响应时的处理
  err => {
    // console.log(err.response.data.code, '123');
    if (err.response.data.code == 401) {
      console.log("err", err);
      Toast("登录已过期");
      router.replace("/login");
    }

    // return Promise.reject(err.message) // 返回接口返回的错误信息
  }
);

axios.interceptors.request.use(
  config => {
    const token = getToken("tokenH");
    console.log(token, "token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.authorization = token; //请求头加上token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.http = function(method, url, data) {
  let params = {};
  if (method == "GET" || method == "get") {
    params = { params: data };
  } else if (method == "POST" || method == "post") {
    params = { data: data };

    console.log(params);
  }

  return new Promise((resolve, reject) => {
    // console.log("****************************");
    axios({
      method: method,
      url: url,
      ...params,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then(res => {
      if ((res && res.data.code == 200) || res.status == 200) {
        //根据实际情况进行更改
        resolve(res.data);
      } else {
        reject(res);
      }
    });
  });
};

export default axios;
