<template>
  <div class="loginInfo">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">{{info.title}}</div>
     <div class="infoCon">
       <div v-if="info.showPwCon">
        <div class="infoItem">
          <input type="password" placeholder="请输入新密码" v-model="password" @blur="fixScroll()">
        </div>
        <div class="infoItem">
          <input type="password" placeholder="请确认新密码" v-model="aPassword" @blur="fixScroll()">
        </div>
        <div class="tips">请输入2-15个字符</div>
      </div>
      <div v-else>
        <div class="infoItem">
          <input type="text" placeholder="请输入手机号"  v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')" maxlength="11" @blur="test()">

        </div>
        <div class="infoItem">
          <input type="text" class="codeInput" placeholder="请输入验证码" v-model="code" v-on:input ="showSubmitBtn()" @blur="fixScroll()">
          <div class="code" :class="{ 'canClickCode': canClickCode }" @click="getCode()" v-show="showCodeBtn">{{codeBtnText}}</div>
          <div class="code" v-show="!showCodeBtn">{{count}}S</div>
        </div>
      </div>
      <div class="submitBtn" :class="{ 'canClick': canClick }" @click="save()">
        {{info.submitBtn}}
      </div>
    </div>
  </div>
</template>

<script>
  import API from 'index/service/login-service.js'
  import axios from 'axios';
    export default {
        name: "LoginInfo",
        data () {
          return {
            info: {
              title: '',
              type: '',
              submitBtn : '',
              showPwCon:false,
            },
            showCodeBtn : true,
            codeBtnText : '获取验证码',
            code : '',
            phone : '',
            password : '',
            aPassword: '',
            canClick : false,
            canClickCode : false,
            count : ''
          }
        },

        created(){
          this.getParams();
        },
        methods :{
          getParams(){
            // 取到路由带过来的参数
            const type = this.$route.query.type;
            // console.log('type',type)
            if(type == 'bindPhone'){
              // console.log('绑定手机号')
              this.info.title = '绑定手机号';
              this.info.type = type;
              this.info.submitBtn = '绑定并登录';
              this.info.showPwCon = false
            }else if(type == 'forgetPw'){
              // console.log('忘记密码')
              this.info.title = '忘记密码';
              this.info.type = type;
              this.info.submitBtn = '提交';
              this.info.showPwCon = false
            }else if(type == 'resetPw'){
              // console.log('重置密码')
              this.info.title = '重置密码';
              this.info.type = type;
              this.info.submitBtn = '提交';
              this.info.showPwCon = true
            }else if(type == 'updatePw'){
              // console.log('修改密码')
              this.info.title = '修改密码';
              this.info.type = type;
              this.info.submitBtn = '提交';
              this.info.showPwCon = false
            }
          },
          //验证手机号是否合法
          test : function () {
            // 验证手机号
            let reg = /^1[0-9]{10}$/;
            if (this.phone == '' || this.phone.length <= 10 || !reg.test(this.phone)) {
              // console.log('请输入正确的手机号')
              this.$toastMessage({message: '请输入正确的手机号', messageType: 'text'})
              this.phone = '';
              this.canClickCode = false;
              this.fixScroll();
              return false
            }
            // console.log('手机号正确，验证通过')
            this.canClickCode = true;
            this.fixScroll();
            return true
          },
          //获取验证码
          getCode(){
            const type = this.$route.query.type;
            let data = {
              'tel_number' : this.phone
            };
            // console.log('data',data)
              API.getPwCode(data)
                .then(res => {
                  // console.log('res',res);
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
          //判断信息是否填全，按钮可点击
          showSubmitBtn(){
            this.canClick = true
          },
          save(){
            let that = this;
            let type = this.info.type;
            if(type == 'bindPhone'){
              // console.log('绑定手机号');
              let data = {};
              let statusString =  this.$route.query.statusString;
              let jumpTo =  this.$route.query.jumpTo;
              let head =  this.$route.query.head;
              let nickName =  this.$route.query.nickName;

              if(statusString && statusString != '' && jumpTo && jumpTo != '' && head && head != '' && nickName && nickName != ''){
                data.statusString = statusString;
                // data.jumpTo = jumpTo;
                data.head = head;
                data.nickName = nickName;
              }
              data.tel_number = this.phone;
              data.smsVerifyCode = this.code;

                API.bindWechat(data)
                  .then(res => {
                    // console.log('res',res);
                    if(res.code === '0'){
                      this.$toastMessage({message: '绑定成功', messageType: 'success'})
                      this.$router.push({
                        path: '/',
                        name:'Home'
                      })
                    }
                  })


            }else if(type == 'forgetPw' || type == 'updatePw'){
              let forgetData = {
                'tel_number' : this.phone,
                'code' : this.code
              };
              API.verifyFpbCode(forgetData)
                .then(res => {
                  // console.log('res',res);
                  if(res.code === '0'){
                    this.$router.push({
                      path: '/loginInfo',
                      name:'LoginInfo',
                      query: {
                        type: 'resetPw'
                      }
                    })
                  }else {
                    that.$toastMessage({message: '验证码不正确', messageType: 'text'})
                  }
                })
            }else if(type == 'resetPw'){
              // console.log('重置密码')
              let that = this;
              let resetData = {
                'password' : this.password
              };
              API.updateUserPassword(resetData)
                .then(res => {
                  // console.log('res',res);
                  if(res.code === '0'){
                    that.$toastMessage({message: '重置成功', messageType: 'success'})
                    that.$router.push({
                      path: '/login',
                      name:'Login'
                    })
                  }
                })
            }
          }
        },
        watch: {
          '$route': 'getParams'
        }
    }
</script>

<style lang="less" scoped>
  .loginInfo{
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
    width: 100%;
    height: 48px;
    margin:auto;
    padding-top: 24px;
    font-size: 17*2px;
    line-height: 48px;
    text-align: center;
  }
  .infoCon{
    width: 319*2px;
    margin: auto;
    margin-top: 102*2px;
  }
  .infoItem{
    width: 100%;
    height: 44*2px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.4);
    margin-bottom: 30px;
  }
  .codeInput{
    width: 191*2px;
    float: left;
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
  .submitBtn{
    width: 100%;
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
  .tips{
    width: 128*2px;
    height: 32*2px;
    opacity: .4;
  }
  .canClick{
    opacity: 1;
  }
  .canClickCode{
    opacity: 1;
  }
</style>
