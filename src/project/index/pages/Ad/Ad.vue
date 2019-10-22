<template>
    <div style="height: 100%;overflow-y: hidden">
      <div class="tipsCon" v-if="noAdsTips">
        <p class="tips">暂时没有任务啦，您可以休息一会儿或换个任务尝试~</p>
        <div class="backBtn" @click="close()">返回</div>
      </div>
      <div  style="height: 100%;overflow-y: hidden" v-else>
        <div class="bannerAdCon" v-if="source === 'banner'" style="height: 100%;overflow-y: hidden">
          <div class="closeBtn" v-show="showCloseBtn" @click="closeAd()">X</div>
          <iframe src="../../../static/ads/bannerAd.html" frameborder="0" name="showHere" scrolling=auto width='100%' height='100%'></iframe>
        </div>
        <div class="bannerAdCon" v-else-if="source === 'native'" style="height: 100%;overflow-y: hidden">
          <div class="closeBtn" v-show="showCloseBtn" @click="closeAd()">X</div>
          <iframe src="../../../static/ads/nativeAd.html" frameborder="0" name="showHere" scrolling=auto width='100%' height='100%'></iframe>
        </div>
        <div v-else-if="source === 'full'" style="height: 100%">
          <div class="closeBtn" v-show="showCloseBtn" @click="closeAd()">X</div>
          <iframe ref="iframe" src="../../../static/ads/fullAd.html" frameborder="0" name="showHere" scrolling=auto width='100%' height='100%'></iframe>
        </div>
        <div v-else style="height: 100%">
          <div class="closeBtn" v-show="showCloseBtn" @click="closeAd()">X</div>
          <iframe :src="source" frameborder="0" name="showHere" scrolling=auto width='100%' height='100%'></iframe>
        </div>
      </div>
    </div>
</template>

<script>
  import MineInfo from 'index/service/mine-service.js';
  import AD from 'index/service/ad-service.js';
  import CryptoJS from 'crypto-js/crypto-js.js';
    export default {
      name: "Ad",
      data(){
        return{
          source: '',
          uuid:'',
          userUUid:'',
          showCloseBtn : false,
          noAdsTips:false,
          finishAdvertisement:false
        }
      },
      created() {
          let that = this;
          let source = this.$route.query.source;
          let uuid = this.$route.query.uuid;
          this.source = source;
          this.uuid = uuid;
          localStorage.setItem('uuid', uuid);
          console.log('获取到的source',source);
          //17秒后显示关闭按钮
          setTimeout(function(){
            if(that.source !== 'full'){
              that.showCloseBtn = true;
            }
          },35000);
          MineInfo.getUserInfo()
            .then(res => {
              console.log('res',res)
              if(res.code === '0'){
                let userUUid = res.data.uuid;
                this.userUUid = userUUid;
                localStorage.setItem('userUUid', userUUid);
              }
            });
      },
      mounted() {
        window.checkAdvertisement = this.checkAdvertisement;
        window.checkFinishAdvertisement = this.checkFinishAdvertisement;
        window.close = this.close;
        window.showNoAdsTip = this.showNoAdsTip;
      },
      methods:{
        //在没有拉取到广告的时候，显示提示
        showNoAdsTip(){
          this.noAdsTips = true
        },
        //关闭广告
        closeAd(){
          this.prev();
          this.checkFinishAdvertisement();
          this.$toastMessage({message: '任务完成', messageType: 'success'});
        },
        close(){
          let finishAdvertisement = this.finishAdvertisement;
          this.prev();
          if(finishAdvertisement){
            this.$toastMessage({message: '任务完成', messageType: 'success'});
          }
        },
        encryptSign(){
          let timeStamp = '';
          timeStamp = new Date().getTime();
          let obj={
            'uuid':this.uuid,
            'userUUid':this.userUUid,
            'timeStamp': timeStamp
          };
          const key = CryptoJS.enc.Utf8.parse("12gy122414ABdDEF"); //十六位十六进制数作为秘钥
          const iv = CryptoJS.enc.Utf8.parse('AHCdCF12351f3412');
          let resultStr = ``;
          Object.keys(obj).sort().forEach((key) => {
            resultStr = resultStr + `${key}=${obj[key]}&`
          });
          let src = CryptoJS.enc.Utf8.parse(resultStr);
          let encrypted = CryptoJS.AES.encrypt(src, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
          console.log('encrypted',encrypted)
          return encrypted.ciphertext.toString().toUpperCase();
        },
        checkAdvertisement(){
          let timeStamp = '';
          timeStamp = new Date().getTime();
          let data = {
            'sign': this.encryptSign(),
            'uuid':this.uuid,
            'userUUid':this.userUUid,
            'timeStamp': timeStamp
          };
          AD.checkAdvertisement(data)
            .then(res => {
              console.log('res',res)
              if(res.code === '0'){

              }
            });
        },
        checkFinishAdvertisement(){
          let timeStamp = '';
          timeStamp = new Date().getTime();
          let data = {
            'sign': this.encryptSign(),
            'uuid':this.uuid,
            'userUUid':this.userUUid,
            'timeStamp': timeStamp
          };
          AD.checkFinishAdvertisement(data)
            .then(res => {
              console.log('res',res)
              if(res.code === '0'){
                this.finishAdvertisement = true
              }
            });
        }
      }
    }
</script>

<style lang="css" scoped>
  .bannerAdCon{
    /*margin-top: 300px!important;*/
  }
  .closeBtn{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 2px solid #fff;
    line-height: 40px;
    text-align: center;
    z-index: 99;
  }
  .tipsCon{
    width: 400px;
    height: 400px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
  .tips{
    font-size: 30px;
  }
  .backBtn{
    width: 100%;
    height: 96px;
    margin-top: 100px;
    line-height: 96px;
    text-align: center;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    font-size: 36px;
    border-radius: 48px;
    color: #fff;
  }
</style>
