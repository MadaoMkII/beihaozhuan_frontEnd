<template>
  <div style="height: 100%;overflow-y: hidden">
      <div class="bannerAdCon" v-if="title === '新手任务—一元攻略'" style="height: 100%;overflow-y: hidden">
        <div class="closeBtn" @click="prev()" v-show="closeShow">X</div>
        <iframe frameborder="0" width="100%" src="https://v.qq.com/txp/iframe/player.html?vid=i3007peh5hm" allowFullScreen="true"></iframe>
      </div>
      <div class="bannerAdCon" v-else-if="title === '新手教程2—快速上手'" style="height: 100%;overflow-y: hidden">
      <div class="closeBtn" @click="prev()">X</div>
      <iframe frameborder="0" width="100%" src="https://v.qq.com/txp/iframe/player.html?vid=m3007l4evmo" allowFullScreen="true"></iframe>
      </div>
    <div class="bannerAdCon" v-else-if="title === '新手教程3—任务介绍'" style="height: 100%;overflow-y: hidden">
      <div class="closeBtn" @click="prev()">X</div>
      <iframe frameborder="0" width="100%" src="https://v.qq.com/txp/iframe/player.html?vid=c3007k8ywbn" allowFullScreen="true"></iframe>
    </div>
    <div class="bannerAdCon" v-else-if="title === '新手教程4—注意事项'" style="height: 100%;overflow-y: hidden">
      <div class="closeBtn" @click="prev()">X</div>
      <iframe frameborder="0" width="100%" src="https://v.qq.com/txp/iframe/player.html?vid=c3007a5ipum" allowFullScreen="true"></iframe>
    </div>

  </div>
</template>

<script>
    export default {
        name: "Video",
      data(){
          return{
            title:'',
            closeShow:false,
          }
      },
      created() {
          this.title = this.$route.query.title;
          // this.title = '新手教程2—快速上手'
          let self = this;
          setTimeout(function(){
            self.closeShow = true;
          },15000)
      }
    }
</script>

<style lang="less" scoped>
  .bannerAdCon{
    margin-top: 395px;
  }
  .closeBtn{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    top: 10px;
    right: 10px;
    border: 2px solid #fff;
    line-height: 40px;
    text-align: center;
    z-index: 99;
  }
</style>
