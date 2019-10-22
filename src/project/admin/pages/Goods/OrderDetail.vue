<template>
    <div>
      <div class="centerTitle">
        订单详情
      </div>
      <div class="orderInfoCon">
        <div class="infoTitle">订单信息</div>
        <div class="infoCon">
          <div class="infoItem">
            <div class="itemLabel">订单编号：</div>
            <div class="itemText">{{data.orderUUid}}</div>
          </div>
          <div class="infoItem">
            <div class="itemLabel">订单状态：</div>
            <div class="itemText">{{status}}</div>
          </div>
          <div class="infoItem">
            <div class="itemLabel">订单日期：</div>
            <div class="itemText">{{data.created_at}}</div>
          </div>
          <div class="infoItem">
            <div class="itemLabel">商品名称：</div>
            <div class="itemText">{{data.title}}</div>
          </div>
          <div class="infoItem">
            <div class="itemLabel">商品价格：</div>
            <div class="itemText">{{data.goodPrice}}金币</div>
          </div>
        </div>
      </div>

      <div class="submitInfoCon">
        <div class="infoTitle">提交信息</div>
        <div class="infoCon">
          <div class="infoItem">
            <div class="itemLabel">投保人：</div>
            <div class="itemText">{{data.realName}}</div>
          </div>
          <div class="infoItem">
            <div class="itemLabel">身份证号：</div>
            <div class="itemText">{{data.IDNumber}}</div>
          </div>
          <div class="infoItem">
            <div class="itemLabel">地址：</div>
            <div class="itemText">{{data.detailAddress}}</div>
          </div>
        </div>
      </div>
      <div class="backCon">
        <el-button class="CoResetBtn" @click="goPrePage()">返回上一页</el-button>
      </div>




    </div>
</template>

<script>
  import ORDER from 'admin/service/order-service.js'
    export default {
      name: "OrderDetail",
      data(){
        return{
          data :{},
          status:''
        }
      },
      created(){
        let orderUUid = this.$route.query.orderUUid;
        this.getOrderDetail(orderUUid);
      },
      methods: {
        //加载列表数据
        getOrderDetail(orderUUid) {
          let data = {
            'orderUUid':orderUUid,
            'page': 1,
            'unit': 1
          };
          ORDER.getOrderList(data)
            .then(res => {
              console.log('res', res);
              if (res.code === "0") {
                this.data = res.data[0];
                let orderStatus = res.data[0].orderStatus
                if(orderStatus === 'Close'){
                  this.status = '已关闭'
                }else if(orderStatus === 'Pending'){
                  this.status = '进行中'
                }else if(orderStatus === 'Complete'){
                  this.status = '已完成'
                }
              }
            })
        },
      }
    }
</script>

<style lang="css" scoped>
  .orderInfoCon{
    width: 1088px;
    margin: auto;
    border-bottom: 1px solid #E8E8E8;
    padding-bottom: 23px;
  }
  .infoTitle{
    height: 24px;
    line-height: 24px;
    margin-top: 32px;
    opacity: .85;
    font-size: 16px;
    font-weight:600;
    margin-bottom: 16px;
  }
  .infoItem{
    width: 272px;
    height: 32px;
    margin-bottom: 8px;
    float: left;
    line-height: 32px;
  }
  .infoCon{
    overflow: hidden;
  }
  .itemLabel{
    width: 72px;
    float: left;
    max-width: 72px;
    color: rgba(0, 0, 0, .85);
  }
  .itemText{
    width: 200px;
    float: left;
    color: rgba(0, 0, 0, .65);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    word-break:keep-all;
  }
  .submitInfoCon{
    width: 1088px;
    margin: auto;
  }
  .backCon{
    width: 102px;
    height: 32px;
    margin: auto;
    margin-top: 48px;
  }
</style>
