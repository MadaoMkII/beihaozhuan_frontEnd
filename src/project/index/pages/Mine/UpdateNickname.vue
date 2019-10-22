<template>
  <div class="updateNicknameCon">
    <div class="backIcon" @click="savePrev()"></div>
    <div class="title">修改昵称</div>
    <div class="infoCon">
      <div class="infoItem">
        <input type="text" class="infoInput" placeholder="请输入昵称" v-model="nickName" @blur="fixScroll()">
        <div class="cleanIcon"></div>
      </div>
      <div class="tips">
        请输入2-12个字符
      </div>
    </div>



  </div>
</template>

<script>
  import MineInfo from 'index/service/mine-service.js'
    export default {
      name: "UpdateNickname",
      data(){
        return{
          nickName:''
        }
      },
      created(){
        this.getParams()
      },
      methods : {
        getParams() {
          // 取到路由带过来的参数
          this.nickName = this.$route.query.nickName;
        },
        //点击左上角返回，保存昵称并返回
        savePrev(){
          let formData = new FormData();
          formData.append('nickName', this.nickName);

          MineInfo.updateUserInfo(formData)
            .then(res => {
              // console.log('res',res);

            })
          // this.$router.push({
          //   path: '/myInfo',
          //   name:'MyInfo'
          // })
          this.$router.go(-1)
        }
      },
      watch: {
        '$route': 'getParams'
      }
    }
</script>

<style lang="less" scoped>
  .updateNicknameCon{
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
    height: 48*2px;
    background: #282A37;
    margin-top: 20px;
  }
  .infoItem{
    height: 48*2px;

  }
  .infoInput{
    width: 600px;
    height: 48*2px;
    margin-left: 24px;
    float: left;
  }
  .cleanIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/clean");
    margin-right: 24px;
    margin-top: 36px;
    float: right;
  }
  .tips{
    width: 128*2px;
    height: 32*2px;
    line-height: 32*2px;
    opacity: .6;
    margin-left: 24px;
  }
</style>
