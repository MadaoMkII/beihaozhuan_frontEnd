<template>
  <div>
    <div class="subTabCon" v-if="!showFormPage">
      <div class="subTab">
        <div class="subTabItem">
          <router-link :to="{name:'GoodsMg'}">
            <div class="subTabText">商品管理</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
        <div class="subTabItem">
          <router-link :to="{name:'OrderMg'}">
            <div class="subTabText">订单管理</div>
            <div class="subTabItemBorder"></div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="centerCon" v-if="!showFormPage">
      <router-view></router-view>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'AddGoods'">
      <AddGoods @formPage="getSonFlag"></AddGoods>
    </div>
    <div class="centerCon" v-else-if="showFormPage && routerName === 'OrderDetail'">
      <OrderDetail @formPage="getSonFlag"></OrderDetail>
    </div>
  </div>
</template>

<script>
    import AddGoods from 'admin/pages/Goods/AddGoods.vue'
    import OrderDetail from 'admin/pages/Goods/OrderDetail.vue'
    export default {
      name: "Goods",
      data(){
        return {
          showFormPage : false,
          routerName : ''
        }
      },
      components:{
        AddGoods,OrderDetail
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
