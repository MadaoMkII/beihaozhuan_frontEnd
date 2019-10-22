import MUtil from '@/utils/mm.js'

const register = {
  //获取验证码
  getCode(data){
    return MUtil.formRequestios('/verify/sendVerifySmsMessage_test',data)
  },
  //注册
  register(data){
    return MUtil.formRequestios('/user/register_test',data)
  }

};


export default register
