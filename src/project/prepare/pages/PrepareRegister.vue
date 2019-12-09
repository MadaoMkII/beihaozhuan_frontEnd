<template>
  <div class="loginBg">
<!--    <div class="backBtn" @click="prev()"></div>-->
    <div class="lastdatesCon">距平台上线还有<span> {{lastdates}} </span>天</div>
    <div class="registerLogoCon">
      <div class="registerLogo"></div>
    </div>
    <div class="registerInfo">
      <div class="infoItem" :class="{ 'errorTipsBorder': errorPhone }">
        <input type="text" placeholder="请输入手机号"  v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" @blur="test()">
      </div>
      <div class="infoItem" :class="{ 'errorTipsBorder': errorPw }">
        <input type="password" ref="passwordInput" v-model="password"  @blur="testPW()"  class="pwInput" placeholder="请输入密码">
        <div class="hidePw" :class="{ 'showPw': showPw }" @click="showPassword()"></div>
      </div>
      <div class="infoItem" :class="{ 'errorTipsBorder': erroraPw }">
        <input type="password" ref="aPasswordInput" v-model="aPassword" class="pwInput" placeholder="请再次确认密码" @blur="equalPw()" v-on:input ="showLoginBtn()">
        <div class="hidePw" :class="{ 'aShowPw': aShowPw }" @click="showPassword('a')"></div>
      </div>
      <div class="infoItem">
        <input type="text" class="pwInput" v-model="code" placeholder="请输入验证码" v-on:input ="showLoginBtn()" @blur="fixScroll()">
        <div class="code" :class="{ 'canClickCode': canClickCode }" @click="getCode()" v-show="showCodeBtn">{{codeBtnText}}</div>
        <div class="code" v-show="!showCodeBtn">{{count}}S</div>
      </div>
<!--      <div class="infoItem">-->
<!--        <input type="text" placeholder="邀请码（非必填)" v-model="inviteCode" v-on:input ="showLoginBtn()">-->
<!--      </div>-->
    </div>
    <div class="note">
      注册表示同意
<!--      <span class="agreeText">《用户许可使用协议》</span>-->
      <span class="agreeText" @click="goAgreement()">《用户许可使用协议》</span>
<!--      <span class="agreeText" @click="goAgreement()">《隐私政策》</span>-->
    </div>
    <div class="registerBtn" :class="{ 'canClick': canClick }" @click="registerLogin()">
      注册
    </div>
<!--    <div class="pwLogin" @click="goLogin()">密码登录(新)</div>-->
<!--    <button @click="showPopaa()" >测试按钮</button>-->

    <div class="mask" v-show='showPop'></div>
    <div class="popCon" v-show='showPop'>
      <img src="../assets/WechatIMG2.jpeg" alt="">
      <div class="popPhone">{{phone}}</div>
      <div class="goSignInBtn" @click="goSignIn()">去签到</div>
    </div>
  </div>
</template>

