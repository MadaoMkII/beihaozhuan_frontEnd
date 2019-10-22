<template>
  <div class="shopCon">
    <div class="shopTitleTop"></div>
    <div class="swiperCon">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide  v-for="item in imgList" :key="item.id">
          <img class="imgCon" v-bind:src="item.carouselUrl" @click="goAdPage(item.source,item.uuid)">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <!--金币兑换-->
    <div class="goldCoinCon">
      <div class="goldTitle">
        <div class="goldTitleImg"></div>
      </div>
      <div class="goldList" v-show="!noGoodsCon">
        <div class="goldItem" v-for="item in goodsList">
          <div class="goldListImg" @click="goShopDetail(item.uuid)">
            <img class="imgCon" v-bind:src="item.mainlyShowPicUrl">
          </div>
          <div class="goldlistTitle">
            <div class="goldTitles">{{item.title}}</div>
            <div class="goldCount">{{item.price}}金币</div>
          </div>
        </div>
      </div>
      <div class="goldList" v-show="noGoodsCon">
        <div class="goldItem">
          <div class="goldListImg">
            <img class="imgCon" v-bind:src="noGoods">
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import SHOP from 'index/service/shop-service.js'
  import AD from 'index/service/ad-service.js'
  export default {
    name: 'Home',
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
            delay:5000,
            disableOnInteraction: false,
          },
          speed: 800
        },
        goodsList:[],
        imgList:[],
        noGoodsCon:true,
        noGoods:require('../../assets/shop/noGoods.jpeg')
      }
    },
    created(){
      this.getGoodsList();
      this.getAdByPosition();  //查询广告信息
    },
    methods: {
      //根据广告位置查询广告图片及来源
      getAdByPosition(){
        let data = {
          'positionName' : '商城banner'
        }
        AD.getAdByPosition(data)
          .then(res => {
            // console.log('res',res);
            if(res.code === "0"){
              this.imgList = res.data.advertisements;
            }
          })
      },
      //获取商品列表
      getGoodsList() {
        let data = {
          "unit":100,
          "page":1,
        };
        SHOP.getGoodsList(data)
          .then(res => {
            // console.log('res', res);
            if (res.code === "0") {
              if(res.count == 0){
                this.noGoodsCon = true;
              }else {
                this.goodsList = res.data;
                this.noGoodsCon = false;
              }
            }
          })
      },
      //跳转到商品详情页面
      goShopDetail(uuid){
        this.$router.push({
          path: '/ShopDetail',
          name:'ShopDetail',
          query:{
            uuid:uuid
          }
        })
      },
      //跳转到广告页面
      goAdPage(source,uuid){
        if(source !== '单图片'){
          this.$router.push({
            path: '/ad',
            name:'Ad',
            query:{
              source:source,
              uuid:uuid
            }
          })
        }
      },
    }
  }
</script>
<style lang="less" scoped>
  .taskCon{
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .shopTitleTop{
    width: 240px;
    height: 120px;
    margin-left: 24px;
    .bg-image("~index/assets/shop/shopTitle");
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
  /*金币兑换*/
  .goldCoinCon{
    width: 100%;
    /*height: 1000px;*/
    margin-top: 32px;
    background:linear-gradient(180deg,rgba(40,42,55,1) 0%,rgba(49,51,64,1) 100%);
  }
  .goldTitle{
    width: 158*2px;
    margin: auto;
    padding-top: 20px;
    padding-bottom: 40px;
  }
  .goldTitleImg{
    width: 158*2px;
    height: 80px;
    .bg-image("~index/assets/home/goldCoin");
  }
  .goldList{
    width: 351*2px;
    margin: auto;
    margin-bottom: 300px;
  }
  .goldItem{
    width: 100%;
    border-radius: 16px;
    margin-bottom: 26px;
  }
  .goldListImg{
    width: 100%;
    height: 196*2px;
    background: #D8D8D8;
    border-radius: 16px;
    overflow: hidden;
  }
  .goldlistTitle{
    width: 100%;
    height: 48px;
  }
  .goldTitles{
    width: 228*2px;
    height: 48px;
    line-height: 48px;
    font-size: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    float: left;
  }
  .goldCount{
    width: 103*2px;
    height: 48px;
    font-size: 28px;
    color: #DDB67F;
    line-height: 48px;
    text-align: right;
    float: right;
  }
  .imgCon{
    width: 100%;
    height: 100%;
  }
</style>
