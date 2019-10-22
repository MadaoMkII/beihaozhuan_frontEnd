<template>
  <div class="successCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">提交成功</div>
    <div class="successIcon">
      <div class="successImg"></div>
      <div class="successTips">恭喜获得保单，快去兑换吧！</div>
    </div>
    <div class="codeCon">
      <div class="codeText">兑换码：</div>
      <div class="code">{{redeemCode}}</div>
      <div class="exchangeBtn" @click="goTo()">前往兑换</div>
    </div>
    <div class="btnGroup">
      <div class="btn iconBtn" @click="goPage('Task')">赚金币</div>
      <div class="btn orderBtn" @click="goPage('Order')">查看订单</div>
      <div class="btn homeBtn" @click="goPage('Home')">回首页</div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "Success",
      data(){
        return{
          insuranceLink:'',
          redeemCode:''
        }
      },
      created(){
        this.insuranceLink = this.$route.query.insuranceLink;
        this.redeemCode = this.$route.query.redeemCode;
      },
      methods:{
        //跳转页面
        goPage(type){
          this.$router.push({
            name:type
          })
        },
        goTo(){
          window.open(this.insuranceLink,'_blank');
        }
      }
    }
</script>

<style lang="less" scoped>
  .successCon{
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
  .successIcon{
    width: 180*2px;
    margin: auto;
    margin-top: 98*2px;
  }
  .successImg{
    width: 180*2px;
    height: 112*2px;
    .bg-image("~index/assets/shop/success");
  }
  .successTips{
    width: 183*2px;
    height: 40px;
    margin-top: 14px;
    font-size: 28px;
  }
  .codeCon{
    width: 351*2px;
    height: 76*2px;
    border-radius: 16px;
    background: #282A37;
    margin: auto;
    margin-top: 32px;
  }
  .codeText{
    width: 76*2px;
    height: 88px;
    margin-top: 32px;
    margin-left: 24px;
    line-height: 88px;
    font-size: 32px;
    text-align: left;
    float: left;
  }
  .code{
    width: 148*2px;
    height: 88px;
    margin-top: 32px;
    font-size: 60px;
    color: #DDB67F;
    text-align: left;
    float: left;
  }
  .exchangeBtn{
    width: 160px;
    height: 48px;
    margin-top: 26*2px;
    margin-right: 24px;
    float: right;
    border-radius: 24px;
    line-height: 48px;
    text-align: center;
    background:linear-gradient(270deg,rgba(237,207,165,1) 0%,rgba(221,182,127,1) 100%);
    box-shadow:0px 0px 8px 0px rgba(0,0,0,0.2);
  }
  .btnGroup{
    width: 356*2px;
    height: 80px;
    margin: auto;
    margin-top: 32*2px;
  }
  .btn{
    width: 104*2px;
    height: 80px;
    border-radius: 40px;
    text-align: center;
    line-height: 80px;
    font-size: 28px;
    font-weight:600;
    border: 2px solid #DDB67F;
    float: left;
    color: #DDB67F;
    margin-right: 19*2px;
  }
  .homeBtn{
    margin-right: 0px;
  }
</style>
