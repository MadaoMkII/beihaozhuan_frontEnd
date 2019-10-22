import Vue            from 'vue'
import Router         from 'vue-router'
import Login          from 'index/components/Login/Login.vue'
import Register       from 'index/pages/login/Register.vue'
import CompletInfo    from 'index/pages/login/CompletInfo.vue'
import Agreement      from 'index/pages/login/Agreement.vue'
import LoginInfo      from 'index/pages/login/LoginInfo.vue'
import Home           from 'index/pages/Home/Home.vue'
import Task           from 'index/pages/Task/Task.vue'
import Shop           from 'index/pages/Shop/Shop.vue'
import Mine           from 'index/pages/Mine/Mine.vue'
import ShopDetail     from 'index/pages/Shop/ShopDetail.vue'
import InsureInfo     from 'index/pages/Shop/InsureInfo.vue'
import Success        from 'index/pages/Shop/Success.vue'
import Apply          from 'index/pages/Mine/Apply.vue'
import Record         from 'index/pages/Mine/Record.vue'
import MyInfo         from 'index/pages/Mine/MyInfo.vue'
import Address        from 'index/pages/Mine/Address.vue'
import UpdateNickname from 'index/pages/Mine/UpdateNickname.vue'
import Introduce      from 'index/pages/Mine/Introduce.vue'
import Safe           from 'index/pages/Mine/Safe.vue'
import MyTask         from 'index/pages/Mine/MyTask.vue'
import Order          from 'index/pages/Mine/Order.vue'
import OrderDetail    from 'index/pages/Mine/OrderDetail.vue'
import AccountDetail  from 'index/pages/Mine/AccountDetail.vue'
import Team           from 'index/pages/Mine/Team.vue'
import InvitePoster   from 'index/pages/poster/InvitePoster.vue'
import PlayIntroduce  from 'index/pages/Home/PlayIntroduce.vue'
import Ad             from 'index/pages/Ad/Ad.vue'
import Video          from 'index/pages/Ad/Video.vue'
import Infos          from 'index/pages/Mine/Infos.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/index/',
  routes: [
    {
      path: '/login',
      name:'Login',
      component: Login
    },
    //注册
    {
      path:'/register',
      name:'Register',
      component:Register
    },
    //完善信息
    {
      path: '/completInfo',
      name: 'CompletInfo',
      component: CompletInfo
    },
    //用户协议和隐私
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    //用户登录相关模板页面
    {
      path: '/loginInfo',
      name: 'LoginInfo',
      component: LoginInfo
    },
    //玩儿法介绍页面
    {
      path: '/playIntroduce',
      name: 'PlayIntroduce',
      component: PlayIntroduce
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {authLogin:true,keepAlive: true}
    },
    {
      path: '/task',
      name: 'Task',
      component: Task,
      meta: {authLogin:true,keepAlive: true}
    },
    {
      path: '/shop',
      name: 'Shop',
      meta: {authLogin:true},
      component: Shop
    },
    {
      path: '/mine',
      name: 'Mine',
      meta: {authLogin:true},
      component: Mine
    },
    //商品详情
    {
      path: '/shopDetail',
      name: 'ShopDetail',
      meta: {authLogin:true},
      component: ShopDetail
    },
    //投保人信息
    {
      path: '/insureInfo',
      name: 'InsureInfo',
      meta: {authLogin:true},
      component: InsureInfo
    },
    //提交成功
    {
      path: '/success',
      name: 'Success',
      meta: {authLogin:true},
      component: Success
    },
    //申请提现
    {
      path: '/apply',
      name: 'Apply',
      meta: {authLogin:true},
      component: Apply
    },
    //提现记录
    {
      path: '/record',
      name: 'Record',
      meta: {authLogin:true},
      component: Record
    },
    //个人信息
    {
      path: '/myInfo',
      name: 'MyInfo',
      meta: {authLogin:true},
      component: MyInfo
    },
    {
      path: '/address',
      name: 'Address',
      meta: {authLogin:true},
      component: Address
    },
    //修改昵称
    {
      path: '/updateNickname',
      name: 'UpdateNickname',
      meta: {authLogin:true},
      component: UpdateNickname
    },
    //公司介绍
    {
      path: '/introduce',
      name: 'Introduce',
      meta: {authLogin:true},
      component: Introduce
    },
    //账户安全
    {
      path: '/safe',
      name: 'Safe',
      meta: {authLogin:true},
      component: Safe
    },
    //我的任务
    {
      path: '/myTask',
      name: 'MyTask',
      meta: {authLogin:true},
      component: MyTask
    },
    //我的订单
    {
      path: '/order',
      name: 'Order',
      meta: {authLogin:true},
      component: Order
    },
    //订单详情
    {
      path: '/orderDetail',
      name: 'OrderDetail',
      meta: {authLogin:true},
      component: OrderDetail
    },
    //账户明细
    {
      path: '/accountDetail',
      name: 'AccountDetail',
      meta: {authLogin:true},
      component: AccountDetail
    },
    //我的团队
    {
      path: '/team',
      name: 'Team',
      meta: {authLogin:true},
      component: Team
    },
    //邀请新人注册分享海报
    {
      path: '/invitePoster',
      name: 'InvitePoster',
      component: InvitePoster
    },
    //广告公共页面
    {
      path: '/ad',
      name: 'Ad',
      component: Ad
    },
    //看视频任务
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    //信息
    {
      path: '/infos',
      name: 'Infos',
      component: Infos
    }
  ]
})
