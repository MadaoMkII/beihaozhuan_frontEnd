<template>
  <div>
    <div class="subTabCon thirdTabCon">
      <div class="subTab thirdTab">
        <div class="subTabItem thirdTabItem">
          <router-link :to="{name:'UpTask'}">
            <div class="subTabText thirdTabText">进阶任务</div>
            <div class="subTabItemBorder thirdTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem thirdTabItem">
          <router-link :to="{name:'DailyTask'}">
            <div class="subTabText thirdTabText">日常任务</div>
            <div class="subTabItemBorder thirdTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem thirdTabItem adSeatItem">
          <router-link :to="{name:'NewTask'}">
            <div class="subTabText thirdTabText">新手任务</div>
            <div class="subTabItemBorder thirdTabItemBorder"></div>
          </router-link>
        </div>
      </div>
    </div>

    <router-view></router-view>






  </div>
</template>

<script>
  export default {
    name: "TaskMg"
  }
</script>

<style lang="css" scoped>
  .adSeatItem{
    width: 96px;
  }
</style>
