<template>
  <div class="teamCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="bg">
      <div class="teamCount">{{total}}</div>
    </div>
    <div class="teambar">
      <div class="teambar__coin">累计收益：{{ totalCoin }} 金币</div>
    </div>
<!--    <div class="select" @click="select()">-->
<!--      <div class="selectText">{{selectName}}</div>-->
<!--      <div class="downIcon"></div>-->
<!--    </div>-->
<!--    下拉框内容-->
<!--    遮罩-->
<!--    <div class="mask" v-show='showSelect' @click="hideSelect()"></div>-->
<!--    <div class="selectList" v-show='showSelect'>-->
<!--      <div class="upIcon"></div>-->
<!--      <div class="selectItem">-->
<!--        <div class="text" v-for="(item,index) in selectList" :key="index" @click="getSelectVal(item.name,item.value)">{{item.name}}</div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="teamList">
      <div class="teamItem" v-for="item in teamList" :key="item.index">
        <div class="headImg">
          <img class="imgCon" v-bind:src="item.avatar">
        </div>
        <div class="nickName">{{item.nickName}}</div>
        <div class="amount">
          金币收入：{{item.amount}}
          <div class="time">
            {{item.created_at}}
          </div>
        </div>
      </div>
    </div>
    <div class="footerTips">已经到底了</div>

  </div>
</template>

<script>
  import MineInfo from 'index/service/mine-service.js'
    export default {
      name: "Team",
      data(){
        return {
          totalCoin: 0,
          showSelect :false,
          selectName : '全部',
          teamList:[],
          total:'',
          selectList : [
            {
              name : '全部',
              value : 1
            },
            {
              name : '今日',
              value : 2
            },
            {
              name : '昨日',
              value : 3
            },
            {
              name : '最近7天',
              value : 4
            },
            {
              name : '最近14天',
              value : 5
            },
            {
              name : '最近30天',
              value : 6
            },
          ]
        }
      },
      created(){
        this.getMyTeam();
      },
      methods: {
        //获取点击的下拉框value
        getSelectVal : function(name,value) {
          console.log('获取到的value', value);
          this.selectName = name;
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
        //获取我的团队
        getMyTeam(){
          let data = {
            'page':1,
            'unit':100
          }
          MineInfo.getMyTeam(data)
            .then(res => {
              console.log('res',res);
              if(res.code === '0'){
                this.teamList = res.data;
                this.total = res.data.length;
                this.totalCoin = res.totalAmount;
              }
            });
        }
      }
    }
</script>

<style lang="less" scoped >
.amount {
  float: right;
  margin-right: 24px;
  opacity: .6;
  text-align: right;
  color: #DDB67F;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
}
.teambar {
  height: 120px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  &__coin {
    font-size: 32px;
    font-weight: 400;
    color: #DDB67F;
    line-height: 40px;
  }
}
  .teamCon{
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
    .bg-image("~index/assets/mine/team/bg");
    background-position: 0px -36px;
  }
  .teamCount{
    width: 180*2px;
    height: 160px;
    line-height: 160px;
    margin: auto;
    padding-top: 60px;
    font-size: 120px;
    font-weight:bold;
    text-align: center;
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
    position: relative;
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

  .teamList{
    width: 100%;
    background: #282A37;
  }
  .teamItem{
    height: 120px;
    margin-left: 24px;
    border-bottom: 2px solid #21232F;
    //display: flex;
    //justify-content: space-between;
    //position: relative;
  }
  .headImg{
    width: 36*2px;
    height: 36*2px;
    .bg-image("~index/assets/mine/team/head");
    float: left;
    margin-top: 24px;
  }
  .nickName{
    width: 172px;
    height: 36*2px;
    line-height: 36*2px;
    font-size: 28px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
    margin-left: 16px;
    margin-top: 24px;
  }
  .time{
    opacity: .6;
    text-align: right;
    line-height: 1;
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
  .imgCon{
    width: 100%;
    height: 100%;
  }

</style>
