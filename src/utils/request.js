import axios from 'axios';
import Cookie from 'js-cookie';
import router from './../router';
import { Message } from 'element-ui';

let baseURL = process.env.NODE_ENV === 'production' ? 'http://api.wesion.cn' : 'http://localhost:3000';

const $http = axios.create({
  baseURL
});

$http.interceptors.request.use(
  config => {
    config.headers = {
      'token': Cookie.get('token'),
      'Content-Type': 'application/json'
    };
    return config;
  },
  error => {
    //请求错误时做些事
    return Promise.reject(error);
  }
);

$http.interceptors.response.use(
  response => {
    console.log(response)
    if (response.status !== 200) {
      Message.error('啊偶！断网了...');
    }
    // 未登录或者过期
    if (response.data.code === '02') {
      Cookie.remove('token');
      Message.error('登陆已过期，请重新登陆！');
      return router.push({ path: '/login' });
    }
    console.info(`[${response.config.method}] ${response.config.url}`);
    console.log(`data:`);
    console.log(response.data);
    return response.data;
  },
  error => {
    console.log(error)
    Message.error('服务出现错误，请稍后再试!');
  }
);

export default $http;