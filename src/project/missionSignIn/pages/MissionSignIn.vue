<template>
  <div>
    <div class="topImg"></div>
    <div class="signBtn" v-if="showSignInStatusBtn">
      <div class="signStatus">已签到</div>
      <div class="signCount">累计{{count}}天</div>
    </div>
    <div class="signBtn signInNormal" v-else @click="signPop()"></div>

    <div class="q_tb_div">
      <div class="q_tb_box">
        <span class="s_l" :class="{ 'c_xz': activeClass[0].c_xz}"><i></i>一天</span>
        <em></em>
        <span :class="{ 'c_xz': activeClass[1].c_xz}"><i></i>二天</span>
        <em></em>
        <span :class="{ 'c_xz': activeClass[2].c_xz}"><i></i>三天</span>
        <em></em>
        <span :class="{ 'c_xz': activeClass[3].c_xz}"><i></i>四天</span>
        <em></em>
<!--        <span><i></i>五天</span>-->
<!--        <em></em>-->
<!--        <span><i></i>周六</span>-->
<!--        <em></em>-->
        <span class="s_r" :class="{ 'c_xz': activeClass[4].c_xz}"><i></i>五天</span>
      </div>
    </div>
    <div class="qt_tit_div">
      <div>累计签到有奖</div>
    </div>
    <div class="rewardItem oneNormal" :class="{ 'oneLight': oneLight}"></div>
    <div class="rewardItem threeNormal" :class="{ 'threeLight': threeLight}"></div>
    <div class="rewardItem fiveNormal" :class="{ 'fiveLight': fiveLight}"></div>
    <div class="qt_tit_div">
      <div>签到规则</div>
    </div>
    <div class="ruleCon">
      <div class="ruleIcon"></div>
      <div class="ruleItem">1、贝好赚用户在页面进行签到，签到周期为7天</div>
      <div class="ruleItem">2、累计签到次数达到1次、3次、5次后将得到一个贝金币的红包</div>
      <div class="ruleItem">3、红包不累加，一个用户仅可获得一个红包</div>
      <div class="ruleItem">4、所有红包仅发送给注册用户，非注册用户无法收到红包</div>
    </div>



    <div class="mask" v-show='showPop' @click="closeSignPop()"></div>
    <div class="popCon" v-show='showPop'>
      <div class="close" @click="closeSignPop()">X</div>
      <div class="inputCon">
        <input type="text" placeholder="请输入手机号" v-model="tel_number">
      </div>
      <div class="tips">{{errorTips}}</div>
      <div class="signInBtn" @click="signIn()" v-if="!needRegister">签到</div>
      <div class="signInBtn" @click="goRegister()" v-else-if="needRegister">去注册</div>
    </div>


  </div>
</template>

