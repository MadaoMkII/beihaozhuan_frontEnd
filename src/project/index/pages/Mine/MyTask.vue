<template>
    <div class="myTaskCon">
      <div class="backIcon" @click="prev()"></div>
      <div class="bg"></div>
      <div class="taskCon">
        <div class="taskTitleCon">
          <div class="taskTitle">新手任务</div>
          <div class="smTaskTitle">新人福利 只限一次哦！</div>
          <div class="smTaskTitle hideBtnRight" @click="boxshowNew = !boxshowNew">{{!boxshowNew ? '点击展开' : '点击收起'}}</div>
        </div>
<!--        <transition name="router-slid">-->
          <div class="taskItem" v-for="item in PermanentList"  v-show="boxshowNew">
            <div class="taskImg">
              <img class="imgCon" v-bind:src="item.missionID.imgUrl">
            </div>
            <div class="infoCon">
              <div class="taskTitleItem">
                {{item.missionID.title}} {{item.recentAmount}}/{{item.requireAmount}}
              </div>
              <div class="coinIcon"></div>
              <div class="coinText">+{{item.missionID.reward}}金币</div>
              <div class="taskBtn" v-if="item.recentAmount < item.requireAmount" @click="doTask(item.missionID.title)">做任务</div>
              <div class="taskBtn" v-else-if="item.recentAmount >= item.requireAmount && !item.completed" @click="completeMission(item.missionID.missionType,item.missionEventName)">交任务</div>
              <div class="taskBtn completeTaskBtn" v-else-if="item.completed">已完成</div>
            </div>
          </div>
<!--        </transition>-->
      </div>
      <div class="taskCon normalCon">
        <div class="taskTitleCon">
          <div class="taskTitle">每日任务</div>
          <div class="smTaskTitle">每日金币赚不停</div>
          <div class="smTaskTitle hideBtnRight" @click="boxshowDaily = !boxshowDaily">{{!boxshowDaily ? '点击展开' : '点击收起'}}</div>
        </div>
        <div class="taskItem" v-for="item in DailyList" v-show="boxshowDaily">
          <div class="taskImg sign">
            <img class="imgCon" v-bind:src="item.missionID.imgUrl">
          </div>
          <div class="infoCon">
            <div class="taskTitleItem">
              {{item.missionID.title}}  {{item.recentAmount}}/{{item.requireAmount}}
            </div>
            <div class="coinIcon"></div>
            <div class="coinText">+{{item.missionID.reward}}金币</div>

            <div class="taskBtn" v-if="item.recentAmount < item.requireAmount" @click="doTask(item.missionID.title)">做任务</div>
            <div class="taskBtn" v-else-if="item.recentAmount >= item.requireAmount && !item.completed" @click="completeMission(item.missionID.missionType,item.missionEventName)">交任务</div>
            <div class="taskBtn completeTaskBtn" v-else-if="item.completed">已完成</div>
          </div>
        </div>
      </div>
      <div class="taskCon normalCon">
        <div class="taskTitleCon">
          <div class="taskTitle">进阶任务</div>
          <div class="smTaskTitle">更多金币等你来拿</div>
          <div class="smTaskTitle hideBtnRight" @click="boxshowWeek = !boxshowWeek">{{!boxshowWeek ? '点击展开' : '点击收起'}}</div>
        </div>
        <div class="taskItem" v-for="item in WeeklyList"  v-show="boxshowWeek">
          <div class="taskImg info1">
            <img class="imgCon" v-bind:src="item.missionID.imgUrl">
          </div>
          <div class="infoCon">
            <div class="taskTitleItem">
              {{item.missionID.title}}  {{item.recentAmount}}/{{item.requireAmount}}
            </div>
            <div class="coinIcon"></div>
            <div class="coinText">+{{item.missionID.reward}}金币</div>
            <div class="taskBtn" v-if="item.recentAmount < item.requireAmount" @click="doTask(item.missionID.title)">做任务</div>
            <div class="taskBtn" v-else-if="item.recentAmount >= item.requireAmount && !item.completed" @click="completeMission(item.missionID.missionType,item.missionEventName)">交任务</div>
            <div class="taskBtn completeTaskBtn" v-else-if="item.completed">已完成</div>
          </div>
        </div>
      </div>


      <!-- 晒收入-->
      <div v-if="showIncomePoster" @click="hidePosterPop()">
        <INCOMEPOSTER></INCOMEPOSTER>
      </div>
      <!--    邀请好友-->
      <div v-if="showInvitePoster" @click="hidePosterPop()">
        <INVITEPOSTER></INVITEPOSTER>
      </div>



    </div>
