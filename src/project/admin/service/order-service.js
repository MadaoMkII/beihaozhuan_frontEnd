import MUtil from '@/utils/mm.js'

const order = {
  //加载订单列表
  getOrderList(data){
    return MUtil.request('/order/getMyOrders',data)
  },
  //订单详情
  getOrderDetail(data){
    return MUtil.request('/order/findOrder',data)
  }
};


export default order
