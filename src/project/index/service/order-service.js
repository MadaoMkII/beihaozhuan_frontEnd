import MUtil from '@/utils/mm.js'

const order = {
  //获取订单列表
  getUserBalanceList(data){
    return MUtil.request('/order/getMyOrders',data)
  },
  //订单详情
  getOrderDetail(data){
    return MUtil.request('/order/findOrder',data)
  },
  //账户明细
  getUserBalance(data){
    return MUtil.request('/user/getUserBalanceList',data)
  }
};


export default order
