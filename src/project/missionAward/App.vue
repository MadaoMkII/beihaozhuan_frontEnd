<template>
  <div id="app">
      <router-view></router-view>
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
<style lang="css">
  *{
    margin: 0;
    padding: 0;
    /*font-size:24px;*/
    font-family:PingFangSC-Regular;
    font-weight:400;
    /*color:rgba(255,255,255,1);*/
  }
  html{
    width: 100%;
    height: 100%;
    background: #fff;
  }
  body{
    height:100%;
    margin:0;
    background: #fff;
  }
  #app{
    width: 100%;
    height: 100%;
    margin:0;
    background: #fff;
  }

</style>