<script>
  import REGISTER from '@/project/prepare/service/gift-service.js'
  export default {
    name: 'Register',
    data () {
      return {
        showPop:false,
        showPw:false,
        aShowPw:false,
        password : '',
        aPassword : '',
        showCodeBtn : true,
        codeBtnText:'获取验证码',
        count: '',
        timer: null,
        inviteCode: '',
        phone : '',
        code : '',
        canClick : false,
        canClickCode : false,
        lastdates : '',
        errorPhone:false,
        errorPw:false,
        erroraPw:false
      }
    },
    mounted(){
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      let currentdate = year + seperator1 + month + seperator1 + strDate;
      this.dateDiff(currentdate,'2019-10-01');
    },
    methods : {
      showPopaa(){
        this.showPop = true;
      },
      //验证密码是否符合规则
      testPW(){
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])[^]{6,16}$/;
        let password = this.password;
        if (!pattern.test(password)) {
          this.errorPw = true;
          this.$toastMessage({message: '密码最少包含大小写字母各一个且为6-16位', messageType: 'text'})
          return false;
        }
        this.errorPw = false;
        return true;
      },
      //解决在iOS中键盘收起后出现白背景问题
      fixScroll() {
        window.scrollTo(0, 0);
      },
      dateDiff(startDateString, endDateString){
        let separator = "-"; //日期分隔符
        let startDates = startDateString.split(separator);
        let endDates = endDateString.split(separator);
        let startDate = new Date(startDates[0], startDates[1]-1, startDates[2]);
        let endDate = new Date(endDates[0], endDates[1]-1, endDates[2]);
        let lastdates = parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24);
        this.lastdates = lastdates;
        // return parseInt(Math.abs(endDate - startDate ) / 1000 / 60 / 60 /24);//把相差的毫秒数转换为天数
      },
  //验证手机号是否合法
      test : function () {
        // 验证手机号
        let reg = /^1[0-9]{10}$/;
        if (this.phone == '' || this.phone.length <= 10 || !reg.test(this.phone)) {
          console.log('请输入正确的手机号')
          this.errorPhone = true;
          this.$toastMessage({message: '请输入正确的手机号', messageType: 'text'})
          this.phone = '';
          this.canClickCode = false;
          this.fixScroll();
          return false
        }
        console.log('手机号正确，验证通过')
        this.canClickCode = true;
        this.errorPhone = false;
        this.fixScroll();
        this.$toastMessage({message: '密码最少包含大小写字母各一个且为6-16位', messageType: 'text'})
        return true
      },
      //登录按钮变为可点击状态
      showLoginBtn : function () {
        let password = this.password;
        let aPassword = this.aPassword;
        let code = this.code;
        let equalPw = (password === aPassword) ? true : false;
        let testPW = this.testPW();
        if(password != '' && aPassword != '' && equalPw && code != '' && testPW){
          console.log('显示注册按钮')
          this.canClick = true
        }else {
          this.canClick = false
        }
      },
      //显示密码
      showPassword : function (e) {
        let type = this.$refs.passwordInput.type;
        let aType = this.$refs.aPasswordInput.type;
        if(e === 'a'){
          if(aType == 'password' ){
            this.$refs.aPasswordInput.type = 'text';
            console.log('显示密码')
            this.aShowPw = true
          }else {
            this.$refs.aPasswordInput.type = 'password';
            console.log('隐藏密码')
            this.aShowPw = false
          }
        }else{
          if(type == 'password' ){
            this.$refs.passwordInput.type = 'text';
            console.log('显示密码')
            this.showPw = true
          }else {
            this.$refs.passwordInput.type = 'password';
            console.log('隐藏密码')
            this.showPw = false
          }
        }
      },
      //验证两次输入的密码是否一致
      equalPw : function () {
        this.fixScroll();
        let password = this.password;
        let aPassword = this.aPassword;
        if(password !== aPassword){
          this.erroraPw = true;
          this.$toastMessage({message: '两次输入的密码不一致', messageType: 'text'})
          return false
        }
        this.erroraPw = false;
        return true
      },
      //跳转隐私页面
      goAgreement : function () {
        this.$router.push({
          path: '/prepareAgreement',
          name:'PrepareAgreement'
        })
      },
      //获取验证码
      getCode(){
        let data = {
          'tel_number' : this.phone
        };
        REGISTER.getCode(data)
          .then(res => {
            console.log('res',res);
            if(res.code === '0'){
              // this.code = res.data;
              const TIME_COUNT = 60;
              if (!this.timer) {
                this.count = TIME_COUNT;
                this.showCodeBtn = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.showCodeBtn = true;
                    this.codeBtnText = '重新获取';
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
              }
            }
          })
      },
      //注册并登录
      registerLogin(){
        if(this.canClick) {
          let data = {
            'smsVerifyCode': this.code,
            'password': this.password,
            'tel_number': this.phone,
            'inviteCode': this.inviteCode
          };
          REGISTER.register(data)
            .then(res => {
              console.log('res', res);
              if (res.code === '0') {
                // this.$toastMessage({message: '注册成功', messageType: 'success'});
                this.showPop = true;
              }
            })
        }
      },
      //去签到
      goSignIn(){
        window.open('https://www.beihaozhuan.com/missionSignIn','_self');
      }
    }
  }
</script>



