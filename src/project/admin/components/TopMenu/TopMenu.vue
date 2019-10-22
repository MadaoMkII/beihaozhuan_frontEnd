<template>
  <div class="topMenuCon">
    <div class="centerMenuCon">
      <div class="logo" @click="goHome()"></div>
      <div class="menuCon">
        <div class="menuItem">
          <router-link :to="{name:'Goods'}">
            <div class="tabText">商品</div>
          </router-link>
        </div>
        <div class="menuItem">
          <router-link :to="{name:'User'}">
            <div class="tabText">用户</div>
          </router-link>
        </div>
        <div class="menuItem">
          <router-link :to="{name:'Operate'}">
            <div class="tabText">运营</div>
          </router-link>
        </div>
        <div class="menuItem" v-if="csRole === 'false'">
          <router-link :to="{name:'System'}">
            <div class="tabText">系统</div>
          </router-link>
        </div>
      </div>
      <div class="userInfoCon">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="headImg"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import LOGIN from 'admin/service/login-service.js'
    export default {
      name: "TopMenu",
      data(){
        return {
          csRole:localStorage.getItem('csRole'),
          userName : ''
        }
      },
      created(){
        this.userName = localStorage.getItem('userName');
      },
      methods:{
        goHome() {
          this.$router.push({
            path: '/',
            name:'Home'
          })
        },
        //退出登录
        logout(){
          console.log('点击了退出登录')
          this.$confirm('确定退出登录?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            LOGIN.logout()
              .then(res => {
                console.log('res',res);
                if(res.code === "0"){
                  localStorage.setItem('csRole', false);
                  this.$router.push({
                    path: '/login',
                    name:'Login'
                  })
                }
              })
          }).catch(() => {

          });
        }
      }
    }
</script>

<style lang="css" scoped>
  .topMenuCon{
    width: 100%;
    height: 64px;
    background: #15161D;
    color: #fff;
  }
  .centerMenuCon{
    width: 1152px;
    height: 64px;
    margin: auto;
  }
  .logo{
    width: 64px;
    height: 48px;
    margin-top: 8px;
    float: left;
    background:url(~admin/assets/logo.png) no-repeat;
  }
  .menuCon{
    width: 384px;
    height: 64px;
    margin-left: 56px;
    float: left;
  }
  .menuItem{
    width: 96px;
    height: 64px;
    float: left;
    line-height: 64px;
    text-align: center;
  }
  .tabText{
    color: rgba(255, 255, 255, .65);
  }
  .router-link-active .tabText{
    color: #fff;
  }
  .userInfoCon{
    height: 64px;
    float: right;
  }
  .el-dropdown{
    height: 64px;
    line-height: 64px;
    float: right;
  }
  .headImg{
    width: 24px;
    height: 24px;
    background:url(~admin/assets/head.png) no-repeat;
    margin-top: 20px;
    margin-right: 8px;
    float: right;
  }
  .el-dropdown-link{
    color: rgba(255, 255, 255, .85);
  }




</style>
