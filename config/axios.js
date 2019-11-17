import { baseUrl } from "../config/env";
import axios from "axios";
import qs from "qs";
import Vue from "vue";
import { Toast } from "vant";
import store from "../src/store";
import VueRouter from "./../src/router.js";
Vue.use(Toast);
const loading = (
  duration = 0,
  forbidClick = true,
  loadingType = "spinner",
  message = "加载中...",
  ...other
) => {
  return Toast.loading({
    duration,
    forbidClick,
    loadingType,
    message,
    ...other
  });
};
axios.defaults.timeout = 10000; //设置请求时间
axios.defaults.baseURL = baseUrl; //设置默认接口地址
axios.defaults.withCredentials = true; //自动携带cookie
axios.defaults.headers["Content-type"] = "application/x-www-form-urlencoded";
axios.interceptors.request.use(config => {
  // const openid = VueRouter.app.$store.state.openid || VueRouter.app.$route.query.openid || 'oWWNw1vWejcIxVzHFrR5xCtEsxdo';
  // if(openid) {
  //   config.params = {
  //     ...config.params,
  //     openid
  //   }
  // }
  return config;
});
axios.interceptors.response.use(
  response => {
    if (response.data.status !== 0) {
    }
    // if(response.data.status === 3) {
    //     VueRouter.push({
    //         path: '/login',
    //         query: {
    //           openid: VueRouter.app.$store.state.openid
    //         }
    //     })
    // }
    return response;
  },
  error => {
    return Promise.reject(error.response);
  }
);
export default axios;
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
  let load = loading();
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then(response => {
        load.clear();
        resolve(response.data);
      })
      .catch(err => {
        load.clear();
        reject(err);
      });
  });
}
/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
  let load = loading();
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(data)).then(
      response => {
        load.clear();
        resolve(response.data);
      },
      err => {
        load.clear();
        reject(err);
      }
    );
  });
}
export { axios };

const APPID = "wxcbd2e38f7f1946b1";

//微信授权
Vue.prototype.$getAccredit = function (path) {
  let url = `https://one.dydigit.com/pointshop/commodity/auth?rd=https://one.dydigit.com/integralstore/#${path}`;
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(
    url
  )}&response_type=code&scope=snsapi_userinfo#wechat_redirect`;
};