</template>

<script>
    import TASK from 'index/service/task-service.js'
    import INCOMEPOSTER from 'index/pages/poster/IncomePoster.vue'
    import INVITEPOSTER from 'index/pages/poster/InvitePoster.vue'
    export default {
      name: "MyTask",
      data(){
        return{
          boxshowNew:true,
          boxshowDaily:true,
          boxshowWeek:true,
          PermanentList:[],
          DailyList : [],
          WeeklyList : [],
          showInvitePoster:false,
          showIncomePoster:false
        }
      },
      components:{
        INCOMEPOSTER,INVITEPOSTER
      },
      created(){
        this.getMyTask();
      },
      methods:{
        //获取我的任务
        getMyTask(){
          //获取新手任务
          TASK.getUserPermanentMissionProcessing()
            .then(res => {
              // console.log('新手任务', res);
              if (res.code === "0") {
                let array = [];
                let newArray = [];
                this.PermanentList = res.data;
                for(let i=0;i<res.data.length;i++){
                  if(res.data[i].completed){
                    array.push(res.data[i])
                  }
                  // if(res.data[i].missionEventName !== '活动—双十二邀请好友得现金'){
                  //   newArray.push(res.data[i])
                  // }
                }
                console.log('array',array);

                if(array.length === res.count){
                  this.boxshowNew = false;
                }else {
                  this.boxshowNew = true;
                }
              }
            })
          //获取周任务
          TASK.getUserWeeklyMissionProcessing()
            .then(res => {
              // console.log('周任务', res);
              if (res.code === "0") {
                this.WeeklyList = res.data;
                let array = []
                for(let i=0;i<res.data.length;i++){
                  if(res.data[i].completed){
                    array.push(res.data[i])
                  }
                }
                if(array.length === res.count){
                  this.boxshowWeek = false;
                }else {
                  this.boxshowWeek = true;
                }
              }
            })
          //获取每日任务
          TASK.getUserDailyMissionProcessing()
            .then(res => {
              // console.log('日常任务', res);
              if (res.code === "0") {
                this.DailyList = res.data;
                let array = []
                for(let i=0;i<res.data.length;i++){
                  if(res.data[i].completed){
                    array.push(res.data[i])
                  }
                }
                if(array.length === res.count){
                  this.boxshowDaily = false;
                }else {
                  this.boxshowDaily = true;
                }
              }
            })
        },
        //交任务
        completeMission(modelName,missionEventName){
          let data = {
            "modelName" :modelName,
            "missionEventName" :missionEventName
          };
          TASK.completeMission(data)
            .then(res => {
              // console.log('交任务', res);
                this.getMyTask();
            })
        },
        //做任务
        doTask(title){
          // console.log('点击了做任务按钮')
          let type = '';
          if(title === '完善用户信息'){
            type = 'CompletInfo'
          }else if(title === '看一个广告'){
            type = 'Task'
           // TASK.checkAD(title)
           //   .then(res => {
           //     // console.log('日常任务', res);
           //   })
          }else if(title === '首次提现'){
            type = 'Apply'
          }else if(title === '每周看广告' || title === '每日看广告' || title === '看一些广告' || title === '每日看广告_高级'){
            type = 'Task'
          }else if(title === '新手教程1—注册与登陆' || title === '新手教程2—快速上手' || title === '新手教程3—任务介绍' || title === '新手教程4—注意事项'){
            let data = {
              'missionName':title
            };
            TASK.finishMission(data)
              .then(res => {
                if (res.code === "0") {
                  this.getMyTask();
                }
              })
            type = 'Video'
          }
          else if(title === '每日签到' || title === '每周签到'){
            TASK.signInReal()
              .then(res => {
                if (res.code === "0") {
                  this.getMyTask();
                }
              })
          }else if(title === '每日晒收入'){
            // console.log('在当前页面以弹窗形式显示')
            this.showPosterPop('showIncomePoster');
            TASK.howMyMoney()
              .then(res => {
                // console.log('交任务', res);
                if (res.code === "0") {
                  this.getMyTask();
                }
              })

          }else if(title === '每日邀新人' || title === '每周邀新人' || title === '活动—双十二邀请好友得现金'){
            // console.log('跳转到邀请新人页面，进行分享')
            this.showPosterPop('showInvitePoster');
          }
          this.$router.push({
            name:type,
            query:{
              title:title
            }
          })
        },
        //打开海报
        showPosterPop(posterType){
          if(posterType ===  'showInvitePoster'){
            this.showInvitePoster = true;
          }else if(posterType ===  'showIncomePoster'){
            this.showIncomePoster = true;
          }
        },
        //关闭海报
        hidePosterPop(){
          this.showIncomePoster = false;
          this.showInvitePoster = false;
        }
      }
    }
