<template>
    <div class="gameDetailCon">
      <div class="gameDetailBg"></div>
      <div class="flowCon">
        <div class="tips fistTips">
          1、点击“下载游戏”安装鱼潮来了，登录注册账号并试玩，<span style="color: #D21212">限定安卓操作系统手机可下载试玩(小米手机除外)</span>
        </div>
        <div class="tips">
          2、下载游戏后，请运行游戏，参照下图示例，进行截图保存
        </div>
        <div class="bannerCon">
          <img class="imgCon" :src="imgUrl" preview="0">
        </div>
        <div class="tips">
          3、点击我要领红包，上传截图，审核后贝好赚账户获得5000贝金币，约0.5元
        </div>
        <div class="tips">
          4、登录贝好赚账号，每个设备只能完成一次试玩任务
        </div>
        <div class="tips">
          5、红包名额有限，送完即止。活动结束后，贝好赚平台将开放提现通道
        </div>
        <div class="tips">
          6、贝好赚永久地址:https://www.beihaozhuan.com/
        </div>
        <div class="tips">
          7、关注我，领钱不迷路
        </div>
        <div class="qrcodeCon">
          <img class="imgCon" :src="qrcode" >
        </div>
      </div>
      <div class="btnGroup">
        <div class="downloadBtn" @click="showPop()">下载游戏</div>
        <div class="packetBtn" v-if="status === '无订单' || status === '仅下载'" @click="goUpload()">我要领红包</div>
        <div class="packetBtn" v-else-if="status === '未审核'" >已提交,请等待审核</div>
        <div class="packetBtn" v-else-if="status === '审核通过'" @click="goHome()">任务完成,去贝好赚领钱</div>
        <div class="packetBtn" v-else-if="status === '审核不通过'" @click="goUpload()">未通过审核,重新上传</div>
      </div>
      <div class="mask" v-show="showPopBox"></div>
      <div class="popBox"  v-show="showPopBox">
        <div class="popTitle">下载说明</div>
        <div class="popCon">
          1.	您即将前往游戏下载页面，下载游戏后请不要忘记<span class="redColor">打开游戏截屏</span>哦<br>
          2.	关闭页面后请通过<span class="redColor">贝好赚公众号</span>重新进入活动页面<br>
          3.	点击<span class="redColor">“二重礼"</span>我要抢红包<br>
          4.	进入页面点击<span class="redColor">“我要领红包”</span>上传截图<br>
        </div>
        <div class="popBtn"  @click="closePop()" v-show="show">关闭</div>
        <div class="popBtn disabled" v-show="!show">关闭({{count}}s）</div>

      </div>
    </div>
</template>

<script>
  import GIFT from 'gift/service/gift-service.js'
    export default {
      name: "GameDetail",
      data(){
        return{
          qrcode:require('../../assets/qrcode.png'),
          timer: null,
          count: null,
          show: true,
          showPopBox:false,
          status:'',
          imgUrl:'/static/bannerImg/banner1.jpeg'
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
        showPop(){
          this.showPopBox = true;
          this.getCode();
          GIFT.setDownload()
            .then(res => {})
        },
        getCode() {
          let _this = this;
          _this.show = false;
          const TIME_COUNT = 5;
          if (!_this.timer) {
            _this.count = TIME_COUNT;
            _this.show = false;
            _this.timer = setInterval(() => {
              if (_this.count > 0 && _this.count <= TIME_COUNT) {
                _this.count--;
              } else {
                _this.show = true;
                clearInterval(_this.timer);
                _this.timer = null;
              }
            }, 1000)
          }
        },
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
        },
        closePop(){
          this.showPopBox = false;
          window.open('https://pic.3669yx.com/channel/9EE745081D671FED/index.html','_self');
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
    width: 310*2px;
    margin: auto;
    color: #6B3808;
    line-height: 45px;
  }
  .fistTips{
    margin-top: 150px;
  }
  .bannerCon{
    width: 280*2px;
    height: 125*2px;
    background: red;
    margin: 2px auto;
  }
  .qrcodeCon{
    width: 100*2px;
    height: 100*2px;
    background: #ccc;
    margin: auto;
    margin-top: 10px;
  }
  .imgCon{
    width: 100%;
    height: 100%;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
    z-index: 99;
    position: absolute;
    top: 0;
    left: 0;
  }
  .popBox{
    width: 294*2px;
    height: 300*2px;
    background: #fff;
    border-radius: 12px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 999;
  }
  .popTitle{
    width: 161*2px;
    height: 40px;
    margin: 32px auto 0 auto;
    color: #333333;
    font-size: 28px;
    line-height: 40px;
    font-weight:600;
    text-align: center;
  }
  .popCon{
    height: 190*2px;
    padding: 24px 50px;
    color: #333;
    opacity: .5;
    font-size: 26px;
    overflow-y: auto;
    line-height: 50px;
  }
  .popBtn{
    height: 48*2px;
    line-height: 48*2px;
    text-align: center;
    margin: auto;
    font-size: 28px;
    color: #333;
    border-top: 2px solid #F4F4F4;
  }
  .disabled{
    color: #ccc;
  }
  .redColor{
    color: red;
  }
</style>
