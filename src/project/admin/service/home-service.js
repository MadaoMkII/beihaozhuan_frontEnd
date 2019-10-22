import MUtil from '@/utils/mm.js'

const home = {
  //加载折线图统计
  countUser(data) {
    return MUtil.request('/chart/countByFall?'+data, {},'get')
  },
  //最受欢迎任务
  getAdvCompare(data){
    return MUtil.request('/chart/getAdvCompare?'+data, {},'get')
  },
  //最受欢迎商品
  countGoodForChart(data){
    return MUtil.request('/chart/countGoodForChart?'+data, {},'get')
  },
}


export default home
