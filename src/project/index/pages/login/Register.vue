<template>
    <div class="loginBg">
      <div class="backBtn" @click="prev()"></div>
      <div class="registerLogoCon">
        <div class="registerLogo"></div>
      </div>
      <div class="registerInfo">
        <div class="infoItem" :class="{ 'errorTipsBorder': errorPhone }">
          <input type="text" placeholder="请输入手机号"  v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" @blur="test()">
        </div>
        <div class="infoItem" :class="{ 'errorTipsBorder': errorPw }">
          <input type="password" ref="passwordInput" v-model="password" @blur="testPW()" class="pwInput" placeholder="请输入密码">
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
        <div class="infoItem">
          <input type="text" placeholder="邀请码（非必填)" v-model="inviteCode" v-on:input ="showLoginBtn()">
        </div>
      </div>
      <div class="note">
        注册表示同意
        <span class="agreeText" @click="goAgreement()">《用户许可使用协议》</span>
        <span class="agreeText" @click="goAgreement()">《隐私政策》</span>
      </div>
      <div class="registerBtn" :class="{ 'canClick': canClick }" @click="registerLogin()">
        注册并登录
      </div>
      <div class="pwLogin" @click="goLogin()">密码登录</div>
<!--      <div class="iconMessageBox" v-show="showLoading">-->
<!--        <div class="messageIcon loading"></div>-->
<!--        <div class="message">登录中</div>-->
<!--      </div>-->
    </div>
</template>

<script>
  import API from 'index/service/login-service.js'
  export default {
    name: 'Register',
    data () {
      return {
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
        errorPhone:false,
        errorPw:false,
        erroraPw:false,
        showLoading:false
      }
    },
    created(){
      let inviteCode = this.$route.query.inviteCode;
      if(inviteCode && inviteCode != ''){
        this.inviteCode = inviteCode;
      }
    },
    methods : {
      //验证手机号是否合法
      test : function () {
        // 验证手机号
        let reg = /^1[0-9]{10}$/;
        if (this.phone == '' || this.phone.length <= 10 || !reg.test(this.phone)) {
          // console.log('请输入正确的手机号')
          this.$toastMessage({message: '请输入正确的手机号', messageType: 'text'})
          this.phone = '';
          this.canClickCode = false;
          this.errorPhone = true;
          this.fixScroll();
          return false
        }
        // console.log('手机号正确，验证通过')
        this.canClickCode = true;
        this.errorPhone = false;
        this.$toastMessage({message: '密码最少包含大小写字母各一个且为6-16位', messageType: 'text'})
        this.fixScroll();
        return true
      },
      //解决在iOS中键盘收起后出现白背景问题
      fixScroll() {
        window.scrollTo(0, 0);
      },
      //验证密码是否符合规则
      testPW(){
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])[^]{6,16}$/;
        let password = this.password;
        if (!pattern.test(password)) {
          this.errorPw = true;
          this.$toastMessage({message: '密码最少包含大小写字母各一个且为6-16位', messageType: 'text'})
          this.fixScroll();
          return false;
        }
        this.errorPw = false;
        this.fixScroll();
        return true;

      },
      //登录按钮变为可点击状态
      showLoginBtn : function () {
        let password = this.password;
        let aPassword = this.aPassword;
        let code = this.code;
        let equalPw = (password === aPassword) ? true : false;
        let testPW = this.testPW();
        if(password != '' && aPassword != '' && equalPw && code != '' && testPW){
          // console.log('显示注册按钮')
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
            // console.log('显示密码')
            this.aShowPw = true
          }else {
            this.$refs.aPasswordInput.type = 'password';
            // console.log('隐藏密码')
            this.aShowPw = false
          }
        }else{
          if(type == 'password' ){
            this.$refs.passwordInput.type = 'text';
            // console.log('显示密码')
            this.showPw = true
          }else {
            this.$refs.passwordInput.type = 'password';
            // console.log('隐藏密码')
            this.showPw = false
          }
        }
      },
      //验证两次输入的密码是否一致
      equalPw : function () {
        let password = this.password;
        let aPassword = this.aPassword;
        if(password !== aPassword){
          this.$toastMessage({message: '两次输入的密码不一致', messageType: 'text'})
          this.erroraPw = true;
          this.fixScroll();
          return false
        }
        this.erroraPw = false;
        this.fixScroll();
        return true
      },
      //跳转隐私页面
      goAgreement : function () {
        this.$router.push({
          path: '/agreement',
          name:'Agreement'
        })
      },
      //去登录
      goLogin : function () {
        this.$router.push({
          path: '/login',
          name:'Login',
          query: this.$route.query,
        })
      },
      //获取验证码
      getCode(){
        let data = {
          'tel_number' : this.phone
        };
        API.getCode(data)
          .then(res => {
            // console.log('res',res);
            if(res.code === '0'){
              this.code = res.data;
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


          API.register(data)
            .then(res => {
              // console.log('res', res);
              if (res.code === '0') {
                // this.$toastMessage({message: '注册成功', messageType: 'success'});
                // this.showLoading = true;
                // setTimeout(function(){
                //   this.showLoading = false;
                  // 直接调用登录,自动登录
                  let loginData = {
                    'password': this.password,
                    'tel_number': this.phone
                  };
                  API.login(loginData)
                    .then(res => {
                      // console.log('res', res)
                      if (res.code === '0') {
                        if (this.$route.query.action === 'cashback-game') {
                          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                          window.open(redirect, '_self');
                          return;
                        }
                        this.$router.push({
                          path: '/completInfo',
                          name: 'CompletInfo'
                        })
                      }
                    })
                // },3000)
              }
            })
        }
      }
    }
  }
</script>



<style lang="less" scoped>
  .loginBg{
    width: 100%;
    height: 100%;
    overflow: auto;
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
    padding-top: 62*2px;
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
  .errorTipsBorder{
    border-bottom: 2px solid #d8271c;
  }
  .toastMessageBox{
    max-width: 444px;
    min-height: 36*2px;
    line-height: 36*2px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: rgba(21, 22, 29, .6);
    color: #fff;
    padding: 16px 24px;
    font-size: 28px;
    border-radius: 16px;
    text-align: center;
    /*overflow: hidden;*/
  }
  .iconMessageBox{
    width: 88*2px;
    height: 88*2px;
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: rgba(21, 22, 29, .6);
    border-radius: 16px;
  }
  .messageIcon{
    width: 36*2px;
    height: 36*2px;
    margin: auto;
    margin-top: 24px;
  }
  .message{
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 16px;
    text-align: center;
    font-size: 28px;
  }
  .success{
    .bg-image("~index/assets/toast/success");
  }
  .error{
    .bg-image("~index/assets/toast/error");
  }
  .loading{
    .bg-image("~index/assets/toast/loading");
  }




</style>
