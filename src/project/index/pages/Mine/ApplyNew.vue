<template>
  <div class="applyCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">申请提现</div>
    <div class="balanceCon">
      <div class="balanceTop">
        <div class="balanceTopLeft">可提金额<div class="tipIcon" @click="showPopBox = true"></div></div>
        <div class="balanceTopRight" @click="goPage()">提现记录></div>
      </div>
      <div class="balanceTotal" v-if="Bcoins !=''">{{Bcoins}}金币</div>
      <div class="balanceTotal" v-else>— —</div>
      <div class="balanceRmb"  v-if="Bcoins !=''">约¥{{balanceRmb}}元</div>
      <div class="balanceRmb"  v-else>— —</div>
    </div>
    <div class="itemCon paddingRight">
      <div class="ItemTitle"><div class="borderIcon"></div>活动提现</div>
      <div class="cashCardCon clearfix">
        <div class="bubble">限时提现</div>
        <div class="cashCard" :class="{'active' : twelve}" @click="changeTwelve()">¥{{twelveData.amount/100}}元</div>
      </div>
      <div class="tipsCon">
        <div class="down"></div>
        <div class="tipsTitle">限时提现说明：</div>
        <div class="tipsDetail">该提现额度限时开放</div>
      </div>
    </div>
    <div class="itemCon">
      <div class="ItemTitle"><div class="borderIcon"></div>常规金额</div>
      <div class="cashCardCon clearfix">
        <div class="cashCard" v-for='(item,index) in dataList'   @click="change(index)"   :class='{ active:index===number}'>¥{{item.amount/100}}元</div>
      </div>
    </div>
    <div class="itemCon paddingRight">
      <div class="ItemTitle"><div class="borderIcon"></div>提现到</div>
      <div class="bindWx" :class="{'active' : hasWX}" v-if="!hasWX" @click="goToWx()">
        <div class="wxIcon"></div>
        <div class="wxText">尚未绑定微信，点击绑定方可提现</div>
      </div>
      <div class="bindWx" :class="{'active' : hasWX}" v-else-if="hasWX">
        <div class="wxIcon"></div>
        <div class="wxText">{{nickName}}(已绑定)</div>
      </div>
    </div>
    <div class="submitBtn" v-if="!canClick">确认提现</div>
    <div class="submitBtn canClick" v-else-if="canClick" @click="submit()">确认提现</div>

    <div class="mask" v-show="showPopBox"></div>
    <div class="popBox"  v-show="showPopBox">
      <div class="popTitle">提现说明</div>
      <div class="popCon">
        1.	您可以通过完成各种任务获取金币，并根据比例（1元提现额度：10000金币）进行提现。<br>
        2.	提现分为活动及常规提现，活动提现需要完成相应要求方可进行提现（可查看页面详细要求）。常规提现则没有要求，您的余额达到兑换要求即可。<br>
        3.	由于系统限制，每位用户每天可提现一次，该次数由活动提现和常规提现共享。<br>
        4.	发起提现成功后，将在2小时内到账成功，若遇高峰期，可能延迟到账，请耐心等待。<br>
        5.	提现到账成功，可在微信的【微信-我-钱包-零钱-零钱明细】中查询。<br>
        6.	提现发起后系统会校验收益获得情况，若发现通过非正常手段获取收益（包括但不限于刷单软件、模拟器、应用多开、利用系统漏洞等），贝好赚有权取消您的提现资格并回收非正常收益，情节严重的，贝好赚有权采取封号等必要措施，并保留追究其法律责任的权力。<br>
      </div>
      <div class="popBtn"  @click="showPopBox = false">我知道了</div>

    </div>
  </div>
</template>

