import Vue              from 'vue'
import Router           from 'vue-router'
import PrepareRegister  from '@/project/prepare/pages/PrepareRegister.vue'
import PrepareAgreement  from 'index/pages/login/Agreement.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/prepare/',
  routes: [
    {
      path: '/',
      name:'PrepareRegister',
      component: PrepareRegister
    },
    {
      path: '/prepareAgreement',
      name:'PrepareAgreement',
      component: PrepareAgreement
    }
  ]
})
