import MUtil from '@/utils/mm.js'

const mineInfo = {
  //获取当前用户的个人信息、头像，昵称
  getUserInfo(){
    return MUtil.request('/user/getInfo',{},'get')
  },
  //修改个人信息（表单提交方法）
  updateUserInfo(data){
    return MUtil.formRequest('/user/updateInfo',data)
  },
  //获取邀请链接
  inviteLink(){
    return MUtil.formRequestios('/user/getInviteLink',{},'get')
  },
  //我的团队
  getMyTeam(data){
    return MUtil.formRequestios('/user/getMyTeam',data)
  }
};


export default mineInfo
