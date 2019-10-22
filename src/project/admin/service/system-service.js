import MUtil from '@/utils/mm.js'

const system = {
  //加载用户列表
  getSystemList(data){
    return MUtil.request('/user/getManagementUserInfo',data)
  },
  //系统设置
  systemSet(data){
    return MUtil.request('/setting/setSetting',data)
  },
  //新建管理员
  setUserAdmin(data){
    return MUtil.request('/user/setUserAdmin',data)
  },
  //删除管理员
  setUserStatus(data){
    return MUtil.request('/user/disableUserAdminStatus',data)
  },
  //修改管理员
  updateAdmin(data){
    return MUtil.request('/user/updateAdmin',data)
  },
  //系统设置详情
  getSetting(){
    return MUtil.request('/setting/getSetting',{},'post')
  },
  //系统日志
  getLogger(data){
    return MUtil.request('/logger/getLogger',data,'post')
  },
  checkWechat(){
    return MUtil.request('/wechat/getSignature',{},'get')
  }
};


export default system
