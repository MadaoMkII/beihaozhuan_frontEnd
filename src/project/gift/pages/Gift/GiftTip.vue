<template>
  <div class="con">
    <div class="mask"></div>
    <div class="giftTipCon">
      <div class="giftTitle">{{type}}</div>
      <div class="tipCon" v-if="type === '领钱攻略'">
        1、点击“我要领现金”进入贝好赚注册页面<br/>
        2、注册成为会员<br/>
        3、账户获得2000贝金币，约0.2元<br/>
        4、红包名额有限，送完即止。活动结束后，贝好赚平台将开放提现通道<br/>
        5、贝好赚永久地址：https://www.beihaozhuan.com<br/>
        6、关注我，领钱不迷路<br/>
        7、每个手机号仅可完成一次本活动<br/>
      </div>
      <div class="tipCon" v-else-if="type === '红包攻略'">
        1、点击“我要抢红包”进入试玩下载页面<br/>
        2、根据页面规则进行操作<br/>
        3、审核后账户获得5000贝金币，约0.5元<br/>
        4、红包名额有限，送完即止。活动结束后，贝好赚平台将开放提现通道<br/>
        5、贝好赚永久地址：https://www.beihaozhuan.com/<br/>
        6、关注我，领钱不迷路<br/>
        7、每个手机号仅可完成一次本活动<br/>
      </div>
      <div class="tipCon" v-else-if="type === '邀请攻略'">
        1、点击“我要去邀请”获得邀请海报<br/>
        2、保存海报，发送给朋友、微信群、朋友圈等<br/>
        3、朋友通过海报注册平台并登陆，双方即可获得相应奖励<br/>
        4、审核通过后，邀请人可获得3000贝金币，约0.3元<br/>
        5、红包名额有限，送完即止。活动结束后，贝好赚平台将开放提现通道<br/>
        6、贝好赚永久地址：https://www.beihaozhuan.com/<br/>
        7、关注我，领钱不迷路<br/>
        8、每个手机号仅可完成一次本活动<br/>
      </div>
      <div class="qrcodeCon"></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "GiftTip",
      props: {
        type: String    // 接受值并定义传递值类型
      },
      data(){
        return{

        }
      },
      methods:{

      }
    }
</script>

<style lang="less" scoped>
  .con{
    width: 100%;
    height: 100%;
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
  .giftTipCon{
    width: 100%;
    height: 597*2px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    z-index: 999;
    .bg-image("~index/assets/gift/popBg");
  }
  .giftTitle{
    width: 300px;
    height: 80px;
    color: #FFE06B;
    font-size: 28*2px;
    text-align: center;
    position: absolute;
    top: 116*2px;
    left: 50%;
    margin-left: -150px;
  }
  .tipCon{
    width: 290*2px;
    left: 52*2px;
    top: 202*2px;
    position: absolute;
    color: #6B3808;
    line-height: 45px;
  }
  .qrcodeCon{
    width: 132*2px;
    height: 132*2px;
    background: #ccc;
    position: absolute;
    bottom: 90px;
    left: 50%;
    margin-left: -132px;
    .bg-image("~index/assets/qrcode");
  }
</style>
