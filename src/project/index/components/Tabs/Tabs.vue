<template>
  <div class="tabs">
    <ul>
      <!--home被点击后，一直处于激活状态，因此需要使用精确匹配模式，在router-link中添加exact属性-->
      <router-link :to="{name:'Home'}" tag="li" exact>
        <div class="tabIcon normal homeIcon"></div>
        <div class="tabIcon active homeIconActive"></div>
        <div class="tabText">首页</div>
      </router-link>
      <router-link :to="{name:'Task'}" tag="li">
        <div class="tabIcon normal taskIcon"></div>
        <div class="tabIcon active taskIconActive"></div>
        <div class="tabText">任务</div>
      </router-link>
      <!-- <router-link :to="{name:'Game'}" tag="li">
        <div class="tabIcon normal gameIcon"></div>
        <div class="tabIcon active gameIconActive"></div>
        <div class="tabText">游戏</div>
      </router-link> -->
      <router-link :to="{name:'Shop'}" tag="li">
        <div class="tabIcon normal shopIcon"></div>
        <div class="tabIcon active shopIconActive"></div>
        <div class="tabText">商城</div>
      </router-link>
      <router-link :to="{name:'Mine'}" tag="li">
        <div class="tabIcon normal mineIcon"></div>
        <div class="tabIcon active mineIconActive"></div>
        <div class="tabText">我的</div>
      </router-link>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {

  }
</script>
<style lang="less" type="text/less" scoped>
  .tabs {
    background: #15161D;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    height: 49*2px;
    & > ul, & > ul > li {
      margin: 0;
      padding: 0;
      height: 49*2px;
    }
    ul {
      display: table;
      width: 100%;
      & > li {
        text-align: center;
        font-size: 20px;
        display: table-cell;
        /*padding: 8px 12px;*/
        cursor: pointer;
        &.router-link-active{
          color: #DDB67F;
        }
      }
    }
  }
  .tabIcon{
    width: 48px;
    height: 48px;
    margin: auto;
    margin-top: 16px;
  }
  .tabText{
    width: 28*2px;
    height: 24px;
    margin: auto;
    color:#889195;
    text-align: center;
    line-height: 24px;
    padding-top: 2px;
  }
  .homeIcon{
    .bg-image("~index/assets/home/home");
  }
  .taskIcon{
    .bg-image("~index/assets/home/taskNormal");
  }
  .shopIcon{
    .bg-image("~index/assets/home/shopNormal");
  }
  .mineIcon{
    .bg-image("~index/assets/home/mineNormal");
  }
  .gameIcon{
    .bg-image("~index/assets/home/gameNormal");
  }
  .active{
    display: none;
  }
  .router-link-active .tabText{
    color: #DDB67F;
  }
  .router-link-active .active{
    display: block;
  }
  .router-link-active .normal{
    display: none;
  }
  .homeIconActive{
    .bg-image("~index/assets/home/homeCheck");
  }
  .taskIconActive{
    .bg-image("~index/assets/home/taskActive");
  }
  .shopIconActive{
    .bg-image("~index/assets/home/shopActive");
  }
  .mineIconActive{
    .bg-image("~index/assets/home/mineActive");
  }
  .gameIconActive{
    .bg-image("~index/assets/home/gameActive");
  }


</style>
