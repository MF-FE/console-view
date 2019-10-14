import Vue from 'vue';
import Vuex from 'vuex';
import { loginApi, findAdminInfoApi } from '@/api/admin';
import Cookies from 'js-cookie';
import { asyncRouterMap, constantRouterMap, router, resetRouter } from '@/router';

var objDeepCopy = function (source) {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
  }
  return sourceCopy;
};


Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    userInfo: '',
    routes: objDeepCopy(constantRouterMap)
  },
  mutations: {
    SET_USERINFO(state, data) {
      state.userInfo = data;
    },
    SET_TOKEN(state, token) {
      Cookies.set('token', token);
    },
    SET_ROUTES(state, routes) {
      console.log(routes)
      state.routes = routes;
    }
  },
  getters: {
    sideBar(state) {
      return state.routes[0].children;
    },
    adminRole(state) {
      return state.userInfo && state.userInfo.role;
    },
    adminLimits(state) {
      return state.userInfo && state.userInfo.limits;
    }
  },
  actions: {
    // 登陆
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        const { username, password } = userInfo;
        loginApi({ username: username.trim(), password }).then(result => {
          const { data } = result;
          data && commit('SET_TOKEN', data);
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 登出
    logout({ commit }) {
      commit('SET_USERINFO', null);
      Cookies.remove('token');
      commit('SET_ROUTES', constantRouterMap);
      resetRouter();
    },
    // 生成路由
    generateRouter({ commit }, role) {
      let accountRoutes = asyncRouterMap.filter(item => {
        if (item.meta.role.some(i => i == role)) return true;
        return false;
      });
      const routes = objDeepCopy(constantRouterMap);
      routes[0].children = [...routes[0].children, ...accountRoutes];
      commit('SET_ROUTES', routes);
    },
    // 获取用户信息
    findAdminInfo({ commit, dispatch }, token) {
      return new Promise((resolve, reject) => {
        findAdminInfoApi().then(result => {
          const { data } = result;
          dispatch('generateRouter', data && data.role);
          commit('SET_USERINFO', data);
          resolve(result);
        }).catch(err => {
          reject(err);
        });
      });
    }
  }
});

export default store;