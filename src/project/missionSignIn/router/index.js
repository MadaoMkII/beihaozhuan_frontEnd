import Vue              from 'vue'
import Router           from 'vue-router'
import MissionSignIn    from '@/project/missionSignIn/pages/MissionSignIn.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/missionSignIn/',
  routes: [
    {
      path: '/',
      name:'MissionSignIn',
      component: MissionSignIn
    }
  ]
})