<style lang="less" scoped>
  .loginBg{
    width: 100%;
    height: 100%;
    .bg-image("~index/assets/loginBg");
  }
  .backBtn{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 26px;
    left: 24px;
    .bg-image("~index/assets/back");
  }
  .registerLogoCon{
    width: 92*2px;
    height: 60*2px;
    margin:auto;
    /*<!--padding-top: 62*2px;-->*/
  }
  .registerLogo{
    width: 92*2px;
    height: 60*2px;
    .bg-image("~index/assets/register");
    background-size:contain;
  }
  .registerInfo{
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
  .pwInput{
    width: 191*2px;
    float: left;
  }
  .hidePw{
    width: 32px;
    height: 32px;
    float: right;
    margin-right: 16px;
    margin-top: 28px;
    .bg-image("~index/assets/hidePw");
  }

  .code{
    width: 72*2px;
    height: 48px;
    float: right;
    margin-top: 20px;
    text-align: center;
    line-height: 48px;
    border-radius: 24px;
    font-size: 24px;
    color: #DDB67F;
    border:2px solid #DDB67F;
    opacity: .2;
  }
  .note{
    width: 272*2px;
    height: 48px;
    margin-left: 28*2px;
    font-size: 24px;
    line-height: 48px;
    a{
      font-size: 24px;
      line-height: 48px;
      color: #60A0EF;
    }
  }
  .agreeText{
    color: #60A0EF;
    text-decoration:underline;
  }
  .registerBtn{
    width: 320*2px;
    height: 48*2px;
    margin:auto;
    margin-top: 32*2px;
    line-height: 48*2px;
    text-align: center;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    opacity:0.2;
    font-size: 18*2px;
    border-radius: 48px;
    color: #fff;
  }
  .pwLogin{
    width: 69*2px;
    height: 24*2px;
    margin: auto;
    margin-top: 32px;
    font-size: 24px;
    line-height: 48px;
    text-align: center;
  }
  .showPw{
    .bg-image("~index/assets/showPw");
  }
  .aShowPw{
    .bg-image("~index/assets/showPw");
  }
  .canClick{
    opacity: 1;
  }
  .canClickCode{
    opacity: 1;
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
  .popCon{
    width: 375*2px;
    height: 667*2px;
    background: #313340;
    position: absolute;
    z-index: 999;
    top: 0;
    left: 0;
    right:0;
    bottom:0;
    margin: auto;
    /*border-radius: 24px;*/
    /*background:url(~@/project/prepare/assets/WechatIMG2.jpeg) no-repeat;*/
    /*background-size:contain;*/
    animation: fade-in;/*动画名称*/
    animation-duration: 1.5s;/*动画持续时间*/
    -webkit-animation:fade-in 1.5s;/*针对webkit内核*/
    overflow: hidden;
  }
  @keyframes fade-in {
    0% {opacity: 0;}/*初始状态 透明度为0*/
    40% {opacity: 0;}/*过渡状态 透明度为0*/
    100% {opacity: 1;}/*结束状态 透明度为1*/
  }
  @-webkit-keyframes fade-in {/*针对webkit内核*/
    0% {opacity: 0;}
    40% {opacity: 0;}
    100% {opacity: 1;}
  }
  .popCon img{
    width: 100%;
    height: 100%;
  }
  .popPhone{
    font-size: 30px;
    line-height: 30px;
    text-align: center;
    margin-top: 360px;
    color: #DDB67F;
    position: absolute;
    top: 0;
    z-index: 99;
    margin-left: 280px;
  }
  .lastdatesCon{
    height: 40px;
    line-height: 40px;
    /*padding-left: 50px;*/
    font-size: 50px;
    /*position: absolute;*/
    text-align: center;
    margin-bottom: 50px;
    padding-top: 90px;
    color: #DDB67F;
    letter-spacing:13px
  }
  .lastdatesCon span{
    font-size: 50px;
    font-weight: bold;
    color: #DDB67F;
  }
  .errorTipsBorder{
    border-bottom: 2px solid #d8271c;
  }
  .goSignInBtn{
    width: 470px;
    height: 75px;
    background: #DDB67F;
    position: absolute;
    bottom: 180px;
    left: 50%;
    margin-left: -240px;
    color: #000;
    line-height: 75px;
    font-size: 30px;
    text-align: center;
  }

</style>
