import axios from 'axios';
import {  ElMessage } from 'element-plus';
// import store from "@/store";
import { getToken } from '@/utils/auth';
import router from '@/router'


// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: '/',
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    let token = getToken();
    // do something before request is sent
    if (token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['token'] = token;
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log('error', error); // for debug
    return Promise.reject(error);
  },
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
  (response) => {
    const { status, data, msg } = response;
    const res = data;
    if ([200, 201, 304].includes(status)) {
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 10006) {
        ElMessage({
          message: res.msg || 'Error',
          type: 'error',
          duration: 1 * 1000,
        });

        router.push('/login')
      }
      return data;
    } else {
      const { status, message } = res;
      if ([202, 400].includes(status)) {
        ElMessage({
          message: message || 'Error',
          type: 'error',
          duration: 3 * 1000,
        });
        
        return Promise.reject(res);
      }

      return data;
    }
  },
  (error) => {
    console.log('err' + error); // for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
