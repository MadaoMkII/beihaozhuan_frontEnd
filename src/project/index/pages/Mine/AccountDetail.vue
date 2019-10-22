<template>
  <div class="accountDetailCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="bg"></div>
    <div class="select" @click="select()">
      <div class="selectText">{{selectName}}</div>
      <div class="downIcon"></div>
    </div>
    <!--    下拉框内容-->
    <!--    遮罩-->
    <div class="mask" v-show='showSelect' @click="hideSelect()"></div>
    <div class="selectList" v-show='showSelect'>
      <div class="upIcon"></div>
      <div class="selectItem">
        <div class="text" v-for="(item,index) in selectList" :key="index" @click="getSelectVal(item.name,item.value)">{{item.name}}</div>
      </div>
    </div>
    <div class="accountList">
      <div class="accountItem" v-for="item in setBalanceList">
        <div class="iconImg" :style="{backgroundImage:'url('+item.url+')'}"></div>
        <div class="detailCon">
          <div class="accountTitle">{{item.category}}</div>
        </div>
        <div class="coinCon">
          <div class="coinCount" v-if="item.income === '消费'">-{{item.amount}}金币</div>
          <div class="coinCount" v-else>+{{item.amount}}金币</div>
          <div class="coin"></div>
          <div class="time">{{item.createTime}}</div>
        </div>
      </div>
    </div>
    <div class="footerTips">已经到底了</div>
<!--    <infinite-loading @infinite="getUserBalance">-->
<!--      <span slot="no-results" style="padding-bottom:50px;">没有更多了～</span>-->
<!--      <span slot="no-more">没有更多了～</span>-->
<!--    </infinite-loading>-->
    
  </div>
</template>

<script>
  import InfiniteLoading from "vue-infinite-loading"
  import ORDER from 'index/service/order-service.js'
    export default {
      name: "AccountDetail",
      data(){
        return {
          showSelect :false,
          selectName : '最近7天',
          selectList : [
            {
              name : '全部',
              value : 'full'
            },
            {
              name : '最近7天',
              value : 'week'
            },
            {
              name : '最近30天',
              value : 'month'
            },
          ],
          imgUrlList:[
            {
              type:'注册奖励',
              url:require('../../assets/mine/account/1.png')
            },
            {
              type:'邀请奖励',
              url:require('../../assets/mine/account/2.png')
            },
            {
              type:'购买商品',
              url:require('../../assets/mine/account/3.png')
            },
            {
              type:'提现',
              url:require('../../assets/mine/account/4.png')
            },
            {
              type:'广告收入',
              url:require('../../assets/mine/account/5.png')
            },
            {
              type:'完成任务',
              url:require('../../assets/mine/account/6.png')
            }
            // {
            //   type:'每日任务',
            //   url:require('../../assets/mine/account/7.png')
            // },
            // {
            //   type:'进阶任务',
            //   url:require('../../assets/mine/account/8.png')
            // },
          ],
          page: 1,
          size: 5,
          setBalanceList:[],
          period:'week'
        }
      },
      components: {
        InfiniteLoading
      },
      created(){
        this.getUserBalance();
      },
      methods: {
        //获取点击的下拉框value
        getSelectVal : function(name,value) {
          // console.log('获取到的value', value);
          this.selectName = name;
          this.period = value;
          this.getUserBalance();
          this.hideSelect();
        },
        //下拉显示
        select : function() {
          this.showSelect = true;
        },
        //下拉隐藏
        hideSelect : function () {
          this.showSelect = false;
        },
        //获取账户明细
        getUserBalance(){
          let data = {
            'unit': 1000,
            'page':this.page,
            "period":this.period
          };
          ORDER.getUserBalance(data)
            .then(res => {
              // console.log('res',res);
              if (res.code == 0) {
                let balanceList = res.data;
                let imgUrlList = this.imgUrlList;
                this.setBalanceList = balanceList;
                let setBalanceList = this.setBalanceList;
                for(let i=0;i<balanceList.length;i++){
                  let category = balanceList[i].category.substring(0, 4);
                  let createTime = setBalanceList[i].createTime;
                  setBalanceList[i].createTime = this.getLocalTime(createTime);
                  for (let j=0;j<imgUrlList.length;j++){
                    if(category === imgUrlList[j].type){
                      setBalanceList[i].url = imgUrlList[j].url;
                      break
                    }
                  }
                }
              }
            });
        },
        //格式化时间
        getLocalTime(date) {
          const moment = require(`moment`);
          require(`moment-timezone`);
          return moment.tz(date, "Asia/ShangHai").format(`YYYY/MM/DD HH:mm:ss`);
        },


      }
    }
</script>

<style lang="less" scoped>
  .accountDetailCon{
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
  .bg{
    width: 100%;
    height: 160*2px;
    .bg-image("~index/assets/mine/account/bg");
    background-position: 0px -36px;
  }
  .select{
    width: 108*2px;
    height: 28*2px;
    margin-top: 32px;
    margin-left: 255*2px;
    margin-bottom: 32px;
    border-radius: 28px;
    border: 2px solid #DDB67F;
    font-size: 28px;
    line-height: 28*2px;
  }
  .selectText{
    width: 72*2px;
    margin-left: 16px;
    float: left;
    color: #DDB67F;
    text-align: center;
  }
  .downIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/mine/account/down");
    float: left;
    margin-left: 8px;
    margin-top: 16px;
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
  .selectList{
    width: 108*2px;
    height: 480px;
    background: #313340;
    position: absolute;
    right: 24px;
    top: 215*2px;
    z-index: 999;
  }
  .upIcon{
    width: 24px;
    height: 8px;
    .bg-image("~index/assets/mine/account/upIcon");
    position: absolute;
    right: 24px;
    top: -8px;
  }
  .selectItem{
    width: 100%;
    height: 80px;
    border-bottom: 2px solid #21232F;
  }
  .selectItem .text{
    width: 68*2px;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    text-align: center;
    color: #DDB67F;
    margin-left: 24px;
  }
  .accountList{
    width: 100%;
    background: #282A37;
  }
  .accountItem{
    width: 363*2px;
    height: 71*2px;
    margin-left: 24px;
    border-bottom: 2px solid #21232F;
  }
  .iconImg{
    width: 48*2px;
    height: 48*2px;
    margin-top: 24px;
    float: left;
    .bg-image("~index/assets/mine/account/up");
  }
  .detailCon{
    width: 168*2px;
    height: 48*2px;
    margin-top:24px;
    margin-left: 16px;
    float: left;
  }
  .coinCon{
    height: 48px;
    float: right;
    margin-right: 24px;
    margin-top: 24px;
  }
  .accountTitle{
    height: 48px;
    line-height: 48px;
    font-size: 30px;
  }
  .time{
    height: 40px;
    line-height: 40px;
    opacity: .6;
  }
  .coin{
    width: 40px;
    height: 40px;
    .bg-image("~index/assets/mine/coin");
    margin-top: 4px;
    float: right;
  }
  .coinCount{
    height: 48px;
    line-height: 48px;
    font-size: 28px;
    float: right;
    color: rgba(255, 255, 255, 0.8);
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
