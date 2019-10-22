<template>
  <div class="orderCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">我的订单</div>
    <div class="orderlist">
      <div class="orderItem" v-for="item in orderList" :key="item.index" @click="goOrderDetail(item.orderUUid)">
          <div class="topCon">
            <div class="time">{{item.created_at}}</div>
            <div class="status" v-if="item.orderStatus === 'Close'">已关闭</div>
            <div class="status" v-else-if="item.orderStatus === 'Pending'">进行中</div>
            <div class="status" v-else-if="item.orderStatus === 'Complete'">已完成</div>
          </div>
          <div class="imgCon">
            <img class="imgConIn" :src="item.mainlyShowPicUrl" alt="">
          </div>
          <div class="detailCon">
            <div class="orderTitle">{{item.title}}</div>
            <div class="coin">{{item.goodPrice}}金币</div>
          </div>
      </div>
      <div class="footerTips" v-show="nodata">暂无数据</div>
    </div>
  </div>
</template>

<script>
  import ORDER from 'index/service/order-service.js'
    export default {
      name: "Order",
      data(){
        return{
          orderList:[],
          nodata:false
        }
      },
      created(){
        this.getOrderList();  //获取订单列表
      },
      methods:{
        getOrderList(){
          let data = {
            'unit': 100,
            'page':1
          };
          ORDER.getUserBalanceList(data)
            .then(res => {
              // console.log('res',res);
              if(res.code === "0"){
                if(res.data.length === 0){
                  this.nodata = true;
                }
                this.orderList = res.data;
              }
            })
        },
        //跳转到订单详情页面
        goOrderDetail(orderUUid){
          // console.log('传之前的uuid',orderUUid)
          this.$router.push({
            path: '/orderDetail',
            name:'OrderDetail',
            query:{
              orderUUid : orderUUid
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  .orderCon{
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
  .orderlist{
    width: 351*2px;
    margin: auto;
    margin-top: 36px;
  }
  .orderItem{
    width: 100%;
    height: 116*2px;
    background: #282A37;
    border-radius: 16px;
    margin-bottom: 16px;
  }
  .topCon{
    width: 100%;
    height: 36*2px;
    line-height: 36*2px;
    overflow: hidden;
  }
  .time{
    width: 168*2px;
    opacity: .6;
    float: left;
    margin-left: 24px;
    text-align: left;
    margin-top: 0;
  }
  .status{
    width: 131*2px;
    float: right;
    text-align: right;
    margin-right: 24px;
  }
  .imgCon{
    width: 101*2px;
    height: 56*2px;
    float: left;
    margin-left: 24px;
    margin-top: 16px;
    background: #ccc;
  }
  .detailCon{
    width: 219*2px;
    height: 56*2px;
    margin-left: 14px;
    float: left;
    margin-top: 16px;
  }
  .orderTitle{
    width: 100%;
    height: 48px;
    line-height: 48px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 28px;
  }
  .coin{
    height: 48px;
    line-height: 48px;
    margin-top: 16px;
    text-align: right;
    color: #DDB67F;
    font-weight:bold;
    font-size: 28px;
  }
  .imgConIn{
    width: 100%;
    height: 100%;
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
