<template>
  <div class="orderDetailCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">订单详情</div>
    <div class="status" v-if="orderDetail.orderStatus === 'Close'">
      <div class="statusIcon"></div>
      已关闭
    </div>
    <div class="status" v-else-if="orderDetail.orderStatus === 'Pending'">
      <div class="statusIcon"></div>
      进行中
    </div>
    <div class="status" v-else-if="orderDetail.orderStatus === 'Complete'">
      <div class="statusIcon"></div>
      已完成
    </div>
    <div class="detailCon">
      <div class="detailItem">
        <div class="label">下单时间：</div>
        <div class="detail">{{orderDetail.created_at}}</div>
      </div>
      <div class="detailItem shopTitle">
        <div class="label">商品名称：</div>
        <div class="detail shopDetail">{{orderDetail.title}}</div>
      </div>
      <div class="detailItem">
        <div class="label">商品总额：</div>
        <div class="detail">{{orderDetail.goodPrice}}金币</div>
      </div>
    </div>
    <div class="subTitle">投保人信息</div>
    <div class="detailCon">
      <div class="detailItem">
        <div class="label">姓名：</div>
        <div class="detail">{{orderDetail.realName}}</div>
      </div>
      <div class="detailItem">
        <div class="label">身份证号：</div>
        <div class="detail shopDetail">{{orderDetail.IDNumber}}</div>
      </div>
      <div class="detailItem addressItem">
        <div class="label addressLabel">家庭住址：</div>
        <div class="detail address">{{orderDetail.detailAddress}} </div>
      </div>
    </div>
    <div class="codeCon">
      <div class="codeLabel">兑换码：</div>
      <div class="code">{{orderDetail.redeemCode}}</div>
      <div class="codeBtn" @click="goTo()">前往兑换</div>
    </div>
  </div>
</template>

<script>
  import ORDER from 'index/service/order-service.js'
    export default {
      name: "OrderDetail",
      data(){
        return{
          orderDetail:{},
          insuranceLink:''
        }
      },
      created(){
        let orderUUid = this.$route.query.orderUUid;
        this.getOrderDetail(orderUUid);
      },
      methods:{
        //获取订单详情
        getOrderDetail(orderUUid){
          let data = {
            'orderUUid': orderUUid,
            'page':'1',
            'unit':'1'
          }
          ORDER.getOrderDetail(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.orderDetail = res.data[0];
                this.insuranceLink = res.data[0].goodID.insuranceLink
              }
            })
        },
        goTo(){
          window.open(this.insuranceLink,'_blank');
        }
      }
    }
</script>

<style lang="less" scoped>
  .orderDetailCon{
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
  .status{
    width: 100%;
    height: 80px;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    line-height: 80px;
    font-size: 30px;
    margin-top: 20px;
  }
  .statusIcon{
    width: 48px;
    height: 48px;
    .bg-image("~index/assets/mine/status");
    float: left;
    margin-top: 16px;
    margin-left: 24px;
    margin-right: 8px;
  }
  .detailCon{
    width: 100%;
    background: #282A37;
  }
  .detailItem{
    height: 48*2px;
    margin-left: 24px;
    border-bottom: 2px solid #21232F;
    line-height: 48*2px;
    font-size: 28px;
  }
  .label{
    width: 88*2px;
    height: 48*2px;
    float: left;
    opacity: .6;
  }
  .detail{
    width: 263*2px;
    min-height: 48*2px;
    float: left;
  }
  .shopTitle{
    height: 64*2px;
  }
  .shopDetail{
    line-height: 64px;
  }
  .subTitle{
    width: 280px;
    height: 80px;
    line-height: 80px;
    margin-left: 24px;
    opacity: .6;
  }
  .addressItem{
    height: 76*2px;
  }
  .addressLabel{
    height: 76*2px;
    line-height: 76*2px;
  }
  .address{
    height: 76*2px;
    line-height: 40px;
    padding-top: 20px;
    overflow-y: hidden;
  }
  .codeCon{
    width: 100%;
    height: 76*2px;
    background: #282A37;
    margin-top: 16px;
    line-height: 76*2px;
  }
  .codeLabel{
    width: 88*2px;
    opacity: .6;
    font-size: 28px;
    margin-left: 24px;
    float: left;
  }
  .code{
    width: 148*2px;
    font-weight:bold;
    font-size: 60px;
    color: #DDB67F;
    float: left;
  }
  .codeBtn{
    width: 160px;
    height: 48px;
    border-radius: 24px;
    background:linear-gradient(270deg,rgba(237,207,165,1) 0%,rgba(221,182,127,1) 100%);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.2);
    text-align: center;
    line-height: 48px;
    font-size: 28px;
    font-weight:600;
    float: right;
    margin-right: 24px;
    margin-top: 26*2px;
  }
</style>
