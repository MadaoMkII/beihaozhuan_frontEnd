import Vue from 'vue'
import Router from 'vue-router'
import Main from 'admin/pages/Main.vue'
import Home from 'admin/pages/Home/Home.vue'
import User from 'admin/pages/User/User.vue'
import Goods from 'admin/pages/Goods/Goods.vue'
import Operate from 'admin/pages/Operate/Operate.vue'
import System from "admin/pages/System/System";
import GoodsMg from "admin/pages/Goods/GoodsMg";
import OrderMg from "admin/pages/Goods/OrderMg";
import AddGoods from "admin/pages/Goods/AddGoods";
import Login from "admin/pages/Login/Login";
import OrderDetail from "admin/pages/Goods/OrderDetail";
import UserMg from "admin/pages/User/UserMg";
import ActivityMg from "admin/pages/User/ActivityMg";
import UserInfo from "admin/pages/User/UserInfo";
import UserOrderList from "admin/pages/User/UserOrderList";
import Account from "admin/pages/User/Account";
import WithDrew from "admin/pages/User/WithDrew";
import Invite from "admin/pages/User/Invite";
import AdMg from "admin/pages/Operate/AdMg";
import TaskMg from "admin/pages/Operate/TaskMg";
import AdSet from "admin/pages/Operate/AdMg/AdSet";
import AdSeat from "admin/pages/Operate/AdMg/AdSeat";
import AdType from "admin/pages/Operate/AdMg/AdType";
import AdCount from "admin/pages/Operate/AdMg/AdCount";
import AddPoster from "admin/pages/Operate/AddPoster";
import AddType from "admin/pages/Operate/AddType";
import AddSeat from "admin/pages/Operate/AddSeat";
import CountDetail from "admin/pages/Operate/CountDetail";
import UpTask from "admin/pages/Operate/TaskMg/UpTask";
import DailyTask from "admin/pages/Operate/TaskMg/DailyTask";
import NewTask from "admin/pages/Operate/TaskMg/NewTask";
import Online from "admin/pages/Operate/TaskMg/UpTask/Online";
import Already from "admin/pages/Operate/TaskMg/UpTask/Already";
import InviteRegister from "admin/pages/Operate/TaskMg/UpTask/InviteRegister";
import SignIn from "admin/pages/Operate/TaskMg/DailyTask/SignIn";
import Income from "admin/pages/Operate/TaskMg/DailyTask/Income";
import AlreadyDaily from "admin/pages/Operate/TaskMg/DailyTask/AlreadyDaily";
import InviteDaily from "admin/pages/Operate/TaskMg/DailyTask/InviteDaily";
import AlreadyNew from "admin/pages/Operate/TaskMg/NewTask/AlreadyNew";
import Cash from "admin/pages/Operate/TaskMg/NewTask/Cash";
import InfoSet from "admin/pages/Operate/TaskMg/NewTask/InfoSet";
import OnlineTime from "admin/pages/Operate/TaskMg/NewTask/OnlineTime";
import Watch from "admin/pages/Operate/TaskMg/NewTask/Watch";
import Course from "admin/pages/Operate/TaskMg/NewTask/Course";
import Cashback from "admin/pages/Operate/Cashback";
import CashbackStep from "admin/pages/Operate/Cashback/Step";
import CashbackGame from "admin/pages/Operate/Cashback/Game";
import CashbackStepSetting from "admin/pages/Operate/Cashback/StepSetting";
import CashbackReview from "admin/pages/Operate/Cashback/Review";
import Administrators from "admin/pages/System/Administrators";
import SystemSet from "admin/pages/System/SystemSet";
// import SSPSet from "admin/pages/System/SSPSet";
import AddAdministrators from "admin/pages/System/AddAdministrators";
import SystemLog from "admin/pages/System/SystemLog";
import test from "admin/pages/test";



Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/admin/',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      // name: 'Main',
      component: Main,
      children: [
        {
          path: '/',
          component: Home,
          name: 'Home',
          meta: { title: '首页', noCache: true,authLogin:true}
        },
        //商品
        {
          path: '/goods',
          component: Goods,
          name: 'Goods',
          redirect: '/goods/goodsMg',
          meta: { title: '商品', noCache: true ,authLogin:true},
          children: [
            {
              path: '/goods/goodsMg',
              component: GoodsMg,
              name: 'GoodsMg',
              meta: { title: '商品管理', noCache: true ,authLogin:true},
              children: [
                {
                  path: '/goods/goodsMg/addGoods',
                  component: AddGoods,
                  name: 'AddGoods',
                  meta: { title: '新建商品', noCache: true , showFormPage:true,authLogin:true},
                }
              ]
            },
            {
              path: '/goods/orderMg',
              component: OrderMg,
              name: 'OrderMg',
              meta: { title: '订单管理', noCache: true ,authLogin:true},
              children: [
                {
                  path: '/goods/orderMg/orderDetail',
                  component: OrderDetail,
                  name: 'OrderDetail',
                  meta: { title: '订单详情', noCache: true , showFormPage:true,authLogin:true},
                }
              ]
            }
          ]
        },
        //用户
        {
          path: '/user',
          component: User,
          name: 'User',
          redirect: '/user/userMg',
          meta: { title: '用户', noCache: true ,authLogin:true},
          children: [
            {
              path: '/user/userMg',
              component: UserMg,
              name: 'UserMg',
              meta: { title: '用户管理', noCache: true,authLogin:true},
              children: [
                {
                  path: '/user/userMg/userInfo',
                  component: UserInfo,
                  name: 'UserInfo',
                  meta: { title: '用户信息', noCache: true,showUserInfo : true,authLogin:true},
                  redirect: '/user/userMg/userInfo/userOrderList',
                  children: [
                    {
                      path: '/user/userMg/userInfo/userOrderList',
                      component: UserOrderList,
                      name: 'UserOrderList',
                      meta: { title: '订单列表', noCache: true,showUserInfo : true,showThirdTab : true,authLogin:true},
                    },
                    {
                      path: '/user/userMg/userInfo/account',
                      component: Account,
                      name: 'Account',
                      meta: { title: '账户明细', noCache: true,showUserInfo : true,showThirdTab : true,authLogin:true},
                    },
                    {
                      path: '/user/userMg/userInfo/Invite',
                      component: Invite,
                      name: 'Invite',
                      meta: { title: '邀请列表', noCache: true,showUserInfo : true,showThirdTab : true,authLogin:true}
                    },
                    {
                      path: '/user/userMg/userInfo/withDrew',
                      component: WithDrew,
                      name: 'WithDrew',
                      meta: { title: '提现列表', noCache: true,showUserInfo : true,showThirdTab : true,authLogin:true}
                    }
                  ]
                }
              ]
            }
          ]
        },
        //运营
        {
          path: '/operate',
          component: Operate,
          name: 'Operate',
          redirect: '/operate/adMg',
          meta: { title: '运营', noCache: true ,authLogin:true},
          children: [
            {
              path: '/operate/adMg',
              component: AdMg,
              name: 'AdMg',
              meta: { title: '广告管理', noCache: true,authLogin:true},
              redirect: '/operate/adMg/adSet',
              children:[
                {
                  path: '/operate/adMg/adSet',
                  component: AdSet,
                  name: 'AdSet',
                  meta: { title: '广告列表', noCache: true,authLogin:true},
                  children:[
                    {
                      path: '/operate/adMg/adSet/addPoster',
                      component: AddPoster,
                      name: 'AddPoster',
                      meta: { title: '新建广告', noCache: true ,authLogin:true,showThirdPage:true}
                    }
                  ]
                },
                {
                  path: '/operate/adMg/adType',
                  component: AdType,
                  name: 'AdType',
                  meta: { title: '广告类型', noCache: true,authLogin:true},
                  children:[
                    {
                      path: '/operate/adMg/adType/addType',
                      component: AddType,
                      name: 'AddType',
                      meta: { title: '新建类型', noCache: true , showFormPage:true,authLogin:true}
                    }
                  ]
                },
                {
                  path: '/operate/adMg/adSeat',
                  component: AdSeat,
                  name: 'AdSeat',
                  meta: { title: '广告位配置', noCache: true,authLogin:true},
                  children:[
                    {
                      path: '/operate/adMg/adType/addSeat',
                      component: AddSeat,
                      name: 'AddSeat',
                      meta: { title: '新增广告位', noCache: true , showFormPage:true,authLogin:true}
                    }
                  ]
                },
                {
                  path: '/operate/adMg/adCount',
                  component: AdCount,
                  name: 'AdCount',
                  meta: { title: '广告统计', noCache: true,authLogin:true},
                  children:[
                    {
                      path: '/operate/adMg/adCount/CountDetail',
                      component: CountDetail,
                      name: 'CountDetail',
                      meta: { title: '广告详情', noCache: true , showFormPage:true,authLogin:true}
                    }
                  ]
                }
              ]
            },
            {
              path: '/operate/taskMg',
              component: TaskMg,
              name: 'TaskMg',
              meta: { title: '任务管理', noCache: true,authLogin:true},
              redirect: '/operate/taskMg/upTask',
              children:[
                {
                  path: '/operate/taskMg/upTask',
                  component: UpTask,
                  name: 'UpTask',
                  meta: { title: '进阶任务', noCache: true,authLogin:true},
                  children:[
                    {
                      path: '/operate/taskMg/upTask/online',
                      component: Online,
                      name: 'Online',
                      meta: { title: '周签到', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/upTask/already',
                      component: Already,
                      name: 'Already',
                      meta: { title: '完成任务', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/upTask/inviteRegister',
                      component: InviteRegister,
                      name: 'InviteRegister',
                      meta: { title: '邀请注册', noCache: true , showFormPage:true,authLogin:true}
                    }
                  ]
                },
                {
                  path: '/operate/taskMg/dailyTask',
                  component: DailyTask,
                  name: 'DailyTask',
                  meta: { title: '日常任务', noCache: true,authLogin:true},
                  children:[
                    {
                      path: '/operate/taskMg/dailyTask/signIn',
                      component: SignIn,
                      name: 'SignIn',
                      meta: { title: '每日签到', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/dailyTask/alreadyDaily',
                      component: AlreadyDaily,
                      name: 'AlreadyDaily',
                      meta: { title: '完成数量任务', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/dailyTask/income',
                      component: Income,
                      name: 'Income',
                      meta: { title: '晒收入', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/dailyTask/inviteDaily',
                      component: InviteDaily,
                      name: 'InviteDaily',
                      meta: { title: '邀请注册', noCache: true , showFormPage:true,authLogin:true}
                    }
                  ]
                },
                {
                  path: '/operate/taskMg/newTask',
                  component: NewTask,
                  name: 'NewTask',
                  meta: { title: '新手任务', noCache: true,authLogin:true},
                  children:[
                    {
                      path: '/operate/taskMg/newTask/infoSet',
                      component: InfoSet,
                      name: 'InfoSet',
                      meta: { title: '信息配置', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/newTask/cash',
                      component: Cash,
                      name: 'Cash',
                      meta: { title: '首次提现', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/newTask/watch',
                      component: Watch,
                      name: 'Watch',
                      meta: { title: '看一个广告', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/newTask/alreadyNew',
                      component: AlreadyNew,
                      name: 'AlreadyNew',
                      meta: { title: '完成数量任务', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/newTask/onlineTime',
                      component: OnlineTime,
                      name: 'OnlineTime',
                      meta: { title: '在线时间', noCache: true , showFormPage:true,authLogin:true}
                    },
                    {
                      path: '/operate/taskMg/newTask/course',
                      component: Course,
                      name: 'Course',
                      meta: { title: '新手教程', noCache: true , showFormPage:true,authLogin:true}
                    },
                  ]
                }

              ]
            },
            {
              path: '/operate/activityMg',
              component: ActivityMg,
              name: 'ActivityMg',
              meta: {title: '活动管理', noCache: true, authLogin: true}
            },
            {
              path: '/operate/cashback',
              component: Cashback,
              meta: {title: '还款减负活动管理', noCache: true, noContainerStyles: true, authLogin: true},
              children: [
                {
                  name: 'Cashback',
                  path: '',
                  redirect: { name: 'CashbackStep', params: { step: '1' } },
                },
                {
                  path: 'step/:step',
                  component: CashbackStep,
                  name: 'CashbackStep',
                  meta: {title: '还款减负活动管理', noCache: true, noContainerStyles: true, authLogin: true},
                },
              ]
            },
            {
              path: '/operate/cashback/game',
              component: CashbackGame,
              name: 'CashbackGame',
              meta: {title: '还款减负活动管理', noCache: true, noContainerStyles: true, authLogin: true},
            },
            {
              path: '/operate/cashback/step-setting/:step',
              component: CashbackStepSetting,
              name: 'CashbackStepSetting',
              meta: {title: '还款减负活动管理', noCache: true, noContainerStyles: true, authLogin: true},
            },
            {
              path: '/operate/cashback/review',
              component: CashbackReview,
              name: 'CashbackReview',
              meta: {title: '还款减负活动管理', noCache: true, noContainerStyles: true, authLogin: true},
            },
          ]
        },
        //系统
        {
          path: '/system',
          component: System,
          name: 'System',
          meta: { title: '系统', noCache: true ,authLogin:true},
          redirect: '/system/administrators',
          children:[
            {
              path: '/system/administrators',
              component: Administrators,
              name: 'Administrators',
              meta: { title: '管理员', noCache: true,authLogin:true},
              children:[
                {
                  path: '/system/administrators/addAdministrators',
                  component: AddAdministrators,
                  name: 'AddAdministrators',
                  meta: { title: '新建管理员', noCache: true, showFormPage:true,authLogin:true},
                }
              ]
            },
            {
              path: '/system/systemSet',
              component: SystemSet,
              name: 'SystemSet',
              meta: { title: '系统设置', noCache: true,authLogin:true}
            },
            {
              path: '/system/systemlog',
              component: SystemLog,
              name: 'SystemLog',
              meta: { title: '系统日志', noCache: true,authLogin:true}
            },
            // {
            //   path: '/system/SSPSet',
            //   component: SSPSet,
            //   name: 'SSPSet',
            //   meta: { title: 'SSP配置', noCache: true}
            // },
          ]
        }
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    }
  ]
})



