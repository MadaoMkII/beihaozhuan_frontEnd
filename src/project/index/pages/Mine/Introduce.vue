<template>
  <div class="introduceCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">公司介绍</div>
    <div class="infoCon">
      <div class="infoItem" @click="goPage('one')">
        <div class="infoTitle">企业简介</div>
        <div class="rightIcon"></div>
      </div>
      <div class="infoItem" @click="goPage('two')">
        <div class="infoTitle">账户注册协议</div>
        <div class="rightIcon"></div>
      </div>
      <div class="infoItem" @click="goPage('three')">
        <div class="infoTitle">知识产权说明</div>
        <div class="rightIcon"></div>
      </div>
      <div class="infoItem" @click="goPage('four')">
        <div class="infoTitle">法律责任</div>
        <div class="rightIcon"></div>
      </div>
      <div class="infoItem" @click="goPage('six')">
        <div class="infoTitle">商务合作</div>
        <div class="rightIcon"></div>
      </div>
<!--      <div class="infoItem">-->
<!--        <div class="infoTitle">客服电话</div>-->
<!--        <div class="text">{{phone}}</div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
  import SYSTEM from 'admin/service/system-service.js'
    export default {
      name: "Introduce",
      data(){
        return{
          phone:''
        }
      },
      created(){
        this.getPhone();
      },
      methods:{
        //获取客服电话
        getPhone(){
          SYSTEM.getSetting()
            .then(res => {
              console.log('res', res);
              if (res.code === "0") {
                this.phone = res.data.serviceNumber;
              }
            });
        },
        goPage(type){
          this.$router.push({
            path: '/infos',
            name:'Infos',
            query:{
              type:type,
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  .introduceCon{
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
  .infoCon{
    width: 100%;
    background: #282A37;
    margin-top: 20px;
  }
  .infoItem{
    height: 48*2px;
    margin-left: 24px;
    border-bottom: 2px solid #21232F;
  }
  .infoTitle{
    width: 128*2px;
    height: 48*2px;
    font-size: 28px;
    line-height: 56*2px;
    float: left;
  }
  .rightIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/right");
    float: right;
    margin-top: 18*2px;
    margin-right: 24px;
  }
  .text{
    height: 48*2px;
    line-height: 48*2px;
    margin-right: 24px;
    opacity: .6;
    font-size: 13*2px;
    text-align: right;
  }



</style>
