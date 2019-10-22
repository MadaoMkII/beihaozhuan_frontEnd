<template>
  <div class="indexCon">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group>
        <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path" v-if="item.meta.title">
          <span  v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.meta.title}}</span>
<!--          <router-link  v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>-->
          <span v-else class="normalCrumb">{{item.meta.title}}</span>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    name: "idnex",
    data(){
      return {
        levelList:null
      }
    },
    created() {
      this.getBreadcrumb()
    },
    watch:{
      '$route'(){
        this.getBreadcrumb()
      }
    },
    methods:{
      getBreadcrumb : function(){
        let matched=this.$route.matched.filter(item=>item.name)//$route.matched 将会是一个包含从上到下的所有对象 (副本)。
        const first=matched[0]
        if(first && first.name !=='Home'){//$route.name当前路由名称 ；$route.redirectedFrom重定向来源的路由的名字
          matched=[{ path: '/home', meta: { title: '首页' }}].concat(matched)
        }
        this.levelList=matched
      }
    }
  }
</script>

<style lang="css" scoped>
  .indexCon{
    width: 1152px;
    height: 56px;
    margin:auto;
  }
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 56px;
    margin-left: 10px;
  }
  .normalCrumb{
    color: rgba(0, 0, 0, .45);
  }
  .no-redirect {
    color: rgba(0, 0, 0, .65);
    cursor: text;
  }
</style>
