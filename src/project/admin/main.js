// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import Table from 'admin/components/Table/index.js';
import MUtil from '@/utils/mm.js'
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

import 'element-ui/lib/theme-chalk/index.css'
import 'admin/common/global.css'


Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Table);
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


//返回上一页公共方法
Vue.prototype.goPrePage = function () {
  this.$router.go(-1)
}

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authLogin)){  // 判断该路由是否需要登录权限
      MUtil.request('/user/isLogin',{},'get')
        .then(res => {
          // console.log('判断登录状态',res)
          if(res.data === '用户已经登录'){
            next();
          }else {
            next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }
        });
    }
    else {
        next();
    }
});


Vue.prototype.isEmpty = function (obj) {
  if (obj === undefined) return true;
  if (obj === "") return true;
  if (obj === {}) return true;
  if (obj === []) return true;
  if (obj === null) return true;
  if (obj.constructor.name === "Array" || obj.constructor.name === "String") return obj.length === 0;
  // for (let key in obj) {
  //     if (obj.hasOwnProperty(key) && isEmpty(obj[key])) return true;
  // }
  return false;
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
