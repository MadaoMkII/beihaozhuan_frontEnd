import Vue            from 'vue'
import Router         from 'vue-router'
import Gift           from 'gift/pages/Gift/Gift.vue'
import GameDetail     from 'gift/pages/Gift/GameDetail.vue'
import GiftTip        from 'gift/pages/Gift/GiftTip.vue'
import PicUpload      from 'gift/pages/Gift/PicUpload.vue'
import GiftPoster     from 'gift/pages/Gift/GiftPoster.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/gift/',
  routes: [
    //双12活动入口页面
    {
      path: '/',
      name: 'Gift',
      component: Gift
    },
    //游戏详情下载页面
    {
      path: '/gameDetail',
      name: 'GameDetail',
      component: GameDetail
    },
    //攻略弹窗
    {
      path: '/giftTip',
      name: 'GiftTip',
      component: GiftTip
    },
    //上传截图
    {
      path: '/picUpload',
      name: 'PicUpload',
      component: PicUpload
    },
    //邀请海报
    {
      path: '/giftPoster',
      name: 'GiftPoster',
      component: GiftPoster
    }
  ]
})
