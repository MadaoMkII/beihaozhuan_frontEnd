import MUtil from '@/utils/mm.js'

const mineInfo = {
  //进阶任务完成进度
  getWeeklyMissionProcessing(){
    return MUtil.request('/mission/getUserWeeklyMissionProcessing',{},'get')
  },
  //日常任务完成进度
  getDailyMissionProcessing(){
    return MUtil.request('/mission/getUserDailyMissionProcessing',{},'get')
  },
  //获取日常任务
  getUserDailyMissionProcessing(){
    return MUtil.request('/mission/getUserDailyMissionProcessing',{},'get')
  },
  //获取周任务（进阶任务）
  getUserWeeklyMissionProcessing(){
    return MUtil.request('/mission/getUserWeeklyMissionProcessing',{},'get')
  },
  //获取新手任务
  getUserPermanentMissionProcessing(){
    return MUtil.request('/mission/getUserPermanentMissionProcessing',{},'get')
  },
  //交任务 （任务完成后点击按钮改变任务状态）
  completeMission(data){
    return MUtil.request('/mission/completeMission',data)
  },
  checkAD(data){
    return MUtil.request('checkAD?eventName='+data,{},'get')
  },
  getSquare(){
    return MUtil.request('getSquare',{},'get')
  },
  //签到
  signInReal(){
    return MUtil.request('/user/signInReal',{},'get')
  },
  //晒收入
  howMyMoney(){
    return MUtil.request('/user/showMyMoney',{},'get')
  },
  //看教程视频
  finishMission(data){
    return MUtil.request('/mission/finishMission ',data)
  },
};


export default mineInfo