</script>

<style lang="less" scoped>
  .myTaskCon{
    width: 100%;
    height: 100%;
    background: #313340;
    padding-bottom: 300px;
    overflow: auto;
  }
  .backIcon{
    width: 48px;
    height: 48px;
    position: absolute;
    top: 26px;
    left: 24px;
    .bg-image("~index/assets/back");
  }
  .bg{
    width: 100%;
    height: 160*2px;
    .bg-image("~index/assets/mine/myTask/bg");
    background-position: 0px -36px;
  }
  .taskCon{
    width: 351*2px;
    background: #282A37;
    border-radius: 16px;
    margin: auto;
    margin-top: -28*2px;
    margin-bottom: 32px;
  }
  .taskTitleCon{
    height: 48*2px;
    margin-left: 24px;
  }
  .taskTitle{
    /*width: 160px;*/
    height: 48*2px;
    line-height: 48*2px;
    font-size: 40px;
    font-weight:600;
    float: left;
  }
  .smTaskTitle{
    /*<!--width: 138*2px;-->*/
    height: 48*2px;
    line-height: 48*2px;
    margin-left: 16px;
    opacity: .6;
    float: left;
  }
  .taskItem{
    width: 327*2px;
    height: 80*2px;
    margin: auto;
  }
  .taskImg{
    width: 48*2px;
    height: 48*2px;
    .bg-image("~index/assets/mine/myTask/info");
    margin-top: 30px;
    float: left;
  }
  .infoCon{
    width: 271*2px;
    height: 78*2px;
    border-bottom: 2px solid #21232F;
    float: left;
    margin-left: 16px;
    position: relative;
  }
  .taskTitleItem{
    width: 80%;
    height: 48px;
    line-height: 48px;
    font-size: 30px;
    margin-top: 30px;
    overflow: hidden;
  }
  .coinIcon{
    width: 40px;
    height: 40px;
    margin-top: 4px;
    .bg-image("~index/assets/mine/coin");
    float: left;
  }
  .coinText{
    height: 48px;
    line-height: 48px;
    font-size: 28px;
    color: rgba(255, 255, 255, 0.8);
    float: left;
  }
  .taskBtn{
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
    top: 27*2px;
  }
  .completeTaskBtn{
    background: transparent;
    border: 2px solid #fff;
    opacity: .4;
  }
  .cash{
    .bg-image("~index/assets/mine/myTask/cash");
  }
  .poster{
    .bg-image("~index/assets/mine/myTask/poster");
  }
  .time{
    .bg-image("~index/assets/mine/myTask/time");
  }
  .normalCon{
    margin-top: 32px;
  }
  .sign{
    .bg-image("~index/assets/mine/myTask/sign");
  }
  .video{
    .bg-image("~index/assets/mine/myTask/video");
  }
  .poster1{
    .bg-image("~index/assets/mine/myTask/poster1");
  }
  .income{
    .bg-image("~index/assets/mine/myTask/income");
  }
  .newUser{
    .bg-image("~index/assets/mine/myTask/newUser");
  }
  .info1{
    .bg-image("~index/assets/mine/myTask/info1");
  }
  .sign1{
    .bg-image("~index/assets/mine/myTask/sign1");
  }
  .time1{
    .bg-image("~index/assets/mine/myTask/time1");
  }
  .imgCon{
    width: 100%;
    height: 100%;
  }
  .hideBtnRight{
    float: right;
    margin-right: 20px;
  }
  .router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
    transform: translate3d(0, 3rem, 0);
    opacity: 0;
  }

</style>
