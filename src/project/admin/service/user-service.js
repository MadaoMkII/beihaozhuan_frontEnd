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
  //用户信息中的提现明细
  getWithDrewByUser(data){
    return MUtil.request('/wechat/getWithDrewByAdmin',data)
  },
  //获取活动列表
  getProofs(data){
    return MUtil.request('/promotion/getProofs',data)
  },
  //审批游戏凭证
  verifyProof(data){
    return MUtil.request('/promotion/verifyProof',data)
  },
};


export default user
