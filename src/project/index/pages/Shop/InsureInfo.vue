<template>
  <div class="insureInfoCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">投保人信息</div>
    <div class="infoCon">
      <div class="inputItem">
        <input type="text" v-model="realName" placeholder="姓名">
      </div>
      <div class="inputItem">
        <input type="text" v-model="IDNumber" placeholder="身份证号">
      </div>
      <div class="inputItem">
        <div class="smInput">
          <input type="text" placeholder="所在地区" v-model="area" readonly @click="openAreaCon()">
        </div>
        <div class="rightIcon"></div>
      </div>
      <div class="inputItem">
        <input type="text" v-model="detailAddress" placeholder="详细地址" v-on:input ="showBtn()">
      </div>
    </div>
    <div class="tipsCon">
      <div class="tipIcon"></div>
      <div class="tips">请填写真实的投保人信息，若因为填写错误导致的兑换失败，概不赔偿哦！</div>
    </div>
    <div class="submitBtn"  :class="{ 'canClick': canClick }" @click="makeOrder()">
      提交
    </div>
    <div class="areaCon" v-show="showAreaCon">
        <van-area :area-list="areaList" :columns-num="3" @confirm="confirm"  @cancel="cancel"/>
    </div>
  </div>
</template>

<script>
  import AddressInfo from 'index/utils/area';
  import SHOP from 'index/service/shop-service.js'
    export default {
      name: "InsureInfo",
      data() {
        return {
          uuid:'',
          areaList : AddressInfo,
          area : '',
          showAreaCon : false,
          showGenderCon : false,
          realName : '',
          IDNumber : '',
          detailAddress : '',
          insuranceLink:'',
          canClick:false
        }
      },
      created(){
        this.uuid = this.$route.query.uuid;
        this.insuranceLink = this.$route.query.insuranceLink;
      },
      methods:{
        //点击区域确认按钮
        confirm: function (data) {
          this.showAreaCon = false;
          let areaName = [];
          for (let i=0;i<data.length;i++){
            areaName.push(data[i].name)
          }
          this.area = areaName.join('/')
        },
        //点击区取消按钮
        cancel : function(){
          this.showAreaCon = false;
        },
        //显示地区选择区域
        openAreaCon : function () {
          this.showAreaCon = true;
        },
        showBtn(){
          this.canClick = true
        },
        //填写投保人信息后点击提交按钮
        makeOrder(){
          let that = this;
          let data = {
            "goodUUid":this.uuid,
            "additionalInformation":{
              "name":"play"
            },
            "realName":this.realName,
            "IDNumber":this.IDNumber,
            "address":this.area,
            "detailAddress":this.detailAddress
          };
          SHOP.makeOrder(data)
            .then(res => {
              // console.log('res', res);
              if (res.code === "0") {
                that.$router.push({
                  path: '/success',
                  name:'Success',
                  query:{
                    uuid:this.uuid,
                    insuranceLink:this.insuranceLink,
                    redeemCode:res.data.redeemCode
                  }
                })
              }
            })
        },
      }
    }
</script>

<style lang="less" scoped>
  .insureInfoCon{
    width: 100%;
    height: 100%;
    overflow: auto;
    background: #313340;
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
    width: 100%;
    height: 48px;
    margin:auto;
    padding-top: 24px;
    font-size: 17*2px;
    line-height: 48px;
    text-align: center;
  }
  .infoCon{
    width: 100%;
    margin-top: 20px;
    background: #282A37;
  }
  .inputItem{
    /*width: 100%;*/
    height: 48*2px;
    border-bottom: 2px solid #21232F;
    margin-left: 24px;
  }
  .inputItem input{
    height: 48*2px;
  }
  .smInput{
    width: 330*2px;
    float: left;
  }
  .rightIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/right");
    float: right;
    margin-right: 24px;
    margin-top: 18*2px;
  }
  .tipsCon{
    width: 351*2px;
    height: 36*2px;
    margin: auto;
    margin-top: 32px;
  }
  .tipIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/shop/tips");
    float: left;
    margin-top: 4px;
  }
  .tips{
    width: 335*2px;
    height: 36*2px;
    line-height: 18*2px;
    opacity: .6;
    float: right;
    margin-left: 8px;
  }
  .submitBtn{
    width: 320*2px;
    height: 48*2px;
    margin:auto;
    margin-top: 32*2px;
    line-height: 48*2px;
    text-align: center;
    background:linear-gradient(270deg,rgba(240,220,182,1) 0%,rgba(221,182,127,1) 100%);
    opacity:0.2;
    font-size: 18*2px;
    border-radius: 48px;
    color: #fff;
  }
  .areaCon{
    width: 100%;
    height: 242*2px;
    position: absolute;
    bottom: 0;
  }
  .canClick{
    opacity: 1;
  }

</style>
