import MUtil from '@/utils/mm.js'

const ad = {
  //根据广告位置查询广告图片及来源
  getAdByPosition(data){
    return MUtil.formRequestios('/advertisement/getAdvertisementByPosition',data)
  },
  //加密并check广告
  checkAdvertisement(data){
    return MUtil.formRequestios('/advertisement/checkAdvertisement',data)
  },
  checkFinishAdvertisement(data){
    return MUtil.formRequestios('/advertisement/checkFinishAdvertisement',data)
  }
};


export default ad
