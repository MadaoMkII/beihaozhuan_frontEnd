<template>
    <div>
      <div class="subTabCon thirdTabCon" v-if="!showThirdPage">
        <div class="subTab thirdTab" >
          <div class="subTabItem thirdTabItem" >
            <router-link :to="{name:'AdSet'}">
              <div class="subTabText thirdTabText">广告列表</div>
              <div class="subTabItemBorder thirdTabItemBorder"></div>
            </router-link>
          </div>
<!--          <div class="subTabItem thirdTabItem">-->
<!--            <router-link :to="{name:'AdType'}">-->
<!--              <div class="subTabText thirdTabText">广告类型</div>-->
<!--              <div class="subTabItemBorder thirdTabItemBorder"></div>-->
<!--            </router-link>-->
<!--          </div>-->
<!--          <div class="subTabItem thirdTabItem adSeatItem">-->
<!--            <router-link :to="{name:'AdSeat'}">-->
<!--              <div class="subTabText thirdTabText">广告位配置</div>-->
<!--              <div class="subTabItemBorder thirdTabItemBorder"></div>-->
<!--            </router-link>-->
<!--          </div>-->
          <div class="subTabItem thirdTabItem">
            <router-link :to="{name:'AdCount'}">
              <div class="subTabText thirdTabText">广告统计</div>
              <div class="subTabItemBorder thirdTabItemBorder"></div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="centerCon" v-if="routerName === 'AdSet'">
        <AdSet></AdSet>
      </div>
      <div class="centerCon" v-else-if="routerName === 'AdCount'">
        <AdCount></AdCount>
      </div>
      <div class="centerCon" v-else-if="showThirdPage && routerName === 'AddPoster'">
        <AddPoster></AddPoster>
      </div>
    </div>
</template>

<script>
  import AdSet from 'admin/pages/Operate/AdMg/AdSet.vue'
  import AdCount from 'admin/pages/Operate/AdMg/AdCount.vue'
  import AddPoster from 'admin/pages/Operate/AddPoster.vue'
    export default {
      name: "AdMg",
      components:{
        AdSet,AdCount,AddPoster
      },
      data(){
        return{
          routerName:'',
          showThirdPage:''
        }
      },
      created() {
        let showThirdPage =this.$route.meta.showThirdPage;
        this.routerName = this.$route.name;
        if(showThirdPage){
          this.showThirdPage = showThirdPage;
        }else {
          this.showThirdPage = false;
        }
      },
      watch:{
        '$route'(){
          let showThirdPage =this.$route.meta.showThirdPage;
          this.routerName = this.$route.name;
          if(showThirdPage){
            this.showThirdPage = showThirdPage;
          }else {
            this.showThirdPage = false;
          }
        }
      }
    }
</script>

<style lang="css" scoped>
  .adSeatItem{
    width: 96px;
  }
</style>