<script>
  import MINE from 'index/service/mine-service.js'
  import MineInfo from 'index/service/mine-service.js'
    export default {
      inject:['reload'],
      name: "ApplyNew",
      data(){
        return{
          showPopBox:false,
          canClick:false,
          hasWX:false,
          nickName:'',
          Bcoins:'',
          twelve:false,
          wxBtn:false,
          twelveData:{},
          dataList:[],
          number:'',
          optionType:'',
          balanceRmb:''
        }
      },
      created(){
        MineInfo.getUserInfo()
          .then(res => {
            // console.log('res',res)
            if(res.code === '0'){
              this.Bcoins = res.data.Bcoins;
              this.balanceRmb = (this.Bcoins/10000).toFixed(2);
            }
          });
        // this.Bcoins = this.$route.query.Bcoins;
        this.getInfo();
        this.getWechatNickName();
      },
      methods:{
        //获取提现信息
        getInfo(){
          MINE.getWithDrewSetting()
            .then(res => {
              if(res.code === "0"){
                let data = res.data.withDrewSetting;
                for(let i=0;i<data.length;i++){
                  if(data[i].optionType === 'E'){
                    this.twelveData = data[i]
                  }else {
                    this.dataList.push(data[i])
                  }
                }
              }
            })
        },
        //获取微信昵称
        getWechatNickName(){
          MINE.getWechatNickName()
            .then(res => {
              if(res.code === "0"){
                let data = res.data;
                if(!data || data === ''){
                  this.hasWX = false;
                }else if(data != ''){
                  this.hasWX = true;
                  this.nickName = data
                }
              }
            })
        },
        change(index) {
          let Bcoins = this.Bcoins/10000;
          let amount = this.dataList[index].amount/100;
          if(Bcoins >= amount){
            this.optionType = this.dataList[index].optionType;
          }else{
            this.optionType = '';
            this.$toastMessage({message: '金币余额不足', messageType: 'text'})
          }
          if(this.twelve){
            this.twelve = false;
          }
          this.number= index;
          this.checkVal();  //必填项校验
        },
        changeTwelve(){
          if(!this.twelve){
            this.twelve = true;
            this.number = '';
          }
          let Bcoins = this.Bcoins/10000;
          let amount = this.twelveData.amount/100;
          if(Bcoins >= amount){
            this.optionType = this.twelveData.optionType;
          }else{
            this.optionType = '';
            this.$toastMessage({message: '金币余额不足', messageType: 'text'})
          }
          this.checkVal();  //必填项校验
        },
        //跳转到提现记录页面
        goPage(){
          this.$router.push({
            name:'Record'
          })
        },
        //微信授权
        goToWx(){
          let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx87462aaa978561bf&redirect_uri=https%3a%2f%2fwww.beihaozhuan.com/wechat/callback&response_type=code&scope=snsapi_userinfo&state=CHECK#wechat_redirect';
          window.open(url,'_self');
        },
        //检查必填项是否都已经选中
        checkVal(){
          let optionType = this.optionType;
          let nickName = this.nickName;
          if(optionType != '' && nickName != ''){
            this.canClick = true;
          }else {
            this.canClick = false;
          }
        },
        submit(){
          let data ={
            'type':this.optionType
          }
          MINE.withdrew(data)
            .then(res => {
              if(res.code == '0'){
                this.$toastMessage({message: '提现成功', messageType: 'success'});
                this.reload();
              }else if(res.code == 400){
                this.$toastMessage({message: res.data, messageType: 'text'});
              }
            })
        }
      }
    }
</script>

