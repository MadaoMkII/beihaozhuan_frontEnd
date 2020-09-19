<template>
  <div>
    <div class="subTabCon" v-if="!showFormPage">
      <div class="subTab">
        <div class="subTabItem">
          <router-link :to="{name:'AdMg'}">
            <div class="subTabText">广告管理</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem">
          <router-link :to="{name:'TaskMg'}">
            <div class="subTabText">任务管理</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem">
          <router-link :to="{name:'ActivityMg'}">
            <div class="subTabText">活动管理</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem">
          <router-link :to="{name:'Cashback'}">
            <div class="subTabText">还款减负活动管理</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
      </div>
    </div>

    <div :class="{ 'centerCon': noContainerStyles === undefined }" v-if="!showFormPage">
      <router-view></router-view>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'AddType'">
      <AddType></AddType>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'AddSeat'">
      <AddSeat></AddSeat>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'CountDetail'">
      <CountDetail></CountDetail>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'Online'">
      <Online></Online>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'Already'">
      <Already></Already>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'InviteRegister'">
      <InviteRegister></InviteRegister>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'SignIn'">
      <SignIn></SignIn>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'AlreadyDaily'">
      <AlreadyDaily></AlreadyDaily>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'Income'">
      <Income></Income>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'Course'">
      <Course></Course>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'InviteDaily'">
      <InviteDaily></InviteDaily>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'AlreadyNew'">
      <AlreadyNew></AlreadyNew>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'Cash'">
      <Cash></Cash>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'InfoSet'">
      <InfoSet></InfoSet>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'OnlineTime'">
      <OnlineTime></OnlineTime>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'Watch'">
      <Watch></Watch>
    </div>

  </div>
</template>

<script>
  import AddPoster from 'admin/pages/Operate/AddPoster.vue'
  import AddType from 'admin/pages/Operate/AddType.vue'
  import AddSeat from 'admin/pages/Operate/AddSeat.vue'
  import CountDetail from 'admin/pages/Operate/CountDetail.vue'
  import Online from 'admin/pages/Operate/TaskMg/UpTask/Online.vue'
  import Already from 'admin/pages/Operate/TaskMg/UpTask/Already.vue'
  import InviteRegister from 'admin/pages/Operate/TaskMg/UpTask/InviteRegister.vue'
  import SignIn from 'admin/pages/Operate/TaskMg/DailyTask/SignIn.vue'
  import AlreadyDaily from 'admin/pages/Operate/TaskMg/DailyTask/AlreadyDaily.vue'
  import Income from 'admin/pages/Operate/TaskMg/DailyTask/Income.vue'
  import InviteDaily from 'admin/pages/Operate/TaskMg/DailyTask/InviteDaily.vue'
  import AlreadyNew from 'admin/pages/Operate/TaskMg/NewTask/AlreadyNew.vue'
  import Cash from 'admin/pages/Operate/TaskMg/NewTask/Cash.vue'
  import InfoSet from 'admin/pages/Operate/TaskMg/NewTask/InfoSet.vue'
  import OnlineTime from 'admin/pages/Operate/TaskMg/NewTask/OnlineTime.vue'
  import Watch from 'admin/pages/Operate/TaskMg/NewTask/Watch.vue'
  import Course from 'admin/pages/Operate/TaskMg/NewTask/Course.vue'
    export default {
      name: "Operate",
      components: {
        AddPoster,AddType,AddSeat,CountDetail,Online,Already,InviteRegister,SignIn,AlreadyDaily,Income,InviteDaily,AlreadyNew,InfoSet,OnlineTime,Cash,Watch,Course
      },
      data(){
        return {
          noContainerStyles: false,
          showFormPage : false,
          routerName : ''
        }
      },
      created() {
        let showFormPage =this.$route.meta.showFormPage;
        this.noContainerStyles = this.$route.meta.noContainerStyles;
        this.routerName = this.$route.name;
        if(showFormPage){
          this.showFormPage = showFormPage;
        }else {
          this.showFormPage = false;
        }
      },
      watch:{
        '$route'(){
          let showFormPage =this.$route.meta.showFormPage;
          this.noContainerStyles = this.$route.meta.noContainerStyles;
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

<style scoped>
.subTabItem {
  width: auto;
  padding: 0 16px;
  margin-right: 0;
}
</style>