<script>
  import SIGNIN from 'missionSignIn/service/signIn-service.js'
  import axios from 'axios';
    export default {
      name: "MissionSignIn",
      data(){
        return {
          showPop:false,
          showSignInStatusBtn : false,
          active: 1,
          tel_number : '',
          needRegister:false,
          errorTips:'',
          count:'',
          oneLight:false,
          threeLight:false,
          fiveLight:false,
          activeClass:[
            {"c_xz":false},
            {"c_xz":false},
            {"c_xz":false},
            {"c_xz":false},
            {"c_xz":false}
          ]
        }
      },
      created(){
        this.showStep();
      },
      methods:{
        signPop(){
          this.showPop = true;
        },
        closeSignPop(){
          this.showPop = false;
        },
        //签到
        signIn() {
          let tel_number = this.tel_number;
          let that = this;
          axios.get('https://www.beihaozhuan.com/user/signIn?tel_number='+tel_number)
            .then(function (res) {
              console.log(res.data);
              let data = res.data;
              if (data.code == 404) {
                console.log('找不到这个用户，去注册');
                that.errorTips = '当前账号未注册，请先去注册'
                that.needRegister = true;
              }else if(data.code == 0){
                console.log('签到成功');
                that.count = data.data.count;
                that.showSignInStatusBtn = true;
                that.showPop = false;
                that.showStep();
              }else if(data.code == 201){
                console.log('今天已经签到了');
                that.count = data.data.count;
                that.showSignInStatusBtn = true;
                that.showPop = false;
                that.showStep();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        },
        //根据签到天数显示进度条 显示金币奖励
        showStep(){
          let count = this.count;
          for(let i=0;i< count;i++){
            this.activeClass[i].c_xz = true;
          }
          if(count == 1 || count == 2){
            this.oneLight = true;
          }
          else if(count == 3 || count == 4){
            this.oneLight = true;
            this.threeLight = true;
          }else if(count == 5 ){
            this.oneLight = true;
            this.threeLight = true;
            this.fiveLight = true;
          }

        },
        //去注册
        goRegister(){
          window.open('https://www.beihaozhuan.com','_self');
        }

      }
    }
</script>

<style lang="less" scoped>
  .topImg{
    width: 100%;
    height: 280px;
    background:url(~missionSignIn/assets/topImg.jpeg) no-repeat;
    background-size: contain;
  }
  .signBtn{
    margin: 0 auto;
    text-align: center;
    width: 168px;
    height: 168px;
    background:url(~missionSignIn/assets/signBtn.png) no-repeat;
    background-size: contain;
    margin-top: 30px;
  }
  .signInNormal{
    background:url(~missionSignIn/assets/signIn.jpeg) no-repeat;
    background-size: contain;
  }
  .signStatus{
    padding-top: 35px;
    color: #000;
    font-size: 30px;
  }
  .signCount{
    color: #000;
    font-size: 30px;
    padding-top: 10px;
  }
  .q_tb_div{
    padding-top:88px;
  }
  .q_tb_box{
    margin:0 auto;
    text-align:center;
  }
  .q_tb_box span{
    width:48px;
    height:55px;
    display:inline-block;
    padding-top:48px;
    line-height:55px;
    font-size:20px;
    text-align:center;
    letter-spacing:2px;
    color:#094147;
    position:relative;
  }
  .q_tb_box span i{
    width:48px;
    height:48px;
    display:inline-block;
    position:absolute;
    top:0px;
    left:0px;
    background:url(~missionSignIn/assets/ti02.png) no-repeat;
    background-size: cover;
  }
  .q_tb_box em{
    width:70px;
    height:8px;
    background:#0b5961;
    margin-top:20px;
    display:inline-block;
    vertical-align:top;
  }

  .q_tb_box span.s_l i{
    background:url(~missionSignIn/assets/ti00.png) no-repeat;
    background-size: cover;
  }
  .q_tb_box span.s_r i{
    background:url(~missionSignIn/assets/ti03.png) no-repeat;
    background-size: cover;
  }
  .q_tb_box span.c_xz{
    color:#094147;
  }
  .c_xz{
    color:#094147;
  }
  .q_tb_box span.c_xz i{
    background:url(~missionSignIn/assets/ti01.jpeg) no-repeat;
    background-size: cover;
  }
  .qt_tit_div{
    border-top:1px solid #dddddd;
    margin:0 auto;
    margin-top:40px;
    text-align:center;
  }
  .qt_tit_div div{
    margin:0 auto;
    text-align:center;
    width:220px;
    background:#fff;
    margin-top:-23px;
    line-height:45px;
    font-size:30px;
    color:#666;
  }
  .rewardItem{
    width: 330*2px;
    height: 200*2px;
    margin: auto;
    margin-top: 20px;
  }
  .oneNormal{
    background:url(~missionSignIn/assets/oneNormal.jpeg) no-repeat;
    background-size: contain;
  }
  .threeNormal{
    background:url(~missionSignIn/assets/threeNormal.jpeg) no-repeat;
    background-size: contain;
  }
  .fiveNormal{
    background:url(~missionSignIn/assets/fiveNormal.jpeg) no-repeat;
    background-size: contain;
  }
  .oneLight{
    background:url(~missionSignIn/assets/oneLight.jpeg) no-repeat;
    background-size: contain;
  }
  .threeLight{
    background:url(~missionSignIn/assets/threeLight.jpeg) no-repeat;
    background-size: contain;
  }
  .fiveLight{
    background:url(~missionSignIn/assets/fiveLight.jpeg) no-repeat;
    background-size: contain;
  }
  .ruleCon{
    margin-top: 20px;
    margin-bottom: 40px;
  }
  .ruleIcon{
    width: 110*2px;
    height: 38*2px;
    background:url(~missionSignIn/assets/l_j.jpg) no-repeat;
    background-size: contain;
  }
  .ruleItem{
    /*height: 60px;*/
    line-height: 60px;
    font-size: 30px;
    color:#666;
    padding-left: 50px;
    padding-right: 50px;
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
    width: 600px;
    height: 500px;
    background: #fff;
    position: absolute;
    border-radius: 20px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
  }
  .close{
    width: 32px;
    height: 32px;
    border-radius: 16px;
    border: 2px solid #000;
    text-align: center;
    line-height: 32px;
    position: absolute;
    right: 20px;
    top: 20px;
    color: #666;
  }
  .inputCon{
    width: 500px;
    height: 90px;
    margin-top: 150px;
    margin-left: 50px;
    border-bottom: 2px solid #000;
  }
  input{
    width: 100%;
    height: 44*2px;
    outline:medium;
    border:none;
    line-height: 44*2px;
    background: transparent;
    color: #999;
    font-size: 14*2px;
  }
  input::-webkit-input-placeholder {
    color: #999;
  }
  .signInBtn{
    width: 300px;
    height: 48*2px;
    margin: auto;
    margin-top: 32*2px;
    line-height: 48*2px;
    text-align: center;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    font-size: 18*2px;
    border-radius: 48px;
    color: #fff;
  }
  .tips{
    height: 40px;
    line-height: 40px;
    color: #dd9227;
    margin-top: 20px;
    padding-left: 50px;
  }
</style>
