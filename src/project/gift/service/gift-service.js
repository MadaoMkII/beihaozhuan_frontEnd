import MUtil from '@/utils/mm.js'

const gift = {
  //提交下载凭证
  createPromotionProof(data){
    return MUtil.formRequest('/promotion/createPromotionProof',data)
  },
  checkProofsStatus(){
    return MUtil.request('/promotion/checkProofsStatus',{},'get')
  }

};


export default gift
