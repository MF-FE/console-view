import Vue from 'vue';
import VueRouter from 'vue-router';


// 解决点击同一个路由报错
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

import Layout from '@/layout';

Vue.use(VueRouter);

export const constantRouterMap = [{
    path: '/',
    component: Layout,
    children: [{
    //   path: '/',
    //   name: '首页',
    //   component: () => import('@/views/home'),
    //   meta: { icon: 'el-icon-pie-chart' }
    // }, {
      path: '/',
      name: '活动报名',
      component: () => import('@/views/activity'),
      meta: { icon: 'el-icon-document' }
    }]
  }, {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '*',
    component: () => import('@/views/error-page/404')
  }
];

export const asyncRouterMap = [{
  path: '/activity-edit',
  name: '活动管理',
  component: () => import('@/views/activity/edit'),
  meta: { role: ['ADMIN', 'SUPER_ADMIN'], icon: 'el-icon-date' },

}, {
  path: '/admin',
  name: '账号管理',
  component: () => import('@/views/admin'),
  meta: { role: ['SUPER_ADMIN'], icon: 'el-icon-setting' },
}]


const createRouter = () => new VueRouter({
  routes: constantRouterMap
});

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher // reset router
}

const router = createRouter();

export default router;