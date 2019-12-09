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
          <div class="label uploadLabel">注册截图</div>
          <div class="uploadImg">
            <img v-show="showPic2" :src="imageUrl2" class="picImg">
            <input type="file" class="logimg"  ref="file2" accept="image/*"  @change="onRead('two')" />
          </div>
        </div>
        <div class="item">
          <div class="label uploadLabel">绑定截图</div>
          <div class="uploadImg">
            <img v-show="showPic3" :src="imageUrl3" class="picImg">
            <input type="file" class="logimg"  ref="file3" accept="image/*"  @change="onRead('three')" />
          </div>
        </div>
      </div>
      <div class="btn" v-if="!loading" @click="upload()">提交</div>
      <div class="btn loading" v-else-if="loading">上传中</div>
    </div>
</template>

<script>
  import GIFT from 'gift/service/gift-service.js'
    export default {
      name: "PicUpload",
      data(){
        return{
          loading:false,
          showPic1 : false,
          showPic2 : false,
          showPic3 : false,
          imageUrl1:'',
          imageUrl2:'',
          imageUrl3:'',
          file1:'',
          file2:'',
          file3:'',
          account:''
        }
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
          }else if(type === 'two'){
            this.file2 = this.$refs.file2.files[0];
            if(this.file2) {
              let reader = new FileReader();
              reader.readAsDataURL(this.file2);
              reader.onload = () => {
                this.imageUrl2 = reader.result;
                this.showPic2 = true
              }
            }
          }else if(type === 'three'){
            this.file3 = this.$refs.file3.files[0];
            if(this.file3) {
              let reader = new FileReader();
              reader.readAsDataURL(this.file3);
              reader.onload = () => {
                this.imageUrl3 = reader.result;
                this.showPic3 = true
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
          formData.append('registerPicUrl', this.file2);
          formData.append('bindingPicUrl', this.file3);
          if(this.account === '' || this.file1 === '' || this.file2 === '' || this.file3 === '' ){
            alert('请将信息填写完整')
          }
          GIFT.createPromotionProof(formData)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                // that.$message({
                //   type: 'success',
                //   message: '操作成功'
                // });
                alert('提交成功');
                that.$router.push({
                  name:'GameDetail'
                })
              }
            })
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
</style>
