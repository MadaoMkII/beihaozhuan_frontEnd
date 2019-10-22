<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>

  export default {
    name: 'App',
    data(){
      return {
        path : '',
        tabs : false
      }
    }
  }
</script>
<style lang="less">
  *{
    margin: 0;
    padding: 0;
    font-size:24px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
  }
  html{
    width: 100%;
    height: 100%;
    background: #313340;
  }
  body{
    height:100%;
    margin:0;
    background: #313340;
  }
  #app{
    width: 100%;
    height: 100%;
    margin:0;
    background: #313340;
  }

</style>
