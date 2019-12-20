<template>
  <div class="contain">
    <div class="giftCon"></div>
    <div class="conBg"></div>
    <div class="giftListCon">
      <div class="giftItem oneImg">
        <div class="btn oneBtn" @click="go('one')">{{oneText}}</div>
        <div class="tips oneTips" @click="showTipsPop('领钱攻略')">领钱攻略</div>
      </div>
      <div class="giftItem twoImg">
        <div class="btn twoBtn" @click="go('two')">我要抢红包</div>
        <div class="tips oneTips" @click="showTipsPop('红包攻略')">红包攻略</div>
      </div>
      <div class="giftItem threeImg">
        <div class="btn twoBtn" v-if="showBtn" @click="go('three')">我要去邀请</div>
        <div class="btn twoBtn" v-else-if="inviteData && !showBtn && inviteData.recentAmount < inviteData.requireAmount" @click="go('showPoster')">我要去邀请</div>
        <div class="btn twoBtn" v-else-if="inviteData && inviteData.recentAmount >= inviteData.requireAmount && !inviteData.completed" @click="go('getReward')">领取礼金</div>
        <div class="btn twoBtn" v-else-if="inviteData && inviteData.completed">已完成</div>
        <div class="btn twoBtn" v-else-if="!inviteData" @click="go('notyet')">未开始</div>
        <div class="tips oneTips" @click="showTipsPop('邀请攻略')">邀请攻略</div>
      </div>
    </div>
    <div class="moreGameCon">
      <div class="moreGameTitle">更多好玩游戏</div>
      <a :href="'https://www.beihaozhuan.com?jumpTo=game'"><div class="moreGameTips">查看更多></div></a>
      <a :href="'https://iddxy.shiyiyx.com/agent/80001150/index.html'"><div class="picCon"></div></a>
    </div>
    <div v-if="showPop" class="tipPop">
      <div class="closeBtn" @click="closePop()"></div>
      <GIFTTIP :type="this.type"></GIFTTIP>
    </div>
    <div v-if="showPoster" @click="closePop()">
      <GIFTPOSTER></GIFTPOSTER>
    </div>
  </div>
</template>

<script>
  import GIFTTIP from 'gift/pages/Gift/GiftTip.vue'
  import GIFTPOSTER from 'gift/pages/Gift/GiftPoster.vue'
  import TASK from 'index/service/task-service.js'
  import MUtil from '@/utils/mm.js'
    export default {
      name: "Gift",
      data(){
          return{
            oneText:'我要领现金',
            showPoster:false,
            showPop:false,
            type:'',
            inviteData:{},
            showBtn:true,
            isAndroid:false,
            isiOS:false
          }
      },
      components:{
        GIFTTIP,GIFTPOSTER
      },
      created(){
        let from = this.$route.query.from;
        if(from === 'picUpload'){
          this.$router.push({
            name:'Gift',
          });
          this.showPoster = true;
        }
        MUtil.formRequestios('/user/isLogin', {}, 'get')
          .then(res => {
            console.log('判断登录状态', res);
            if (res.data === '用户已经登录') {
              this.getInviteInfo();
              this.oneText = '已完成'
            }else {
              this.oneText = '我要领现金'
            }
          });
      },
      methods:{
          //判断当前手机环境是安卓还是ios
        IsIA(){
          let u = navigator.userAgent, app = navigator.appVersion;
          let isAndroid = u.indexOf('Android') > -1; //android终端或者uc浏览器
          let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
          if(isiOS){
            alert('亲，本活动仅限安卓手机用户试玩，请使用安卓手机登陆或体验其他活动哟~');
          }else {
            this.$router.push({
              name:'GameDetail'
            })
          }
        },
          //获取邀请状态
        getInviteInfo(){
          TASK.getUserPermanentMissionProcessing()
            .then(res => {
              // console.log('新手任务', res);
              if (res.code === "0") {
                const found = res.data.find(element => element.missionEventName === '活动—双十二邀请好友得现金');
                  this.inviteData = found;
                  console.log('inviteData',this.inviteData)
                  this.showBtn = false;
              }
            })
        },
        showTipsPop(type){
          this.type = type;
          this.showPop = true;
        },
        closePop(){
          this.$router.go(0);
          this.showPop = false;
          this.showPoster = false;
        },
        go(type){
          let that = this;
          MUtil.formRequestios('/user/isLogin', {}, 'get')
            .then(res => {
              console.log('判断登录状态', res);
              if (res.data === '用户已经登录') {
                that.getInviteInfo();
                switch(type) {
                  case 'one':
                    this.oneText = '已完成';
                    break;
                  case 'two':
                    this.IsIA();  //判断当前手机环境是苹果还是安卓
                    break;
                  case  'showPoster':
                    this.showPoster=true;
                    this.getInviteInfo();
                    break;
                  case  'getReward':
                    this.completeMission('Permanent','活动—双十二邀请好友得现金');
                    break;
                  case 'three':
                    this.showPoster=true;
                    this.getInviteInfo();
                    break;
                  case 'notyet':
                    alert('当前任务未开始');
                    break;
                }
              } else {
                let r=confirm("您需要登陆才可以参加活动哦~，点击确定即刻登陆贝好赚~");
                if (r==true) {
                  that.wechatLogin();   //微信授权
                }
              }
            });
        },
        //交任务
        completeMission(modelName,missionEventName){
          let data = {
            "modelName" :modelName,
            "missionEventName" :missionEventName
          };
          TASK.completeMission(data)
            .then(res => {
              this.getInviteInfo();
            })
        },
        // 微信授权登录
        wechatLogin(){
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx87462aaa978561bf&redirect_uri=https%3a%2f%2fwww.beihaozhuan.com/wechat/callback&response_type=code&scope=snsapi_userinfo&state=gift#wechat_redirect';
          window.open(url,'_self');
        },
      }
    }
