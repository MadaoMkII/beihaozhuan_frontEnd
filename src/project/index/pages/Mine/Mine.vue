<template>
  <div class="mineCon">
    <div class="mineTopCon">
      <div class="mineInfo">
        <div class="headPic" :style="{backgroundImage:'url('+avatar+')'}"></div>
        <div class="mineName" v-if="nickName !=''">{{nickName}}</div>
        <div class="mineName" v-else @click="goLogin()">点击登录</div>
      </div>
      <div class="coinCon">
        <div class="coinItem totalCoin"  @click="goPage('Record','')">
          <div class="count" v-if="totalCoin !=''">{{totalCoin}}金币</div>
          <div class="count" v-else>— —</div>
          <div class="countText">
            <div class="text">累计提现</div>
            <div class="icon"></div>
          </div>
        </div>
        <div class="coinItem canUseCoin" @click="goPage('Apply',Bcoins)">
          <div class="count" v-if="Bcoins !=''">{{Bcoins}}金币</div>
          <div class="count" v-else>— —</div>
          <div class="countText">
            <div class="text">可提余额</div>
            <div class="icon"></div>
          </div>
        </div>
      </div>
    </div>
<!--      快捷按钮组区域-->
    <div class="btnGroups">
      <div class="btnItem" @click="goPage('MyTask')">
        <div class="btnImg"></div>
        <div class="btnText">我的任务</div>
      </div>
      <div class="btnItem" @click="goPage('Order')">
        <div class="btnImg orderImg"></div>
        <div class="btnText">我的订单</div>
      </div>
      <div class="btnItem" @click="goPage('Team')">
        <div class="btnImg teamImg"></div>
        <div class="btnText">我的团队</div>
      </div>
      <div class="btnItem accountItem" @click="goPage('AccountDetail')">
        <div class="btnImg accountImg"></div>
        <div class="btnText">账户明细</div>
      </div>
    </div>
<!--    轮播图区域-->
    <div class="swiperCon">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide  v-for="item in imgList" :key="item.id">
          <img class="imgCon" v-bind:src="item.carouselUrl" @click="goAdPage(item.source,item.uuid)">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <div class="listCon">
<!--      <div class="listItem">-->
<!--        <div class="listImg"></div>-->
<!--        <div class="listText">任务记录</div>-->
<!--        <div class="listIcon"></div>-->
<!--      </div>-->
      <div class="listItem" @click="goMyInfo()">
        <div class="listImg myInfo"></div>
        <div class="listText">个人信息</div>
        <div class="listIcon"></div>
      </div>
      <div class="listItem" @click="goPage('Safe')">
        <div class="listImg safe"></div>
        <div class="listText">账户安全</div>
        <div class="listIcon"></div>
      </div>
      <div class="listItem" @click="goPage('Introduce')">
        <div class="listImg company"></div>
        <div class="listText">公司介绍</div>
        <div class="listIcon"></div>
      </div>
      <div class="listItem" @click="showPosterPop()">
<!--      <div class="listItem">-->
        <div class="listImg friend"></div>
        <div class="listText">邀请好友</div>
        <div class="listIcon"></div>
      </div>
      <div class="listItem phoneItem" >
        <div class="listText">客服电话</div>
<!--        <div class="serviceNumberCon" v-for="item in serviceNumber" :key="item.index">-->
          <div class="serviceNumber"  v-for="item in serviceNumber" :key="item.index">{{item}}</div>
<!--        </div>-->
      </div>
    </div>

<!--    邀请好友-->
    <div v-if="showPoster" @click="hidePosterPop()">
      <INVITEPOSTER></INVITEPOSTER>
    </div>

  </div>
</template>

