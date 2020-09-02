<template>
  <div class="gameCon">
    <div class="gameTitleTop"></div>
    <div class="swiperCon">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide  v-for="(item,index) in bannerImgList" :key="index">
          <a :href="item.link"><img class="imgCon" v-bind:src="item.imgUrl"></a>
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>
    <!--金币兑换-->
    <div class="goldCoinCon">
      <div class="goldTitle">
        <div class="gameTitleImg"></div>
      </div>
      <div class="gameList">
        <div class="gameListItem" v-for="item in gameList">
          <div class="gameItemImg"><img class="imgCon" v-bind:src="item.imgUrl"></div>
          <div class="gameItemTitleCon">
            <span class="gameItemTitle">{{item.title}}</span>
            <div class="gameItemIcon androidIcon" v-if="item.plantA"></div>
            <div class="gameItemIcon iosIcon" v-if="item.plantB"></div>
          </div>
          <div class="gameItemDetail">{{item.des}}</div>
          <a :href="item.link"><div class="downloadBtn">{{item.btnText}}</div></a>
        </div>

      </div>
    </div>
  </div>

</template>
<script>
  export default {
    name: 'Game',
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
        bannerImgList:[
          {'imgUrl':'/static/bannerImg/gameBanner1.jpg','link':'http://qpm.boxiangyx.com/mobile/mp/extension.html?agentId=2000551'},
          {'imgUrl':'/static/bannerImg/gameBanner2.jpg','link':'https://iddxy.shiyiyx.com/agent/80001150/index.html'}
        ],
        gameList:[
          {'imgUrl':'/static/bannerImg/1.png','plantA':true,'plantB':false,'title':'捕鱼欢乐颂','des':'万炮万倍！给你炮炮爆金的快感!','btnText':'下载','link':'http://qpm.boxiangyx.com/mobile/mp/extension.html?agentId=2000551'},
          {'imgUrl':'/static/bannerImg/2.png','plantA':true,'plantB':true,'title':'口袋幻兽','des':'封神觉醒！经典西游梦幻来袭！','btnText':'试玩','link':'https://iddxy.shiyiyx.com/agent/80001150/index.html'},
          {'imgUrl':'/static/bannerImg/3.png','plantA':true,'plantB':false,'title':'太极熊猫-游龙枪影','des':'现象级全球动作手游《太极熊猫》武神再度出击，为你而战！','btnText':'下载','link':'http://api.np.mobilem.360.cn/redirect/down/?from=lm_273730&appid=2195291'},
          {'imgUrl':'/static/bannerImg/4.png','plantA':true,'plantB':false,'title':'全民枪战-通行证T1','des':'全球首款FPS+UGC竞技手游。全新版本-神龙宝藏，超多全新内容等你体验！','btnText':'下载','link':'http://api.np.mobilem.360.cn/redirect/down/?from=lm_273730&appid=1967788'},
          {'imgUrl':'/static/bannerImg/5.png','plantA':true,'plantB':false,'title':'天龙3D-斗战器灵','des':'新资料片“斗战器灵”火爆来袭！全民第一武侠RPG手游，累计注册用户已突破1.5亿！','btnText':'下载','link':'http://api.np.mobilem.360.cn/redirect/down/?from=lm_273730&appid=1957338'},
          {'imgUrl':'/static/bannerImg/6.png','plantA':true,'plantB':false,'title':'贪婪洞窟','des':'地牢探险Roguelike手游，多种难度，400层随机地形迷宫，多种不同的怪物，多件随机属性的可收集装备，及更多独特有趣的玩法等你发现！','btnText':'下载','link':'http://api.np.mobilem.360.cn/redirect/down/?from=lm_273730&appid=3266063'},
        ]
      }
    },
    created(){

    },
    methods: {

    }
  }
</script>
<style lang="less" scoped>
  .gameCon{
    width: 100%;
    height: 90%;
    overflow: auto;
  }
  .gameTitleTop{
    width: 240px;
    height: 120px;
    margin-left: 24px;
    .bg-image("~index/assets/game/gameTitle");
  }
  .swiperCon{
    width: 100%;
    height: 153*2px;
    padding-top: 24px;
  }
  .swiper{
    width: 375*2px;
    height: 153*2px;
  }
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
  .gameTitleImg{
    width: 158*2px;
    height: 80px;
    .bg-image("~index/assets/game/topGames");
  }
  .imgCon{
    width: 100%;
    height: 100%;
  }
  .gameList{
    padding: 0 24px;
  }
  .gameListItem{
    width: 100%;
    height: 72*2px;
    position: relative;
    margin-bottom: 32px;
  }
  .gameItemImg{
    width: 72*2px;
    height: 72*2px;
    border-radius: 20px;
    background: #ccc;
    float: left;
  }
  .gameItemTitleCon{
    max-width: 75%;
    height: 48px;
    line-height: 48px;
    padding-left: 16px;
    float: left;
    margin-top: 16px;
  }
  .gameItemTitle{
    width: 65%;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    margin-right: 24px;
    vertical-align: top;
  }
  .gameItemIcon{
    width: 60px;
    height: 32px;
    /*float: left;*/
    display: inline-block;
    margin-right:16px;
    margin-top: 8px;
  }
  .androidIcon{
    .bg-image("~index/assets/game/android");
  }
  .iosIcon{
    .bg-image("~index/assets/game/ios");
  }
  .gameItemDetail{
    width: 55%;
    height: 48px;
    float: left;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    line-height: 48px;
    margin: 16px 24px 0 16px;
  }
  .downloadBtn{
    width: 64*2px;
    height: 48px;
    border-radius: 24px;
    background:linear-gradient(270deg,rgba(237,207,165,1) 0%,rgba(221,182,127,1) 100%);
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.2);
    font-size: 28px;
    line-height: 48px;
    text-align: center;
    font-weight:600;
    position: absolute;
    right: 0;
    top: 80px;
  }
</style>
