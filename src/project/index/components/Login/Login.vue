<template>
    <div class="loginBg">
      <div class="logo">
        <div class="logoImg"></div>
      </div>
      <div class="userInfoCon">
        <div class="inputItem">
          <input type="text" placeholder="请输入手机号" v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" @blur="test()">
        </div>

        <div class="inputItem" v-if="showCodeItem">
          <input type="text" class="passwordInput" placeholder="请输入验证码" v-model="code" v-on:input ="showLoginBtn()" @blur="fixScroll()">
          <div class="codeBtn" :class="{ 'canClickCode': canClickCode }" @click="getCode()" v-show="showCodeBtn">{{codeBtnText}}</div>
          <div class="codeBtn" v-show="!showCodeBtn">{{count}}S</div>
        </div>
        <div class="inputItem" v-else>
          <input class="passwordInput" ref="passwordInput" type="password" v-model="password" v-on:input ="showLoginBtn()" placeholder="请输入登录密码" @blur="fixScroll()">
          <div class="forgetCon">
            <div class="forgetText" @click="goPage('forgetPw')">忘记密码</div>
            <div class="forgetBorder"></div>
            <div class="hidePw"  :class="{ 'showPw': showPw }" @click="showPassword()"></div>
          </div>
        </div>

        <div class="loginBtn" :class="{ 'canClick': canClick }" v-if="canClick" @click="login()">
          登录
        </div>
        <div class="loginBtn" :class="{ 'canClick': canClick }" v-else>
          登录
        </div>
        <div class="registerCon">
            <div class="registerItem phoneRegister" @click="goRegister()">手机号快速注册</div>
            <div class="registerItem code" @click="showCode()">{{codeMessage}}</div>
        </div>
      </div>

      <div class="wechat" @click="wechatLogin()" v-show="isWeixin">
        <div class="wechatTitle">第三方账号登录</div>
        <div class="wechatImg"></div>
      </div>

    </div>
</template>

