import MUtil from '@/utils/mm.js'

const user = {
  //加载用户列表
  getUserList(data){
    return MUtil.request('/user/getManyUser',data)
  },
  //禁用/启用 用户
  setUserstatus(data){
    return MUtil.request('/user/setUserStatus',data)
  },
  //获取用户基本信息
  getUserInfo(data){
    return MUtil.request('/user/getUser',data)
  },
  //用户信息中的订单列表
  findOrderByUser(data){
    return MUtil.request('/order/findOrderByUser',data)
  },
  //
};


export default user
