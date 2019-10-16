import Vue from 'vue';
import VCharts from 'v-charts';
import ElementUI from 'element-ui';
import 'normalize.css/normalize.css';
import 'element-ui/lib/theme-chalk/index.css';
import Cookies from 'js-cookie';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import App from './App';
import Router from 'vue-router';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VCharts);

router.beforeEach((to, from, next) => {

  NProgress.start();
  // 登陆判断
  if (!Cookies.get('token')) {
    if (to.path == '/login') {
      return next();
    }
    NProgress.done();
    return next({ path: '/login' });
  } else {
    if (to.path == '/login') {
      NProgress.done();
      return next({ path: '/' });
    }
    if (!store.state.userInfo) {
      return store.dispatch('findAdminInfo').then(res => {
        // 修复使用 addRoutes 重复提交
        router.matcher = new Router({ mode: 'history' }).matcher;
        router.addRoutes(store.state.routes);
        next(to);
      });
    }
  }
  next();
});


router.afterEach(() => {
  NProgress.done();
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');