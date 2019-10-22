import MUtil from '@/utils/mm.js'

const login = {
  //登录
  login(data){
    return MUtil.request('/user/login',data)
  },
  //退出登录
  logout(){
    return MUtil.request('/user/logout',{},'get')
  },
  //获取用户权限等信息
  getUserInfo(){
    return MUtil.request('/user/getInfo',{},'get')
  }
};


export default login
