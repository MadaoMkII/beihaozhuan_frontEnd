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
  },
  //获取提现金额等信息
  getWithDrewSetting(){
    return MUtil.formRequestios('/setting/getWithDrewSetting',{},'get')
  },
  //获取微信昵称
  getWechatNickName(){
    return MUtil.formRequestios('/user/getWechatNickName',{},'get')
  },
  //提现
  withdrew(data){
    return MUtil.formRequestios('/wechat/withdrew',data)
  },
  //账户明细
  getWithDrewByUser(data){
    return MUtil.formRequestios('/wechat/getWithDrewByUser',data)
  }
};


export default mineInfo
