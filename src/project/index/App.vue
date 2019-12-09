<template>
  <div id="app">
    <div v-if="tabs">
      <Tabs></Tabs>
    </div>
    <div class="globalCon">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>
<script>
  import Tabs from "./components/Tabs/Tabs.vue"
  export default {
    name: 'App',
    data(){
      return {
        path : '',
        tabs : false
      }
    },
    components: {Tabs},
    // 判断路由
    mounted() {
      let path = this.$route.path;
      if(path === "/" || path === "/task" || path === "/shop" || path === "/mine" || path === '/game') {
        this.tabs = true;
      } else {
        this.tabs = false;
      }
    },
    watch: {
      '$route'(to, from) {
        let path = this.$route.path;
        if(path === "/" || path === "/task" || path === "/shop" || path === "/mine" || path === '/game') {
          this.tabs = true;
        } else {
          this.tabs = false;
        }
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
  .globalCon{
    width: 100%;
    height: 100%;
    margin:0;
    overflow-x: hidden;
    overflow-y: hidden;
  }

</style>
