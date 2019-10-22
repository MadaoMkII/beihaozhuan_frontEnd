<template>
  <div>
    <div class="topCon">
      <TopMenu></TopMenu>
    </div>
    <div class="breadCon" v-show="!hideBread">
      <BreadCrumb></BreadCrumb>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footerCon">
      ©2019 天津实境科技有限公司出品
    </div>
  </div>
</template>

<script>
  import TopMenu from "admin/components/TopMenu/TopMenu.vue"
  import BreadCrumb from "admin/components/Breadcrumb/index.vue"
  export default {
    name: 'Main',
    data(){
      return {
        hideBread : false
      }
    },
    components: {TopMenu,BreadCrumb},
    methods:{

    },
    created(){
      let routerName = this.$route.name;
      if(routerName === 'Home'){
        this.hideBread = true;
      }else {
        this.hideBread = false;
      }
    },
    watch:{
      '$route'(to,from){
        let routerName = to.name;
        if(routerName === 'Home'){
          this.hideBread = true;
        }else {
          this.hideBread = false;
        }
      }
    }
  }
</script>

<style lang="css">
  .topCon{
    width: 100%;
    height: 64px;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .breadCon{
    width: 100%;
    height: 56px;
    background: #fff;
    margin-top: 64px;
  }
  .footerCon{
    width: 100%;
    height: 64px;
    color: rgba(0, 0, 0, 0.45);
    text-align: center;
    line-height: 64px;
    margin-top: 80px;
  }
</style>
