import MUtil from '@/utils/mm.js'

const advertisement = {
  //添加广告
  addTaskAd(data){
    return MUtil.formRequest('/advertisement/createAdvertisement',data)
  },
  //获取广告列表
  getAdvertisement(data){
    return MUtil.request('/advertisement/getAdvertisement',data)
  },
  //编辑广告
  updateAdvertisement(data){
    return MUtil.formRequest('/advertisement/updateAdvertisementList',data)
  },
  //广告上下架
  setAdvertisementActivity(data){
    return MUtil.request('/advertisement/setAdvertisementActivity',data)
  },
  //删除广告
  deleteAdvertisement(data){
    return MUtil.request('/advertisement/deleteAdvertisement',data)
  },
  //广告统计
  countAdv(data){
    return MUtil.request('/advertisement/countAdv?'+data,{},'get')
  },
  //广告统计详情
  etAdvDetail(data){
    return MUtil.request('/advertisement/getAdvDetail',data)
  }
};


export default advertisement
