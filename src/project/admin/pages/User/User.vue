<template>
  <div>
    <div v-if="showUserInfo">
      <UserInfo></UserInfo>
    </div>
    <div class="subTabCon" v-if="!showUserInfo">
      <div class="subTab">
        <div class="subTabItem">
          <router-link :to="{name:'UserMg'}">
            <div class="subTabText">用户管理</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="centerCon" v-if="!showUserInfo">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import UserMg from 'admin/pages/User/UserMg.vue'
  import UserInfo from 'admin/pages/User/UserInfo.vue'
    export default {
      name: "User",
      data(){
        return {
          showUserInfo : false,
          showThirdTab : false
        }
      },
      components: {
        UserMg,UserInfo
      },
      mounted() {
        // this.$router.push({
        //   name:'UserMg',
        // })
      },
      created() {
        let showUserInfo =this.$route.meta.showUserInfo;
        let showThirdTab =this.$route.meta.showThirdTab;
        if(showUserInfo && showThirdTab){
          this.showUserInfo = showUserInfo;
          this.showThirdTab = showThirdTab;
        }else {
          this.showUserInfo = false;
          this.showThirdTab = false;
        }
        // console.log('showUserInfo',showUserInfo)
        // console.log('showThirdTab',showThirdTab)
      },
      watch:{
        '$route'(){
          let showUserInfo =this.$route.meta.showUserInfo;
          if(showUserInfo){
            this.showUserInfo = showUserInfo;
          }else {
            this.showUserInfo = false;
          }
        }
      },
    }
</script>

<style scoped>

</style>