<script>
  import MineInfo from 'index/service/mine-service.js'
  import INVITEPOSTER from 'index/pages/poster/InvitePoster.vue'
  import AD from 'index/service/ad-service.js'
  import SYSTEM from 'admin/service/system-service.js'
    export default {
      name: 'Mine',
      data(){
        return {
          serviceNumber:[],
          avatar : require('../../assets/mine/headImg@2x.png') ,
          nickName : '',
          swiperOption: {
            pagination:{
              el:".swiper-pagination",
              dynamicBullets:true
            },
            loop: false,
            initialSlide: 0,
            autoplay:{
              delay:2500,
              disableOnInteraction: false,
            },
            speed: 800
          },
          showPoster:false,
          Bcoins:'',
          totalCoin:'',
          imgList:[]
        }
      },
      components:{
        INVITEPOSTER
      },
      created(){
        this.getPhone();
        this.getAdByPosition();  //查询广告信息
        MineInfo.getUserInfo()
          .then(res => {
            // console.log('res',res)
            if(res.code === '0'){
              this.avatar = res.data.avatar;
              this.nickName = res.data.nickName;
              this.Bcoins = res.data.Bcoins;
            }
          });
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper
        }
      },
      methods:{
        //根据广告位置查询广告图片及来源
        getAdByPosition(){
          let data = {
            'positionName' : '个人中心banner'
          }
          AD.getAdByPosition(data)
            .then(res => {
              // console.log('res',res);
              if(res.code === "0"){
                this.imgList = res.data.advertisements;
              }
            })
        },
        //跳转到个人信息页面
        goMyInfo(){
          this.$router.push({
            path: '/myInfo',
            name:'MyInfo'
          })
        },
        //跳转页面
        goPage(type,coin){
          this.$router.push({
            name:type,
            query:{
              coin:coin
            }
          })
        },
        //获取客服电话
        getPhone(){
          SYSTEM.getSetting()
            .then(res => {
              // console.log('res', res);
              if (res.code === "0") {
                let phoneVal = [];
                phoneVal = res.data.serviceNumber.split(',');
                if(phoneVal){
                  this.serviceNumber = phoneVal;
                }else {
                  phoneVal.push(res.data.serviceNumber);
                  this.serviceNumber = phoneVal;
                }
              }
            });
        },
        //打开海报弹窗
        showPosterPop(){
          this.showPoster = true
        },
        //关闭海报弹窗
        hidePosterPop(){
          this.showPoster = false
        },
        //点击去登录
        goLogin(){
          this.$router.push({
            name:'Login'
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
  .mineCon{
    width: 100%;
    height: 100%;
    padding-bottom: 300px;
    overflow: auto;
  }
  .mineTopCon{
    width: 100%;
    height: 170*2px;
    .bg-image("~index/assets/mine/mineBg");
    background-position: 0px -36px;
  }
  .mineTopBg{
    width: 100%;
    height: 170*2px;
    .bg-image("~index/assets/mine/mineBg");
    background-position: 0px -36px;
  }
  .mineInfo{
    height: 48*2px;
    padding-top: 44px;
  }
  .headPic{
    width: 48*2px;
    height: 48*2px;
    border-radius: 48px;
    border: 2px solid #fff;
    margin-left: 24px;
    float: left;
    background-size:cover;
    background-repeat: no-repeat;
  }
  .mineName{
    height: 48*2px;
    line-height: 48*2px;
    margin-left: 16px;
    font-size: 32px;
    font-weight:600;
    text-align: left;
    float: left;
  }
  .coinCon{
    width: 352*2px;
    height: 75*2px;
    margin: auto;
    margin-top: 32px;
  }
  .coinItem{
    width: 176*2px;
    height: 52*2px;
    margin-top: 22px;
    float: left;
  }
  .count{
    height: 32*2px;
    text-align: center;
    color: #DDB67F;
    line-height: 32*2px;
    font-size: 36px;
  }
  .countText{
    width: 64*2px;
    height: 40px;
    margin: auto;
  }
  .text{
    width: 52*2px;
    height: 40px;
    line-height: 40px;
    opacity: .8;
    text-align: center;
    float: left;
  }
  .icon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/mine/right");
    float: left;
    margin-top: 8px;
  }
  .btnGroups{
    width: 100%;
    height: 200px;
  }
  .btnItem{
    width: 93*2px;
    height: 200px;
    float: left;
    margin-right: 2px;
  }
  .btnImg{
    width: 48*2px;
    height: 48*2px;
    .bg-image("~index/assets/mine/task");
    margin-top: 32px;
    margin-left: 23*2px;
  }
  .btnText{
    width: 56*2px;
    height: 32px;
    margin-top: 8px;
    margin-left: 19*2px;
    text-align: center;
    line-height: 32px;
  }
  .orderImg{
    .bg-image("~index/assets/mine/order");
  }
  .teamImg{
    .bg-image("~index/assets/mine/team");
  }
  .accountImg{
    .bg-image("~index/assets/mine/account");
  }
  .accountItem{
    margin-right: 0px;
  }
/*轮播图区域*/
  .swiperCon{
    width: 352*2px;
    height: 92*2px;
    margin: auto;
    padding-top: 16px;
  }
  .swiper{
    width: 352*2px;
    height: 92*2px;
    background: #ccc;
    border-radius: 16px;
  }
  .listCon{
    width: 100%;
    background: #282A37;
    margin-top: 16px;
    margin-bottom: 300px;
  }
  .listItem{
    min-height: 48*2px;
    margin-left: 24px;
    border-bottom: 2px solid #21232F;
  }
  .listImg{
    width: 40px;
    height: 40px;
    margin-top: 26px;
    .bg-image("~index/assets/mine/notes");
    float: left;
  }
  .listText{
    width: 128*2px;
    height: 48*2px;
    margin-left: 16px;
    line-height: 48*2px;
    font-size: 28px;
    float: left;
  }
  .listIcon{
    width: 24px;
    height: 24px;
    float: right;
    margin-top: 36px;
    margin-right: 24px;
    .bg-image("~index/assets/mine/right");
  }
  .myInfo{
    .bg-image("~index/assets/mine/myInfo");
  }
  .safe{
    .bg-image("~index/assets/mine/safe");
  }
  .company{
    .bg-image("~index/assets/mine/company");
  }
  .friend{
    .bg-image("~index/assets/mine/friend");
  }
  .posterCon{
    border: 10px solid #fff;
  }
  .imgCon{
    width: 100%;
    height: 100%;
  }
  .phoneItem{
    min-height:48*2px!important;
    opacity: .6;
  }
  .serviceNumber{
    /*width: 50%;*/
    height: 48*2px;
    line-height: 48*2px;
    margin-right: 24px;
    opacity: .6;
    font-size: 13*2px;
    text-align: right;
  }
</style>
