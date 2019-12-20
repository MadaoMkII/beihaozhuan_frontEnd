import MUtil from '@/utils/mm.js'

const gift = {
  //提交下载凭证
  createPromotionProof(data){
    return MUtil.formRequest('/promotion/createPromotionProof',data)
  },
  checkProofsStatus(){
    return MUtil.request('/promotion/checkProofsStatus',{},'get')
  },
  //获取邀请链接
  inviteLink(){
    return MUtil.formRequestios('/promotion/getDoubleDecInviteLink',{},'get')
  },
  setDownload(){
    return MUtil.formRequestios('/promotion/setDownload',{},'get')
  }

};


export default gift
