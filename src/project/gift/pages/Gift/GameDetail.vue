<template>
    <div class="gameDetailCon">
      <div class="gameDetailBg"></div>
      <div class="flowCon">
        <div class="tips fistTips">
          1、点击“立刻下载”安装捕鱼欢乐颂，登录注册账号并试玩，<span style="color: #D21212">限定安卓操作系统手机可下载试玩</span>
        </div>
        <div class="tips">
          2、上传登录、注册、认证三张截图，例图如下
        </div>
        <div class="bannerCon">
          <swiper class="swiper" :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="item in imgList" >
              <img class="imgCon" v-bind:src="item.imgUrl">
            </swiper-slide>
          </swiper>
        </div>
        <div class="tips">
          3、审核后贝好赚账户获得5000贝金币，约0.5元
        </div>
        <div class="tips">
          4、登录贝好赚账号，每个设备只能完成一次试玩任务
        </div>
        <div class="tips">
          5、红包名额有限，送完即止。活动结束后，贝好赚平台将开放提现通道
        </div>
        <div class="tips">
          6、贝好赚永久地址：https://www.beihaozhuan.com/
        </div>
        <div class="tips">
          7、关注我，领钱不迷路
        </div>
        <div class="qrcodeCon"></div>
      </div>
      <div class="btnGroup">
        <a :href="'http://qpm.boxiangyx.com/mobile/mp/extension.html?agentId=2000551'"><div class="downloadBtn">下载游戏</div></a>
        <div class="packetBtn" v-if="status === '无订单'" @click="goUpload()">我要领红包</div>
        <div class="packetBtn" v-else-if="status === '未审核'" >已提交,请等待审核</div>
        <div class="packetBtn" v-else-if="status === '审核通过'" @click="goHome()">任务完成,去贝好赚领钱</div>
        <div class="packetBtn" v-else-if="status === '审核不通过'" @click="goUpload()">未通过审核,重新上传</div>
      </div>
    </div>
</template>

<script>
  import GIFT from 'gift/service/gift-service.js'
    export default {
      name: "GameDetail",
      data(){
        return{
          status:'',
          swiperOption: {
            loop: true,  // 循环
            speed:800,  //切换速度
            mousewheelControl: false,// 禁止鼠标滚轮切换
            lazy: {
              loadPrevNext: true,
            },
            autoplay: {
              delay:2000,
              stopOnLastSlide: false, // 切换到最后一个时不停止
              disableOnInteraction: false, //用户操作swiper之后 不停止autoplay
            },
            coverflowEffect: {
              rotate: 0,
              stretch: -70, // slide左右距离
              depth: 300, // slide前后距离
              modifier: 0.5, //
              slideShadows: false // 滑块遮罩层
            },
            watchSlidesProgress:true,
            centeredSlides: true, //设定为true时，活动块会居中，而不是默认状态下的居左。
            spaceBetween:10,
            loopedSlides :2,
            observer: true,
            observeParents: true,
            effect: "coverflow",
            grabCursor: true,
            slidesPerView: 1.55,
          },
          imgList:[
            {'imgUrl':'/static/bannerImg/banner1.jpeg'},
            {'imgUrl':'/static/bannerImg/banner2.jpeg'},
            {'imgUrl':'/static/bannerImg/banner3.jpeg'},
          ],
        }
      },
      computed: {
        swiper() {
          return this.$refs.mySwiper.swiper;
        }
      },
      created(){
        this.getBtnStatus();
      },
      methods:{
        goUpload(){
          this.$router.push({
            name:'PicUpload'
          })
        },
        //获取审批状态
        getBtnStatus(){
          GIFT.checkProofsStatus()
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.status = res.data.status;
              }
            })
        },
        goHome(){
          window.open('https://www.beihaozhuan.com','_self');
        }
      },
      watch:{
        '$route'(){
          this.getBtnStatus();
        }
      }
    }
</script>

<style lang="less" scoped>
  .gameDetailCon{
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .gameDetailBg{
    width: 100%;
    height: 868*2px;
    .bg-image("~index/assets/gift/gameBg");
  }
  .flowCon{
    width: 100%;
    height: 590*2px;
    position: absolute;
    top: 192*2px;
    .bg-image("~index/assets/gift/flow");
  }
  .btnGroup{
    width: 100%;
    height: 48*2px;
    position: fixed;
    line-height: 48*2px;
    text-align: center;
    bottom: 0;
  }
  .downloadBtn{
    width: 140*2px;
    height: 48*2px;
    background:linear-gradient(90deg,rgba(114,196,252,1) 0%,rgba(22,100,196,1) 100%);
    float: left;
    font-size: 32px;
    font-weight:600;
  }
  .packetBtn{
    width: 235*2px;
    height: 48*2px;
    background:linear-gradient(270deg,rgba(228,28,52,1) 0%,rgba(244,121,50,1) 100%);
    float: left;
    font-size: 32px;
    font-weight:600;
  }
  .tips{
    width: 290*2px;
    margin: auto;
    color: #6B3808;
    line-height: 45px;
  }
  .fistTips{
    margin-top: 160px;
  }
  .bannerCon{
    width: 100%;
    height: 134*2px;
    margin: 10px 0;
  }
  .qrcodeCon{
    width: 122*2px;
    height: 122*2px;
    background: #ccc;
    margin: auto;
    margin-top: 20px;
    .bg-image("~index/assets/qrcode");
  }
  .imgCon{
    width: 100%;
    height: 100%;
  }


</style>
