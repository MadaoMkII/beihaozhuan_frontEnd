<template>
  <div class="recordCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">提现记录</div>
    <div class="recordListCon">
      <div class="footerTips">暂无数据</div>
<!--      <div class="recordItem">-->
<!--        <div class="topItem">-->
<!--          <div class="bigWechat"></div>-->
<!--          <div class="center">-->
<!--            <div class="source">提现至微信</div>-->
<!--            <div class="status">提现成功</div>-->
<!--          </div>-->
<!--          <div class="money">-->
<!--            ¥444444.44-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="footerItem">-->
<!--          <div class="date">2019-07-25 12:00:46</div>-->
<!--          <div class="coinCount">-444444金币</div>-->
<!--          <div class="coinIcon"></div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="recordItem">-->
<!--        <div class="topItem">-->
<!--          <div class="bigWechat"></div>-->
<!--          <div class="center">-->
<!--            <div class="source">提现至微信</div>-->
<!--            <div class="status">提现成功</div>-->
<!--          </div>-->
<!--          <div class="money">-->
<!--            ¥444444.44-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="footerItem">-->
<!--          <div class="date">2019-07-25 12:00:46</div>-->
<!--          <div class="coinCount">-444444金币</div>-->
<!--          <div class="coinIcon"></div>-->
<!--        </div>-->
<!--      </div>-->




    </div>






  </div>

</template>

<script>
    export default {
        name: "Record"
    }
</script>

<style lang="less" scoped>
  .recordCon{
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
  .recordListCon{
    margin-top: 36px;
  }
  .recordItem{
    width: 351*2px;
    height: 104*2px;
    border-radius: 16px;
    margin: auto;
    background: #282A37;
    margin-bottom: 16px;
  }
  .topItem{
    width: 327*2px;
    height: 67*2px;
    border-bottom: 2px solid #21232F;
    margin: auto;
  }
  .bigWechat{
    width: 88px;
    height: 88px;
    .bg-image("~index/assets/mine/bigWechat");
    margin-top: 24px;
    float: left;
  }
  .center{
    width: 128*2px;
    height: 88px;
    float: left;
    margin-left: 16px;
    margin-top: 24px;
  }
  .source{
    height: 48px;
    font-size: 28px;
    line-height: 48px;
  }
  .status{
    height: 40px;
    opacity: .6;
    font-size: 20px;
    line-height: 40px;
  }
  .money{
    width: 128*2px;
    height: 88px;
    margin-top: 24px;
    float: right;
    font-size: 36px;
    color: #DDB67F;
    text-align: right;
    line-height: 88px;
  }
  .footerItem{
    width: 327*2px;
    height: 40px;
    margin: auto;
    margin-top: 16px;
  }
  .date{
    width: 168*2px;
    height: 40px;
    opacity: .6;
    float: left;
  }
  .coinIcon{
    width: 40px;
    height: 40px;
    .bg-image("~index/assets/mine/coin");
    float: right;
  }
  .coinCount{
    height: 40px;
    line-height: 40px;
    opacity: .6;
    font-size: 28px;
    float: right;
  }
  .footerTips{
    width: 100%;
    height: 40px;
    line-height: 40px;
    margin-top: 32*2px;
    text-align: center;
    opacity: .4;
    font-size: 22px;
  }
</style>
