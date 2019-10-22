import MUtil from '@/utils/mm.js'

const task = {
  //加载任务列表 （根据传入的type不同，加载不同类型的任务）
  getTaskList(data){
    return MUtil.request('/mission/getMissions',data)
  },
  //任务开启/关闭
  setMissionStatus(data){
    return MUtil.request('/mission/setMissionStatus',data)
  },
  //编辑任务
  updateMission(data){
    return MUtil.formRequest('/mission/updateMission',data)
  }
};


export default task
