<template>
  <div class="applyCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">申请提现</div>
    <div class="coinCon">
      <div class="nowCoin">
        <div class="nowIcon"></div>
        <div class="nowText">当前金币：</div>
      </div>
      <div class="nowCon">
        <div class="nowCount">{{coin}}</div>
        <div class="nowCountSm">(¥{{coin / 10000}})</div>
      </div>
      <div class="canCashCon">
        <div class="canCashText">可提现：</div>
        <div class="canCashCount">0</div>
        <div class="canCashCountSm">(¥0)</div>
      </div>
    </div>
    <div class="listCon">
      <div class="listItem">
        <div class="wechat"></div>
        <div class="wechatText">提现到微信</div>
      </div>
<!--      <div class="listItem inputItem">-->
<!--        <input type="text" class="coinInput" placeholder="请输入金币数量">-->
<!--        <div class="coinText">金币</div>-->
<!--        <div class="allBtn">全部</div>-->
<!--      </div>-->
<!--      <div class="listItem">-->
<!--        <div class="totalText">合计:</div>-->
<!--        <div class="total">￥0</div>-->
<!--      </div>-->
            <div class="listItem">
              <div class="totalText tipsText">提现功能开发中, 敬请期待~~~</div>
            </div>
    </div>
    <div class="tipsCon">
      <div class="tipIcon"></div>
      <div class="tip">工作时间2小时到账，非工作时间次日到账，非工作日24小时内到账</div>
    </div>
    <div class="submitBtn">
      确认提现
    </div>
  </div>
</template>

<script>
    export default {
        name: "Apply",
      data(){
        return{
          coin:''
        }
      },
      created() {
          this.coin = this.$route.query.coin;
      }
    }
</script>

<style lang="less" scoped>
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
  .coinCon{
    width: 359*2px;
    height: 158*2px;
    margin: auto;
    margin-top: 44px;
    .bg-image("~index/assets/mine/applyBg");
  }
  .nowCon{
    overflow: hidden;
  }
  .nowCoin{
    height: 40px;
    padding-top: 40px;
  }
  .nowIcon{
    width: 40px;
    height: 40px;
    .bg-image("~index/assets/mine/nowCoin");
    margin-left: 32*2px;
    float: left;
  }
  .nowText{
    width: 76*2px;
    height: 40px;
    margin-left: 8px;
    line-height: 40px;
    opacity: .5;
    font-size: 30px;
    float: left;
  }
  .nowCount{
    width: 212*2px;
    height: 80px;
    line-height: 80px;
    font-size: 60px;
    font-weight:bold;
    margin-top: 16px;
    text-align: right;
    float: left;
  }
  .nowCountSm{
    width: 139*2px;
    height: 80px;
    line-height: 80px;
    margin-left: 16px;
    margin-top: 16px;
    float: left;
  }
  .canCashCon{
    height: 48px;
    margin-top: 48px;
  }
  .canCashText{
    width: 48*2px;
    height: 48px;
    line-height: 48px;
    opacity: .6;
    float: left;
    margin-left: 32*2px;
  }
  .canCashCount{
    height: 48px;
    font-size: 40px;
    font-weight:bold;
    line-height: 48px;
    float: left;
  }
  .canCashCountSm {
    height: 48px;
    margin-left: 16px;
    line-height: 48px;
    float: left;
  }
  .listCon{
    width: 100%;
    background: #282A37;
    margin-top: 34*2px;
  }
  .listItem{
    height: 48*2px;
    margin-left: 24px;
    border-bottom: 2px solid #21232F;
  }
  .wechat{
    width: 40px;
    height: 40px;
    margin-top: 32px;
    margin-left: 24px;
    .bg-image("~index/assets/mine/wechat");
    float: left;
  }
  .wechatText{
    width: 128*2px;
    height: 48*2px;
    line-height: 48*2px;
    font-size: 32px;
    margin-left: 8px;
    float: left;
  }
  .inputItem{
    height: 64*2px;
  }
  .coinInput{
    width: 108*2px;
    height: 64*2px;
    float: left;
    line-height: 64*2px;
    margin-left: 24px;
    float: left;
  }
  .coinText{
    width: 28*2px;
    height: 64*2px;
    line-height: 64*2px;
    font-size: 28px;
    float: left;
  }
  .allBtn{
    width: 80px;
    height: 48px;
    border-radius: 24px;
    border: 2px solid #DDB67F;
    line-height: 48px;
    text-align: center;
    float: right;
    color: #DDB67F;
    margin-right: 24px;
    margin-top: 40px;
  }
  .totalText{
    width: 80px;
    height: 48*2px;
    margin-left: 24px;
    line-height: 48*2px;
    font-size: 28px;
    opacity: .6;
    float: left;
  }
  .tipsText{
    width: 100%;
  }
  .total{
    height: 48*2px;
    line-height: 48*2px;
    font-size: 36px;
    font-weight:500;
    float: left;
  }
  .tipsCon{
    height: 36*2px;

  }
  .tipIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/mine/tip");
    margin-top: 36px;
    margin-left: 24px;
    float: left;
  }
  .tip{
    width: 335*2px;
    height: 36*2px;
    opacity: .6;
    line-height: 18*2px;
    margin-top: 32px;
    margin-left: 4px;
    float: left;
  }
  .submitBtn{
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
</style>
