<template>
  <div class="safeCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">账户安全</div>
    <div class="infoCon">
      <div class="infoItem" @click="goPage()">
        <div class="infoTitle">修改密码</div>
        <div class="rightIcon"></div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Safe",
      methods:{
        //跳转到修改密码页面
        goPage(){
          this.$router.push({
            name:'LoginInfo',
            query: {
              type: 'updatePw'
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  .safeCon{
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
</style>
