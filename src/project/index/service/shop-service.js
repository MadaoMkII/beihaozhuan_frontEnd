import MUtil from '@/utils/mm.js'

const shop = {
  //获取推荐商品
  getRecommandGoods(){
    return MUtil.request('/good/getRecommendGood',{},'get')
  },
  //获取商品列表
  getGoodsList(data){
    return MUtil.request('/good/getShowGoods',data)
  },
  //商品详情中的投保提交
  makeOrder(data){
    return MUtil.request('/order/makeOrder',data)
  }

};


export default shop
