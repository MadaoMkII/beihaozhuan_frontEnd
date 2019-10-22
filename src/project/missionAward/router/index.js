import Vue              from 'vue'
import Router           from 'vue-router'
import MissionAward     from '@/project/missionAward/pages/missionAward.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base:'/missionAward/',
  routes: [
    {
      path: '/',
      name:'MissionAward',
      component: MissionAward
    }
  ]
})
