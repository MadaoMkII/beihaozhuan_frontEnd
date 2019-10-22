<template>
    <div class="loginCon">
      <div class="loginCenterCon">
        <div class="loginBox">
          <div class="loginLogo"></div>
          <div class="loginTitle">管理平台</div>
          <div class="loginInputItem">
            <div class="userNameIcon"></div>
            <input type="text" class="loginInput" v-model="tel_number" placeholder="请输入您的账号">
          </div>
          <div class="loginInputItem">
            <div class="userNameIcon passwordIcon"></div>
            <input type="password" class="loginInput" v-model="password" placeholder="请输入您的密码">
          </div>
          <div class="loginBtn" @click="login()">
            登录
          </div>
        </div>
      </div>
      <div class="loginFooter">
        ©2019 天津实境科技有限公司出品
      </div>
    </div>
</template>

<script>
  import LOGIN from 'admin/service/login-service.js'
    export default {
      name: "Login",
      data(){
          return{
            tel_number: '',
            password: 'Abc123'
          }
      },
      methods:{
        login(){
          let data ={
            'tel_number' : this.tel_number,
            'password' : this.password
          };
          LOGIN.login(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                localStorage.setItem('userName', this.tel_number);
                this.getUserInfo();   //获取用户信息，存储用户权限
                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                this.$router.push({path:redirect})
              }
            })
        },
        //获取用户权限等信息
        getUserInfo(){
          LOGIN.getUserInfo()
            .then(res => {
              console.log('res',res);
              if(res.code == 0){
                let role = res.data.role;
                let avatar = res.data.avatar ? res.data.avatar : '';
                localStorage.setItem('avatar', avatar);
                if(role === '客服'){  //如果是客服权限
                  localStorage.setItem('csRole', 'true');
                }else {
                  localStorage.setItem('csRole', 'false');
                }

                if(role === '超管'){
                  localStorage.setItem('AdminRole', 'true');
                }
              }
            })
        }
      }
    }
</script>

<style lang="css" scoped>
  .loginCon{
    width: 100%;
    height: 100%;
    background:url(~admin/assets/bg.png) no-repeat;
    background-size: 100% 100%;
    position: fixed;
  }
  .loginCenterCon{
    width: 902px;
    height: 556px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background:url(~admin/assets/centerBg.png) no-repeat;
    background-size:contain;
  }
  .loginBox{
    width: 296px;
    margin-left: 547px;
  }
  .loginLogo{
    width: 104px;
    height: 80px;
    background:url(~admin/assets/logo.png) no-repeat;
    background-size:contain;
    margin: auto;
    margin-top: 98px;
  }
  .loginTitle{
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 26px;
    color: #fff;
    margin-bottom: 33px;
  }
  .loginInputItem{
    height: 54px;
    margin-bottom: 15px;
    border-bottom: 1px solid #979797;
  }
  .userNameIcon{
    width: 24px;
    height: 24px;
    background:url(~admin/assets/user.png) no-repeat;
    background-size:contain;
    float: left;
    margin-top: 15px;
  }
  .loginInput{
    float: left;
    width: 240px;
    height: 54px;
    background: transparent;
    border:none;
    outline:none;
    padding-left: 8px;
    color: rgba(255, 255, 255, .85);
  }
  .passwordIcon{
    background:url(~admin/assets/password.png) no-repeat;
    background-size:contain;
  }
  .loginBtn{
    width: 232px;
    height: 48px;
    border-radius: 24px;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    color: #fff;
    font-size: 18px;
    line-height: 48px;
    text-align: center;
    margin: auto;
    margin-top: 31px;
  }
  .loginFooter{
    width: 100%;
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: rgba(255, 255, 255, .45);
    position: fixed;
    bottom: 0;
  }
</style>
