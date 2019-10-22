<template>
  <div class="conBox" ref="conBox">
  <div class="homeCon">
    <div class="swiperCon">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper" v-if="imgList.length">
        <swiper-slide  v-for="item in imgList" :key="item.id">
          <img class="imgCon" v-bind:src="item.carouselUrl" @click="goAdPage(item.source,item.uuid)">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
  </div>
    <div class="bannerCon">
      <div class="bannerItem">
        <div class="bannerSmItem lead" @click="playIntroduce()"></div>
        <div class="bannerSmItem gold" @click="goldPop()"></div>
      </div>
      <div class="bannerItem registerUser">
        <div class="dateCon">{{date}}</div>
        <div class="countCon">{{count}}<span>人</span></div>
      </div>
    </div>
<!--任务列表-->
    <div class="taskListCon">
      <div class="taskTitle">
        <div class="taskTitleImg"></div>
      </div>
      <div class="taskList">
        <div class="listItem" v-for="item in taskList">
          <div class="listImg"  :style="{height: item.height/75 + 'rem'}">
            <img class="imgCon" v-bind:src="item.carouselUrl" @click="goAdPage(item.source,item.uuid)">
          </div>
          <div class="listTitle">{{item.title}}</div>
          <div class="btnGroup">
            <div class="coinCon">
              <div class="coinImg"></div>
              {{item.reward}}金币
            </div>
            <div class="taskBtn" @click="goAdPage(item.source,item.uuid)">做任务</div>
          </div>
        </div>
      </div>
    </div>
  <!--金币兑换-->
    <div class="goldCoinCon" v-show="!hideGoods">
      <div class="goldTitle">
        <div class="goldTitleImg"></div>
      </div>
      <div class="goldList">
        <div class="goldItem">
          <div class="goldListImg" @click="goShopDetail()">
            <img class="imgCon" v-bind:src="goodsInfo.mainlyShowPicUrl">
          </div>
          <div class="goldlistTitle">
            <div class="goldTitles">{{goodsInfo.title}}</div>
            <div class="goldCount">{{goodsInfo.price}}金币</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LOGIN from 'index/service/login-service.js'
  import TASK from 'index/service/task-service.js'
  import SHOP from 'index/service/shop-service.js'
  import AD from 'index/service/ad-service.js'
  import {Swiper} from "vue-awesome-swiper";
  export default {
    name: 'Home',
    data(){
      let self = this
      return {
        count : '0',
        date:'',
        goodsInfo:{
          title:'',
          mainlyShowPicUrl : '',
          price:'',
          uuid : ''
        },
        swiperOption: {
          pagination:{
            el:".swiper-pagination",
            dynamicBullets:true
          },
          loop: false,
          initialSlide: 0,
          autoplay:{
            delay:5000,
            disableOnInteraction: false,
          },
          speed: 80,
        },
        imgList:[],
        taskList:[],
        hideGoods:false,
        scroll:''
      }
    },
    created(){
      this.getUserNumber();
      this.getNowDate();
      this.getRecommandGoods();
      this.getAdByPosition();  //查询广告信息
      this.getTaskList();
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    activated() {
      this.$refs.conBox.scrollTop = this.scroll
    },
    mounted() {

    },
    methods:{
      //根据广告位置查询广告图片及来源
      getAdByPosition(){
        let data = {
          'positionName' : '首页banner'
        }
        AD.getAdByPosition(data)
          .then(res => {
            console.log('res',res);
            if(res.code === "0"){
              this.imgList = res.data.advertisements;
            }
          })
      },
      //获取任务列表
      getTaskList(){
        let data = {
          'positionName' : '任务频道'
        }
        AD.getAdByPosition(data)
          .then(res => {
            console.log('res',res);
            if(res.code === "0"){
              this.taskList = res.data;
            }
          })
      },
      // onSlideChangeStart(){
      //   for(let i=0;i<this.imgList.length;i++){
      //     let id = this.imgList[i].id;
      //     let unitid = this.imgList[i].unitid;
      //     this.getBanner(id,unitid);
      //   }
      // },
      // //获取顶部广告位
      // getBanner(id,unitid){
      //   console.log('获取广告位')
      //   if (window.Vijs) {
      //     var myAd148334 = Vijs.setAD({
      //       unitid: unitid,
      //       view: 286,
      //       placeholderid: id,
      //       loadedCallback: function() {
      //         console.log('success');
      //       }
      //     });
      //   }
      // },
      //玩儿法引导
      playIntroduce(){
        this.$router.push({
          path: '/playIntroduce',
          name:'PlayIntroduce'
        })
      },
      //获取平台注册用户
      getUserNumber(){
        LOGIN.getUserNumber()
          .then(res => {
            console.log('res',res);
            if(res.code === "0"){
              this.count = res.data.count;
            }
          })
      },
      //获取当前日期
      getNowDate(){
        let nowDate = new Date();
        let date = {
          year: nowDate.getFullYear(),
          month: nowDate.getMonth() + 1,
          date: nowDate.getDate(),
        };
        if(date.month < 10){
          date.month = '0' + date.month;
        }
        if(date.date < 10){
          date.date = '0' + date.date;
        }
        this.date = date.year + '-' + date.month + '-' + date.date;
      },
      //获取商品推荐列表
      getRecommandGoods(){
        SHOP.getRecommandGoods()
          .then(res => {
            console.log('res',res);
            if(res.code === "0"){
              if(res.data){
                this.hideGoods = false;
                let resize = '?x-oss-process=style/resize';
                this.goodsInfo.mainlyShowPicUrl = res.data.mainlyShowPicUrl + resize;
                this.goodsInfo.title = res.data.title;
                this.goodsInfo.price = res.data.price;
                this.goodsInfo.uuid = res.data.uuid;
              }else {
                this.hideGoods = true;
              }
            }
          })
      },
      //跳转到商品详情页面
      goShopDetail(){
        this.$router.push({
          path: '/ShopDetail',
          name:'ShopDetail',
          query:{
            uuid:this.goodsInfo.uuid
          }
        })
      },
      //跳转到广告页面
      goAdPage(source,uuid){
        let wrapperScrollTop = this.$refs.conBox.scrollTop;
        this.scroll = wrapperScrollTop;

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
      //跳转到金币页面
      goldPop(){
        this.$router.push({
          path: '/task',
          name:'Task'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .conBox{
    height: 80%;
    padding-bottom: 300px;
    overflow: auto;
  }
  .homeCon{
    width: 100%;
    height: 200 *2px;
    .bg-image("~index/assets/home/homeBg");
    background-position: 0px -36px;
  }
  .swiperCon{
    width: 354*2px;
    height: 142 * 2px;
    /*height: 100%;*/
    margin: auto;
    padding-top: 55*2px;
  }
  .swiper{
    width: 354*2px;
    height: 142 * 2px;
    background: #ccc;
    border-radius: 16px;
  }
  .bannerCon{
    width: 354*2px;
    margin: auto;
    margin-top: 30px;
  }
  .bannerItem{
    width: 100%;
    height: 160px;
    margin-bottom: 18px;
    overflow: hidden;
  }
  .bannerSmItem{
    width: 172*2px;
    height: 160px;
  }
  .lead{
    width: 172*2px;
    height: 160px;
    float: left;
    .bg-image("~index/assets/home/lead");
  }
  .gold{
    width: 172*2px;
    height: 160px;
    float: right;
    .bg-image("~index/assets/home/gold");
  }
  .registerUser{
    width: 100%;
    height: 160px;
    .bg-image("~index/assets/home/registerUser");
  }
  .dateCon{
    width: 74*2px;
    height: 48px;
    margin-top: 24px;
    margin-left: 126*2px;
    line-height: 48px;
    text-align: right;
    color: #DDB67F;
    font-size: 24px;
  }
  .countCon{
    width: 117*2px;
    height: 28*2px;
    margin-top: 8px;
    margin-left: 24px;
    line-height: 28*2px;
    font-size: 40px;
    font-weight:bold;
    color:#282A37;
  }
  .countCon span{
    font-size: 36px;
    color:#282A37;
    font-weight:bold;
  }
  .taskListCon{
    width: 100%;
    /*height: 1000px;*/
    margin-top: 18px;
    background:linear-gradient(180deg,rgba(40,42,55,1) 0%,rgba(49,51,64,1) 100%);
  }
  .taskTitle{
    width: 138*2px;
    /*height: 80px;*/
    margin: auto;
    padding-top: 20px;
    padding-bottom: 40px;
  }
  .taskTitleImg{
    width: 138*2px;
    height: 80px;
    .bg-image("~index/assets/home/taskList");
  }
  .taskList{
    width: 351*2px;
    margin: auto;
  }
  .listItem{
    width: 100%;
    margin-bottom: 40px;
  }
  .listImg{
    width: 100%;
    height: 88*2px;
    border-radius: 16px;
    background: #FF9E00;
  }
  .listTitle{
    width: 100%;
    height: 24*2px;
    margin-top: 8px;
    line-height: 48px;
    font-size: 30px;
  }
  .btnGroup{
    width: 100%;
    height: 48px;
    font-size: 28px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 48px;
  }
  .coinCon{
    float: left;
  }
  .coinImg{
    width: 40px;
    height: 40px;
    float: left;
    margin-top: 4px;
    .bg-image("~index/assets/home/coin");
  }
  .taskBtn{
    width: 64*2px;
    height: 48px;
    border-radius: 24px;
    float: right;
    background:linear-gradient(270deg,rgba(237,207,165,1) 0%,rgba(221,182,127,1) 100%);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.2);
    font-size: 28px;
    line-height: 48px;
    text-align: center;
    font-weight:600;
  }
  /*金币兑换*/
  .goldCoinCon{
    width: 100%;
    /*height: 1000px;*/
    margin-top: 18px;
    /*margin-bottom: 300px;*/
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
    /*overflow: hidden;*/
  }
  .goldListImg{
    width: 100%;
    height: 196*2px;
    background: #D8D8D8;
    border-radius: 16px;
    /*overflow: hidden;*/
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
