import MUtil from '@/utils/mm.js'

const goods = {
  //加载商品列表
  getGoodsList(data){
    return MUtil.request('/good/getManyGoods',data)
  },
  //商品上下架
  setGoodStatus(data){
    return MUtil.request('/good/setGoodStatus',data)
  },
  //删除商品
  delGood(data){
    return MUtil.request('/good/delGood',data)
  },
  //新建商品（表单提交方法）
  addGoods(data){
    return MUtil.formRequest('/good/createGood',data)
  },
  //编辑商品（表单提交方法）
  editGoods(data){
    return MUtil.formRequest('/good/updateGood',data)
  },
  //推荐商品
  setRecommendGood(data){
    return MUtil.request('/setting/setRecommendGood',data)
  }
};


export default goods
