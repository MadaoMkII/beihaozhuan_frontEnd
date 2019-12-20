<template>
    <div class="picUploadCon">
      <div class="banner"></div>
      <div class="centerCon">
        <div class="item">
          <div class="label">试玩手机号</div>
          <input type="text" class="input" v-model="account" placeholder="请输入试玩手机号"/>
        </div>
        <div class="item">
          <div class="label uploadLabel">登录截图</div>
          <div class="uploadImg">
            <img v-show="showPic1" :src="imageUrl1" class="picImg">
            <input type="file" class="logimg"  ref="file1" accept="image/*"  @change="onRead('one')" />
          </div>
        </div>
        <div class="item">
          <div class="label uploadLabel">截图示例</div>
          <div class="uploadImg">
            <img :src="templateImg" class="picImg" preview="0">
          </div>
        </div>
<!--        <div class="item">-->
<!--          <div class="label uploadLabel">注册截图</div>-->
<!--          <div class="uploadImg">-->
<!--            <img v-show="showPic2" :src="imageUrl2" class="picImg">-->
<!--            <input type="file" class="logimg"  ref="file2" accept="image/*"  @change="onRead('two')" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="item">-->
<!--          <div class="label uploadLabel">绑定截图</div>-->
<!--          <div class="uploadImg">-->
<!--            <img v-show="showPic3" :src="imageUrl3" class="picImg">-->
<!--            <input type="file" class="logimg"  ref="file3" accept="image/*"  @change="onRead('three')" />-->
<!--          </div>-->
<!--        </div>-->
      </div>
      <div class="btn" v-if="!loading" @click="upload()">提交</div>
      <div class="btn loading" v-else-if="loading">上传中</div>

      <div class="mask" v-show="showPopBox"></div>
      <div class="popBox"  v-show="showPopBox">
        <div class="popTitle">说明</div>
        <div class="popCon">
          1.	贝好赚已经收到您的截图啦，小编紧急审核中，请耐心等待<br>
          2.	点击关闭弹窗，开启三重礼任务，邀请好友可获取第三个红包哦~<br>
        </div>
        <div class="popBtn"  @click="closePop()">关闭</div>
      </div>
    </div>
</template>

<script>
  import GIFT from 'gift/service/gift-service.js'
    export default {
      name: "PicUpload",
      data(){
        return{
          showPopBox:false,
          loading:false,
          showPic1 : false,
          imageUrl1:'',
          file1:'',
          account:'',
          templateImg:'/static/bannerImg/banner1.jpeg'
        }
      },
      mounted(){
        this.$preview.on('imageLoadComplete', (e, item) =>{
          let _preview = this.$preview.self;
          let lookUrl = window.location.href + '&look';
          window.history.pushState(null, null, lookUrl);
          _preview.listen('close',
            function() {
              if (window.location.href.indexOf('&look') !== -1) {
                window.history.back();
              }
            });
          window.onhashchange = function() {
            if (_preview !== null && _preview !== undefined) {
              _preview.close();
              _preview = null;
            }
          };
        });
      },
      methods:{
        onRead(type){
          if(type === 'one'){
            this.file1 = this.$refs.file1.files[0];
            if(this.file1) {
              let reader = new FileReader();
              reader.readAsDataURL(this.file1);
              reader.onload = () => {
                this.imageUrl1 = reader.result;
                this.showPic1 = true
              }
            }
          }
        },
        //提交下载凭证
        upload(){
          this.loading = true;
          let that = this;
          let formData = new FormData();
          formData.append('account', this.account);
          formData.append('loginPicUrl', this.file1);
          // formData.append('registerPicUrl', this.file2);
          // formData.append('bindingPicUrl', this.file3);
          if(this.account === '' || this.file1 === ''){
            alert('请将信息填写完整');
            this.loading = false;
          }else {
            GIFT.createPromotionProof(formData)
              .then(res => {
                console.log('res',res);
                if(res.code === "0"){
                  that.showPopBox = true;
                }
              })
          }
        },
        closePop(){
          this.showPopBox = false;
          let url = 'https://www.beihaozhuan.com/gift/?from=picUpload';
          window.open(url,'_self');
        }
      }
    }
</script>

<style lang="less" scoped>
  .picUploadCon{
    width: 100%;
    height: 100%;
    background: #F4F4F4;
  }
  .banner{
    width: 100%;
    height: 148*2px;
    .bg-image("~index/assets/gift/banner");
  }
  .centerCon{
    height: 376*2px;
    margin: -80px 24px;
    background: #fff;
    border-radius: 12px;
    padding: 32px;
  }
  .btn{
    width: 320*2px;
    height: 48*2px;
    margin: 120px auto;
    background:linear-gradient(270deg,rgba(228,28,52,1) 0%,rgba(244,121,50,1) 100%);
    color: #fff;
    font-size: 36px;
    line-height: 48*2px;
    text-align: center;
    border-radius: 48px;
  }
  .item{
    margin-bottom: 40px;
    overflow: hidden;
  }
  .label{
    width: 92*2px;
    float: left;
    color: #333;
    line-height: 80px;
  }
  .input{
    width: 210*2px;
    height: 80px;
    border: 1px solid #ccc;
    padding-left: 16px;
    color: #999;
  }
  .uploadImg{
    width: 72*2px;
    height: 72*2px;
    float: left;
    position: relative;
    .bg-image("~index/assets/gift/upload");
  }
  .uploadLabel{
    line-height: 72*2px;
  }
  .logimg{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
  }
  .picImg{
    width: 100%;
    height: 100%;
  }
  input::-webkit-input-placeholder{
    color:#ccc;
  }
  .loading{
    opacity: .2;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 0;
  }
  .popBox{
    width: 294*2px;
    height: 200*2px;
    background: #fff;
    border-radius: 12px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
  }
  .popTitle{
    width: 161*2px;
    height: 40px;
    margin: 32px auto 0 auto;
    color: #333333;
    font-size: 28px;
    line-height: 40px;
    font-weight:600;
    text-align: center;
  }
  .popCon{
    height: 92*2px;
    padding: 24px 50px;
    color: #333;
    opacity: .5;
    font-size: 26px;
    line-height: 50px;
    overflow-y: auto;
  }
  .popBtn{
    height: 48*2px;
    line-height: 48*2px;
    text-align: center;
    margin: auto;
    font-size: 28px;
    color: #333;
    border-top: 2px solid #F4F4F4;
  }
</style>
