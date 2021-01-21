<template>
  <div class="taskCon" ref="conBox">
    <div class="taskTitleTop"></div>
    <div class="swiperCon">
      <swiper class="swiper" :options="swiperOption" ref="mySwiper">
        <swiper-slide  v-for="item in imgList" :key="item.id">
          <img class="imgCon" v-bind:src="item.carouselUrl" @click="goAdPage(item.source,item.uuid)">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
    </div>

    <div class="bannerCon">
      <div class="bannerItem">
        <div class="bannerSmItem daily" @click="goPage()">
          <div class="bannerSmCount">{{dailyTotalCount - dailyCount}}/{{dailyTotalCount}}</div>
        </div>
        <div class="bannerSmItem advance"  @click="goPage()">
          <div class="bannerSmCount">{{weekTotalCount-weekCount}}/{{weekTotalCount}}</div>
        </div>
      </div>
    </div>
    <!--任务列表-->
    <div class="taskListCon">
      <div class="taskTitle">
        <div class="taskTitleImg"></div>
      </div>
      <div class="taskList">
        <div class="listItem" v-for="item in taskList" :key="item.index">
          <div class="listImg" :style="{height: item.height/75 + 'rem'}">
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
  </div>

</template>
<script>
  import TASK from 'index/service/task-service.js'
  import AD from 'index/service/ad-service.js'
  export default {
    name: 'Task',
    data(){
      return {
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
          speed: 800
        },
        imgList:[],
        taskList:[],
        weekCount:'',
        dailyCount:'',
        weekTotalCount:'',
        dailyTotalCount:'',
        scroll:''
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    activated() {
      this.$refs.conBox.scrollTop = this.scroll
    },
    created(){
      this.getTaskProccess();  //获取任务进度
      this.getAdByPosition();  //查询广告信息
      this.getTaskList();  //获取任务列表
    },
    methods:{
      //根据广告位置查询广告图片及来源
      getAdByPosition(){
        let data = {
          'positionName' : '任务banner'
        }
        AD.getAdByPosition(data)
          .then(res => {
            // console.log('res',res);
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
            // console.log('res',res);
            if(res.code === "0"){
              this.taskList = res.data;
            }
          })
      },
      //获取任务进度
      getTaskProccess(){
        TASK.getWeeklyMissionProcessing()
          .then(res => {
            // console.log('res11',res);
            if(res.code === "0"){
              this.weekTotalCount = res.count;
              let weekTotalCountArray = []
              for(let i=0;i<res.data.length;i++){
                if(!res.data[i].completed){
                  weekTotalCountArray.push(res.data[i])
                }
              }
              this.weekCount = weekTotalCountArray.length;
            }
          });

        TASK.getDailyMissionProcessing()
          .then(res => {
            // console.log('res22',res);
            if(res.code === "0"){
              this.dailyTotalCount = res.count;
              let dailyTotalCountArray = []
              for(let i=0;i<res.data.length;i++){
                if(!res.data[i].completed){
                  dailyTotalCountArray.push(res.data[i])
                }
              }
              this.dailyCount = dailyTotalCountArray.length;
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
      //跳转到我的任务页面
      goPage(){
        this.$router.push({
          path: '/myTask',
          name:'MyTask'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .taskCon{
    height: 90%;
    /*height: 100%;*/
    /*padding-bottom: 300px;*/
    overflow: auto;
  }
  .taskTitleTop{
    width: 240px;
    height: 120px;
    margin-left: 24px;
    .bg-image("~index/assets/task/taskTitle");
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
  .bannerCon{
    width: 351*2px;
    margin: auto;
    margin-top: 32px;
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
  .bannerSmCount{
    width: 55*2px;
    height: 32*2px;
    position: absolute;
    right: 21*2px;
    top: 12*2px;
    font-size: 40px;
    color: #F2D2A6;
    text-align: right;
    line-height: 32*2px;
  }
  .daily{
    width: 172*2px;
    height: 160px;
    float: left;
    position: relative;
    .bg-image("~index/assets/task/daily");
  }
  .advance{
    width: 172*2px;
    height: 160px;
    float: right;
    position: relative;
    .bg-image("~index/assets/task/advance");
  }
  .taskListCon{
    width: 100%;
    /*height: 1000px;*/
    margin-top: 16*2px;
    background:linear-gradient(180deg,rgba(40,42,55,1) 0%,rgba(49,51,64,1) 100%);
  }
  .taskTitle{
    width: 138*3px;
    /*height: 80px;*/
    margin: auto;
    padding-top: 20px;
    padding-bottom: 40px;
  }
  .taskTitleImg{
    width: 138*3px;
    height: 80px;
    .bg-image("~index/assets/home/taskList");
    background-size: contain;
    background-position: center;
  }
  .taskList{
    width: 351*2px;
    margin: auto;
    margin-bottom: 300px;
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
  .imgCon{
    width: 100%;
    height: 100%;
  }
</style>
