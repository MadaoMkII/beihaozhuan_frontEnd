<template>
  <!--邀请好友-->
  <div>
    <div class="mask"></div>
    <div class="posterBox">

      <div id="posterHtml" ref="posterHtml" v-show="showPosterImg">
        <img id="bgImg" class="imgCon" src="../../assets/poster/invitePoster1.png" alt="">
<!--        <div class="posterCon">-->
<!--          <div class="posterItem">您的朋友 {{phone}} 邀请您</div>-->
<!--          <div class="posterItem">贝好赚送您现金红包已到账</div>-->
<!--        </div>-->
        <!-- 二维码 -->
        <div class="qrcode"><div id="qrcodeImg"></div></div>
      </div>
      <div class="posterImgCon">
        <img class="posterImg" :src="posterImg" alt="">
      </div>
      <div class="posterTips">
        长按图片保存至手机
      </div>
    </div>
  </div>
</template>

<script>
  import MineInfo from 'index/service/mine-service.js'
  import QRCode from 'qrcodejs2'
  import html2canvas from 'html2canvas'
    export default {
      name: "InvitePoster",
      data(){
        return{
          phone:'',
          showPosterImg:true,
          posterImg: '', // 最终生成的海报图片
        }
      },
      mounted(){
        let that = this;
        document.getElementById("bgImg").onload = function () {
          that.getUserPhone();
        }
      },
      methods:{
        //获取当前用户的手机号
        getUserPhone(){
          MineInfo.getUserInfo()
            .then(res => {
              console.log('res',res)
              if(res.code === '0'){
                this.phone = res.data.tel_number
                this.inviteLink(); //获取邀请链接
              }
            });
        },
        //获取邀请链接
        inviteLink(){
          MineInfo.inviteLink()
            .then(res => {
              console.log('res',res);
              if(res.code == 0){
                let url = res.data;
                this.createQrcode(url);
              }
            })
        },
        createQrcode(text) {
          // 生成二维码
          const qrcodeImgEl = document.getElementById('qrcodeImg')
          qrcodeImgEl.innerHTML = ''
          const width = parseInt(window.getComputedStyle(qrcodeImgEl).width)
          const height = parseInt(window.getComputedStyle(qrcodeImgEl).height)
          let qrcode = new QRCode(qrcodeImgEl, {
            width: width,
            height: height,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
          })
          qrcode.makeCode(text)
          this.createPoster();
        },

        createPoster() {
          // 生成海报
          // 手动创建一个 canvas 标签
          const canvas = document.createElement("canvas")
          console.log('canvas',canvas);
          // 获取父标签，意思是这个标签内的 DOM 元素生成图片
          let canvasBox = this.$refs.posterHtml
          // 获取父级的宽高
          const width = parseInt(window.getComputedStyle(canvasBox).width)
          const height = parseInt(window.getComputedStyle(canvasBox).height)

          console.log('width',width);
          console.log('height',height);
          canvas.width = width * 4;
          canvas.height = height * 4;
          canvas.style.width = width + 'px';
          canvas.style.height = height + 'px';

          console.log('canvaswidth',canvas.width);
          console.log('canvasheight',canvas.height);

          const context = canvas.getContext("2d");
          context.scale(4, 4);

          const options = {
            backgroundColor: null,
            canvas: canvas,
            useCORS: true
          }
          html2canvas(canvasBox, options).then((canvas) => {
            // toDataURL 图片格式转成 base64
            let dataURL = canvas.toDataURL("image/png")
            this.posterImg = dataURL;
            // console.log('dataURL',dataURL)
          })
        }
      }
    }
</script>

<style lang="less" scoped>
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
  .posterBox{
    width: 280 * 2px;
    height: 540 * 2px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    border: 10px solid #fff;
    z-index: 99;
  }
  #posterHtml{
    width: 280 * 2px;
    height: 500 * 2px;
    z-index: 9;
    /*background:url("~index/assets/poster/invitePoster.png") no-repeat;*/
    /*<!--background-size:280*2px 500*2px;-->*/
    position: absolute;
  }
  .posterTips{
    width: 100%;
    height: 65px;
    position: absolute;
    bottom: 0;
    color: #999;
    font-size: 30px;
    text-align: center;
    line-height: 65px;
    z-index: 99;
  }
  .posterImgCon{
    width: 280 * 2px;
    height: 500 * 2px;
    z-index: 999999;
    position: absolute;
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*margin: auto;*/
  }
  .imgCon{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .posterImg{
    width: 100%;
    height: 100%;
    z-index: 999999;
  }
  .qrcode{
    width: 160px;
    height: 160px;
    /*background: orange;*/
    margin-top: 225px;
    margin-left: 72px;
    z-index: 9999;
    position: absolute;
    bottom: 46px;
  }
  #qrcodeImg{
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
  .posterCon{
    width: 440px;
    height: 120px;
    position: absolute;
    margin: auto;
    margin-top: 450px;
    margin-left: 75px;
    z-index: 9999;
  }
  .posterItem{
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #ECD8A5;
    font-size: 30px;
    z-index: 9999;
  }
</style>