<script>
  import API from 'index/service/login-service.js'
    export default {
      name: "Login",
      data() {
        return {
          showPw:false,
          password : '',
          phone : '',
          code : '',
          showCodeBtn : true,
          codeBtnText:'获取验证码',
          count: '',
          timer: null,
          canClick : false,
          canClickCode : false,
          showCodeItem : false,
          codeMessage : '验证码登录',
          isWeixin:true
        }
      },
      created(){
        this.is_weixin();  //判断是不是微信浏览器
      },
      methods: {
        // 判断当前浏览器是不是微信浏览器
        is_weixin() {
          let ua = window.navigator.userAgent.toLowerCase();
          if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            console.log('是微信浏览器')
            this.isWeixin = true;
          } else {
            console.log('不是微信浏览器')
            this.isWeixin = false;
          }
        },
        // 微信授权登录
        wechatLogin(){
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx87462aaa978561bf&redirect_uri=https%3a%2f%2fwww.beihaozhuan.com/wechat/callback&response_type=code&scope=snsapi_userinfo&state=CHECK#wechat_redirect';
          window.open(url,'_self');
        },
        //跳转页面
        goPage:function(type){
          this.$router.push({
            path: '/loginInfo',
            name:'LoginInfo',
            query: {
              type: type
            }
          })
        },
        //跳转到注册页面
        goRegister : function(){
          this.$router.push({
            path: '/register',
            name:'Register'
          })
        },
        //显示验证码区域
        showCode : function(){
          if(this.showCodeItem){
            this.phone = '';
            this.password = '';
            this.code = '';
            this.codeMessage = '验证码登录';
            this.showCodeItem = false;
          }else{
            this.phone = '';
            this.password = '';
            this.code = '';
            this.codeMessage = '密码登录';
            this.showCodeItem = true;
          }
        },
        //验证手机号是否合法
        test : function () {
          // 验证手机号
          let reg = /^1[0-9]{10}$/;
          if (this.phone == '' || this.phone.length <= 10 || !reg.test(this.phone)) {
            console.log('请输入正确的手机号')
            this.$toastMessage({message: '请输入正确的手机号', messageType: 'text'})
            this.phone = '';
            this.canClickCode = false;
            this.fixScroll();
            return false
          }
          console.log('手机号正确，验证通过')
          this.canClickCode = true;
          this.fixScroll();
          return true
        },
        //登录按钮变为可点击状态
        showLoginBtn : function () {
          let password = this.password;
          let code = this.code;
          console.log('password',password)
          if(password != '' || code != ''){
            this.canClick = true
          }else {
            this.canClick = false
          }
        },
        //显示密码
        showPassword : function () {
          let type = this.$refs.passwordInput.type;
          if(type == 'password'){
            this.$refs.passwordInput.type = 'text';
            console.log('显示密码')
            this.showPw = true
          }else {
            this.$refs.passwordInput.type = 'password';
            console.log('隐藏密码')
            this.showPw = false
          }
        },
        //获取验证码
        getCode(){
          let data = {
            'tel_number' : this.phone
          };
          API.getLoginCode(data)
            .then(res => {
              console.log('res',res);
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
            .catch(error =>{
               this.$toastMessage({message: '该手机号未注册', messageType: 'text'})
            })
        },
        //登录
        login(){
          let data = {
            'tel_number' : this.phone,
            'password' : this.password,
            'smsLoginVerifyCode' : this.code
          };
          API.login(data)
            .then(res => {
              console.log('res',res)
              if(res.code === '0') {
                // this.$router.push({
                //   path: '/',
                //   name:'Home'
                // })
                // if (this.$route.query.redirect) {
                //   let redirect = this.$route.query.redirect;
                //   this.$router.push(redirect);
                // } else {
                //   this.$router.push('/');
                // }
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({path:redirect})
              }
            })
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
  .logo{
    width: 137*2px;
    height: 81*2px;
    margin: auto;
    padding-top: 112*2px;
  }
  .logoImg{
    width: 137*2px;
    height: 81*2px;
    .bg-image("~index/assets/logo");
  }
  .userInfoCon{
    width: 320*2px;
    margin: auto;
    margin-top: 37*2px;
  }
  .inputItem{
    width: 100%;
    height: 44*2px;
    margin-bottom: 16*2px;
    border-bottom: 4px solid rgba(255, 255, 255, 0.4);
    input{
      width: 100%;
      height: 44*2px;
      outline:medium;
      border:none;
      line-height: 44*2px;
      background: transparent;
      color: #fff;
      font-size: 14*2px;
    }
    input::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
    .passwordInput{
      width: 191*2px;
      float: left;
    }
    .forgetCon{
      width: 128*2px;
      height: 88px;
      float: right;
    }
  }
  .forgetText{
    width: 56*2px;
    height: 88px;
    font-size: 24px;
    line-height: 88px;
    float: right;
    text-align: right;
  }
  .forgetBorder{
    width: 4px;
    height: 17*2px;
    background: rgba(255, 255, 255, 0.4);
    float: right;
    margin-top: 28px;
  }
  .hidePw{
    width: 32px;
    height: 32px;
    float: right;
    margin-right: 18px;
    margin-top: 28px;
    .bg-image("~index/assets/hidePw");
  }
  .loginBtn{
    width: 100%;
    height: 48*2px;
    margin-top: 32*2px;
    line-height: 48*2px;
    text-align: center;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    opacity:0.2;
    font-size: 18*2px;
    border-radius: 48px;
    color: #fff;
  }
  .registerCon{
    width: 100%;
    height: 48px;
    margin-top: 32px;
    .registerItem{
      line-height: 48px;
      font-size: 24px;
      color: #fff;
    }
    .phoneRegister{
      float: left;
    }
    .code{
      float: right;
    }
  }
  .wechat{
    width: 88*2px;
    margin: auto;
    margin-top:40*2px;
    margin-bottom: 60*2px;
    .wechatTitle{
      font-size: 24px;
    }
    .wechatImg{
      width: 88px;
      height: 88px;
      margin:auto;
      margin-top: 8px;
      .bg-image("~index/assets/wechat");
    }
  }
  .showPw{
    .bg-image("~index/assets/showPw");
  }
  .codeBtn{
    width: 72*2px;
    height: 48px;
    border-radius: 24px;
    border: 2px solid #DDB67F;
    line-height: 48px;
    text-align: center;
    float: right;
    margin-top: 20px;
    color: #DDB67F;
    opacity: .2;
  }
  .canClick{
    opacity: 1;
  }
  .canClickCode{
    opacity: 1;
  }
</style>
