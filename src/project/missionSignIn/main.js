// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'lib-flexible/index'
import 'lib-flexible'
import Router from 'vue-router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import toast from 'index/components/Toast'
import Area from 'vant/lib/area';
import 'vant/lib/area/style';
import { Picker } from 'vant';
import Calendar from 'vue-mobile-calendar'
import MUtil from '@/utils/mm.js'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Picker);
Vue.use(Calendar);
Vue.use(Area);
Vue.use(toast);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

//提示框公共方法
// Vue.prototype.$tips=Tips;





//返回上一页公共方法
Vue.prototype.prev = function () {
  this.$router.go(-1)
}


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