</script>

<style lang="less" scoped>
  .contain{
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .giftCon{
    width: 100%;
    height: 667*2px;
    .bg-image("~index/assets/gift/bg");
  }
  .conBg{
    width: 100%;
    height: 512*2px;
    background: #FED98D;
    margin-top: -2px;
  }
  .giftListCon{
    padding: 0px 24px;
    position: absolute;
    top: 240*2px;
  }
  .giftItem{
    width: 351*2px;
    margin-bottom: 8px;
    position: relative;
  }
  .oneImg{
    height: 480px;
    .bg-image("~index/assets/gift/one");
  }
  .twoImg{
    height: 404px;
    .bg-image("~index/assets/gift/two");
  }
  .threeImg{
    height: 402px;
    .bg-image("~index/assets/gift/three");
  }
  .btn{
    width: 147*2px;
    height: 88px;
    .bg-image("~index/assets/gift/btn");
    line-height: 77px;
    text-align: center;
    color: #9E2A00;
    font-size: 32px;
    font-weight: bold;
    position: absolute;
    left: 50%;
    margin-left: -147px;
  }
  .oneBtn{
    top: 129*2px;
  }
  .twoBtn{
    top: 93*2px;
  }
  .threeImg .twoBtn{
    top: 110*2px;
  }
  .tips{
    width: 280px;
    height: 48px;
    line-height: 48px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 24px;
    text-align: center;
    position: absolute;
    bottom: 70px;
    left: 50%;
    margin-left: -140px;
  }
  .threeImg .tips{
    bottom: 40px;
  }
  .moreGameCon{
    width: 95%;
    padding: 0 42px;
    position: absolute;
    top: 1850px;
  }
  .moreGameTitle{
    width: 124*2px;
    height: 40px;
    line-height: 40px;
    color: #9E2A00;
    font-size: 32px;
    float: left;
    font-weight:600;
  }
  .moreGameTips{
    width: 81*2px;
    height: 40px;
    line-height: 40px;
    color: #9E2A00;
    float: right;
  }
  .picCon{
    width: 335*2px;
    height: 148*2px;
    border-radius: 20px;
    margin-top: 72px;
    .bg-image("~index/assets/gift/giftGameImg");
  }
  .tipPop{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 999;
  }
  .closeBtn{
    width: 60px;
    height: 60px;
    .bg-image("~index/assets/gift/closeBtn");
    position: absolute;
    right: 60px;
    top: 60px;
    z-index: 9999;
  }
</style>