<style lang="less" scoped>
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
  .clearfix:after{
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
  }
  .clearfix{
    *zoom: 1;
  }
  .applyCon{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #313340;
  }
  .backIcon{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 26px;
    left: 24px;
    z-index: 99;
    .bg-image("~index/assets/back");
  }
  .title{
    width: 100%;
    height: 70px;
    margin:auto;
    padding-top: 24px;
    font-size: 17*2px;
    line-height: 48px;
    text-align: center;
    background: #313340;
    position: fixed;
    z-index: 9;
  }
  .balanceCon{
    width: 100%;
    min-height: 96*2px;
    background: #282A37;
    margin-top: 88px;
    margin-bottom: 16px;
  }
  .balanceTop{
    height: 28*2px;
    line-height: 28*2px;
    padding: 24px 24px 0 24px;
    overflow: hidden;
  }
  .balanceTopLeft{
    float: left;
    width: 90*2px;
    font-size: 28px;
    opacity: .6;
    overflow: hidden;
  }
  .balanceTopRight{
    float: right;
    width: 85*2px;
    font-size: 28px;
    text-align: right;
  }
  .tipIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/mine/tip");
    margin-left: 24px;
    float: right;
    margin-top: 15px;
  }
  .balanceTotal{
    float: left;
    height: 80px;
    line-height: 80px;
    color: #DDB67F;
    font-size: 50px;
    font-weight: bold;
    margin-left: 24px;
  }
  .balanceRmb{
    float: left;
    height: 48px;
    font-size: 28px;
    margin-top: 35px;
    color: #DDB67F;
  }
  .itemCon{
    /*width: 100%;*/
    min-height: 96*2px;
    background: #282A37;
    margin-bottom: 16px;
    padding: 24px 0 24px 24px;
    overflow: hidden;
  }
  .paddingRight{
    padding-right: 24px;
  }
  .paddingRight .cashCard{
    margin-bottom: 0px;
  }
  .ItemTitle{
    height: 28*2px;
    line-height: 28*2px;
    opacity: .76;
    font-size: 32px;
  }
  .borderIcon{
    width: 8px;
    height: 40px;
    background: #fff;
    opacity: .6;
    border-radius: 4px;
    float: left;
    margin-right: 8px;
    margin-top: 8px;
  }
  .cashCardCon{
    margin-top: 32px;
    position: relative;
  }
  .cashCard{
    width: 220px;
    height: 64*2px;
    background: hsla(0, 0%, 100%, 0.1);
    border-radius: 12px;
    float: left;
    text-align: center;
    line-height: 64*2px;
    font-size: 32px;
    margin-right: 20px;
    margin-bottom: 32px;
    box-sizing:border-box
  }
  .bubble{
    width: 86*2px;
    height: 48px;
    line-height: 48px;
    font-size: 20px;
    text-align: center;
    background:linear-gradient(270deg,rgba(228,28,52,1) 0%,rgba(244,121,50,1) 100%);
    border-radius:200px 200px 0px 200px;
    position: absolute;
    top: -24px;
    /*padding: 5px;*/
    left: 0;
  }
  .tipsCon{
    background: #FFFFFF1A;
    padding: 16px;
    margin-top: 24px;
    border-radius: 12px;
    position: relative;
  }
  .tipsTitle{
    height: 40px;
    line-height: 40px;
    margin-top: 16px;
  }
  .tipsDetail{
    line-height: 36px;
    opacity: .6;
  }
  .down{
    width:0;
    height:0;
    overflow:hidden;
    font-size: 0;
    line-height: 0;
    border-width:15px;
    border-style:dashed dashed solid dashed;
    border-color:transparent transparent #3D3F4BFF transparent;
    position: absolute;
    top: -29px;
    left: 90px;
  }
  .bindWx{
    height: 64*2px;
    background: #FFFFFF1A;
    border-radius: 12px;
    margin-top: 32px;
  }
  .wxIcon{
    width: 40px;
    height: 40px;
    float: left;
    .bg-image("~index/assets/mine/wx");
    margin:44px 32px;
  }
  .wxText{
    height: 64*2px;
    line-height: 64*2px;
    font-size: 32px;
  }
  .submitBtn{
    width: 320*2px;
    height: 48*2px;
    margin:auto;
    margin-top: 32*2px;
    margin-bottom: 80px;
    line-height: 48*2px;
    text-align: center;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    opacity:0.2;
    font-size: 18*2px;
    border-radius: 48px;
    color: #fff;
  }
  .canClick{
    opacity: 1;
  }
  .active{
    border: 2px solid #DDB67F;
  }
  .popBox{
    width: 294*2px;
    height: 364*2px;
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
    height: 255*2px;
    padding: 24px;
    color: #333;
    opacity: .5;
    font-size: 26px;
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
