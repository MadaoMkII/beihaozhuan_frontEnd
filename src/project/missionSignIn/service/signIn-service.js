import MUtil from '@/utils/mm.js'

const signIn = {
  //签到
  signIn(data){
    return MUtil.formRequestios('/user/signIn',data)
  }

};


export default signIn
