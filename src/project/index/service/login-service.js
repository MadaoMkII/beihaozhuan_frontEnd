import MUtil from '@/utils/mm.js'

const api = {
  //获取验证码
  getCode(data){
    return MUtil.formRequestios('/verify/sendVerifySmsMessage',data)
  },
  //获取登录验证码
  getLoginCode(data){
    return MUtil.formRequestios('/verify/smsLoginVerifyCode',data)
  },
  //注册
  register(data){
    return MUtil.request('/user/register',data)
  },
  //登录
  login(data){
    return MUtil.request('/user/login',data)
  },
  //忘记密码获取验证码
  getPwCode(data){
    return MUtil.request('/verify/sendFindPasswordBackSmsMessage',data)
  },
  //忘记密码验证验证码是否正确
  verifyFpbCode(data){
    return MUtil.request('/verify/verifyFpbCode',data)
  },
  //重置密码
  updateUserPassword(data){
    return MUtil.request('/user/updateUserPassword',data)
  },
  //退出登录
  logout(){
    return MUtil.request('/user/logout',{},'get')
  },
  //获取首页平台注册人数
  getUserNumber(){
    return MUtil.request('/setting/getMemberNumber',{},'get')
  },
  //绑定微信
  bindWechat(data){
    return MUtil.formRequestios('/user/bindWechat',data)
  }

};


export default api
