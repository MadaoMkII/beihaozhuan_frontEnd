<template>
  <div class="complateCon">
    <div class="backIcon" @click="backToMine()"></div>
    <div class="title">完善信息</div>
    <div class="headImgCon">
      <div class="headImg">
        <img v-show="showAvatar" :src="imageUrl" class="avatarImg">
      </div>
      <input type="file" id="logimg"  ref="file" accept="image/*"  @change="onRead" />

      <div class="tips">上传头像</div>
    </div>
    <div class="infoCon">
      <div class="infoItem">
        <input type="text" v-model="nickName" placeholder="请输入昵称" @blur="fixScroll()">
      </div>
      <div class="infoItem" @click="showDate()">
        <input type="text" v-model="birthday" placeholder="请输入生日" readonly>
      </div>
      <div class="submitBtn" @click="saveInfo()">
        提交
      </div>
    </div>

    <div class="areaCon" v-show="showBirthCon">
      <van-datetime-picker type="date" @cancel="onCancel" @confirm="onConfirm" :min-date="minDate"/>
    </div>
  </div>
</template>

<script>
    import  axios from 'axios'
    export default {
      name: "CompletInfo",
      data(){
          return {
            avatar : '',
            showAvatar : false,
            showCalendar : false,
            nickName : '',
            birthday : '',
            imageUrl : '',
            showBirthCon : false,
            minDate: new Date(1900, 1, 1),
          }
      },
      methods:{
        onRead(){
          this.avatar = this.$refs.file.files[0];
          //头像转码显示
          let reader = new FileReader();
          reader.readAsDataURL(this.avatar);
          reader.onload=()=>{
            // console.log(reader.result)
            this.imageUrl = reader.result
            this.showAvatar = true
          }
        },
        //点击下拉框中的确定按钮
        onConfirm(value, index) {
          if(this.showBirthCon){
            this.birthday = this.timeFormat(value);
          }
          this.onCancel();
        },
        onCancel() {
          this.showBirthCon = false;
        },
        showDate(){
          this.onCancel();
          this.showBirthCon = true
        },
        timeFormat(time) { // 时间格式化 2019-09-08
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          month = month < 10 ? '0'+month : month;
          day = day < 10 ? '0'+day : day;
          return year + '-' + month + '-' + day
        },
        //提交信息
        saveInfo(){
          let that = this;
          let formData = new FormData();
          formData.append('avatar', this.avatar);
          formData.append('nickName', this.nickName);
          formData.append('birthday', this.birthday);

          axios.post('https://www.beihaozhuan.com/user/updateInfo',
            formData,
            {
              withCredentials:true,
              headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Allow-Origin': 'http://localhost:8080'

              }
            }
          ).then(function(res){
            // console.log('SUCCESS!!',res);
            that.$router.push({
              path: '/',
              name:'Home'
            })
          })
            .catch(function(error){
              // console.log('FAILURE!!',error);
            });
        },
        //用户不填写信息，点击左上角返回按钮，跳转到我的页面
        backToMine(){
          this.$router.push({
            path: '/mine',
            name:'Mine'
          })
        }



      }
    }
</script>

<style lang="less" scoped>
  .complateCon{
    width: 100%;
    height: 100%;
    background: #313340;
    overflow: auto;
  }
  .backIcon{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 26px;
    left: 24px;
    .bg-image("~index/assets/back");
  }
  .title{
    width: 100*2px;
    height: 48px;
    margin:auto;
    padding-top: 24px;
    text-align: center;
    font-size: 17*2px;
    line-height: 48px;
  }
  .headImgCon{
    width: 108*2px;
    margin:auto;
    margin-top: 76*2px;
    position: relative;
    overflow: hidden;
  }
  .headImg{
    width: 108*2px;
    height: 108*2px;
    overflow: hidden;
    .bg-image("~index/assets/headImg");
    border-radius: 108px;
  }
  .tips{
    height: 40px;
    opacity: .4;
    color: #fff;
    line-height: 40px;
    text-align: center;
    margin-top: 4px;
  }
  .infoCon{
    width: 319*2px;
    margin: auto;
    margin-top: 32px;
  }
  .infoItem{
    width: 100%;
    height: 44*2px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.4);
    margin-bottom: 30px;
  }
  .submitBtn{
    width: 100%;
    height: 48*2px;
    margin:auto;
    margin-top: 32*2px;
    line-height: 48*2px;
    text-align: center;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    /*opacity:0.2;*/
    font-size: 18*2px;
    border-radius: 48px;
    color: #fff;
  }

  #logimg{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
  }
  .avatarImg{
    width: 100%;
    height: 100%;
  }



</style>
