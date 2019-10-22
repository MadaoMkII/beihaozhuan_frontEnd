<template>
  <div>
    <div class="subTabCon" v-if="!showFormPage">
      <div class="subTab">
        <div class="subTabItem">
          <router-link :to="{name:'Administrators'}">
            <div class="subTabText">管理员</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem">
          <router-link :to="{name:'SystemSet'}">
            <div class="subTabText">系统设置</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem" v-if="AdminRole === 'true'">
          <router-link :to="{name:'SystemLog'}">
            <div class="subTabText">系统日志</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
<!--        <div class="subTabItem">-->
<!--          <router-link :to="{name:'SSPSet'}">-->
<!--            <div class="subTabText">SSP配置</div>-->
<!--            <div class="subTabItemBorder"></div>-->
<!--          </router-link>-->
<!--        </div>-->
      </div>
    </div>
    <div class="centerCon" v-if="!showFormPage">
      <router-view></router-view>
    </div>
    <div class="centerCon" v-else-if="showFormPage">
      <AddAdministrators></AddAdministrators>
    </div>
  </div>
</template>

<script>
  import AddAdministrators from 'admin/pages/System/AddAdministrators.vue'
  export default {
    name: "System",
    data(){
      return {
        showFormPage : false,
        routerName : '',
        AdminRole: localStorage.getItem('AdminRole'),
      }
    },
    components:{
      AddAdministrators
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getSonFlag(data){
        this.showFormPage = data
        console.log('子组件传进来的值',data)
      }
    },
    created() {
      let showFormPage =this.$route.meta.showFormPage;
      this.routerName = this.$route.name;
      console.log('showFormPage',showFormPage)
      if(showFormPage){
        this.showFormPage = showFormPage;
      }else {
        this.showFormPage = false;
      }
    },
    watch:{
      '$route'(){
        let showFormPage =this.$route.meta.showFormPage;
        console.log('showFormPage',showFormPage)
        this.routerName = this.$route.name;
        if(showFormPage){
          this.showFormPage = showFormPage;
        }else {
          this.showFormPage = false;
        }
      }
    }

  }
</script>

<style lang="css" scoped>

</style>
