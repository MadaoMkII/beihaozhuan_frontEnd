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
import { DatetimePicker } from 'vant';

Vue.use(DatetimePicker);
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
//解决在iOS中键盘收起后出现白背景问题
Vue.prototype.fixScroll = function () {
  window.scrollTo(0, 0);
}



router.beforeEach((to, from, next) => {
  let statusString = to.query.statusString;
  let jumpTo = to.query.jumpTo;
  let head = to.query.head;
  let nickName = to.query.nickName;
  let inviteCode = to.query.inviteCode;
  console.log('statusString',statusString)
  console.log('jumpTo',jumpTo)
  console.log('head',head)
  console.log('nickName',nickName)
  //判断如果url中包含StatusString 和jumpTo loginInfoBindPhone   跳转至绑定手机号页面
  if(statusString && statusString != '' && jumpTo === 'loginInfoBindPhone' && head && head != '' && nickName && nickName != ''){
    if (to.path === '/loginInfo') { //这就是跳出循环的关键
      next()
    } else {
      next({
        path: '/loginInfo',
        query: {
          'statusString':statusString,
          'jumpTo':jumpTo,
          'head':head,
          'nickName':nickName,
          'type':'bindPhone'
        }
      })
    }
  }else if(inviteCode && inviteCode != ''){
    if (to.path === '/register') { //这就是跳出循环的关键
      next()
    } else {
      next({
        path: '/register',
        query:{
          'inviteCode':inviteCode
        }
      })
    }
  }
  else if(jumpTo === 'home'){   //系统自动登录，跳转到首页大厅
    if (to.path === '/') { //这就是跳出循环的关键
      next()
    } else {
      next({
        path: '/'
      })
    }
  }else {
    if (to.matched.some(record => record.meta.authLogin)) {  // 判断该路由是否需要登录权限
      MUtil.request('/user/isLogin', {}, 'get')
        .then(res => {
          console.log('判断登录状态', res)
          if (res.data === '用户已经登录') {
            next();
          } else {
            next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
          }
        });
    } else {
      next();
    }
  }
});




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
