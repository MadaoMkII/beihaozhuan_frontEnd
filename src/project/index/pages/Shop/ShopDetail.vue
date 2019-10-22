<template>
  <div class="shopDetailCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">商品详情</div>
    <div class="swiperCon">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide  v-for="item in slideShowPicUrlArray" :key="item.index"><img class="imgCon" v-bind:src="item"></swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="shopDetail">
      <div class="shopTitle">{{goodsList.title}}</div>
      <div class="coinCount">
        <div class="coin">{{goodsList.price}}金币</div>
        <div class="stock">库存{{goodsList.inventory}}</div>
      </div>
    </div>
    <div class="detailImg">
      <div class="imgs" v-for="item in slideShowPicUrlArray">
        <img class="imgCon" v-bind:src="item">
      </div>

    </div>
    <div class="footerCon">
<!--      <div class="customerService">-->
<!--        <div class="customerIcon"></div>-->
<!--        <div class="customerText">联系客服</div>-->
<!--      </div>-->
      <div class="insureBtn" @click="goMakeOrder()">我要投保</div>
    </div>


  </div>
</template>

<script>
  import SHOP from 'index/service/shop-service.js'
  export default {
    name: 'ShopDetail',
    data(){
      return {
        swiperOption: {
          pagination:{
            el:".swiper-pagination",
            dynamicBullets:true
          },
          loop: true,
          initialSlide: 0,
          autoplay:{
            delay:2500,
            disableOnInteraction: false,
          },
          speed: 800
        },
        goodsList:{},
        slideShowPicUrlArray :[]
      }
    },
    created(){
      let uuid = this.$route.query.uuid;
      this.getGoodsList(uuid);
    },
    methods:{
      //加载商品详情
      getGoodsList(uuid){
        let data = {
          "unit":10,
          "page":1,
          "uuid":uuid
        };
        SHOP.getGoodsList(data)
          .then(res => {
            // console.log('res', res);
            if (res.code === "0") {
              this.goodsList = res.data[0];
              this.slideShowPicUrlArray = res.data[0].slideShowPicUrlArray;
            }
          })
      },
      //跳转到投保人信息页面
      goMakeOrder(){
        this.$router.push({
          path: '/InsureInfo',
          name:'InsureInfo',
          query:{
            uuid: this.goodsList.uuid,
            insuranceLink: this.goodsList.insuranceLink
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .shopDetailCon{
    width: 100%;
    /*height: 100%;*/
    background: #313340;
    padding-bottom: 300px;
    overflow: auto;
  }
  .backIcon{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 26px;
    left: 24px;
    .bg-image("~index/assets/back");
  }
  .title{
    width: 68*2px;
    height: 48px;
    margin:auto;
    padding-top: 24px;
    font-size: 17*2px;
    line-height: 48px;
  }
  .swiperCon{
    width: 100%;
    height: 153*2px;
    padding-top: 24px;
  }
  .swiper{
    width: 375*2px;
    height: 153*2px;
    background: #ccc;
  }
  .shopDetail{
    width: 351*2px;
    margin: auto;
    margin-top: 12px;
  }
  .shopTitle{
    width: 100%;
    height: 48*2px;
    line-height: 24*2px;
    font-size: 30px;
  }
  .coinCount{
    width: 100%;
    height: 48px;
    margin-top: 16px;
  }
  .coin{
    width: 116*2px;
    height: 48px;
    float: left;
    text-align: left;
    line-height: 48px;
    color: #DDB67F;
    font-size: 28px;
  }
  .stock{
    width: 103*2px;
    height: 48px;
    opacity: .6;
    font-size: 28px;
    text-align: right;
    float: right;
  }
  .detailImg{
    width: 100%;
    margin-top: 32px;
    margin-bottom: 60*2px;
  }
  .imgs{
    width: 100%;
    /*height: 300px;*/
    margin-bottom: 20px;
    /*background: #ccc;*/
  }
  .footerCon{
    width: 100%;
    height: 48*2px;
    position: fixed;
    bottom: 0;
  }
  .customerService{
    width: 160px;
    height: 48*2px;
    float: left;
    background: #15161D;
  }
  .insureBtn{
    /*<!--width: 295*2px;-->*/
    width: 100%;
    height: 48*2px;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    float: right;
    font-size: 36px;
    text-align: center;
    line-height: 48*2px;
  }
  .customerIcon{
    width: 32px;
    height: 32px;
    .bg-image("~index/assets/shop/customer");
    margin: auto;
    margin-top: 18px;
  }
  .customerText{
    width: 100%;
    height: 32px;
    text-align: center;
    color: #DDB67F;
    font-size: 20px;
  }
  .imgCon{
    width: 100%;
    height: 100%;
  }
</style>
