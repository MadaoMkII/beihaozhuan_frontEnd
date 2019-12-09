<template>
  <div>
    <div class="centerTitle">
      系统设置
    </div>
<!--    <div class="systemLabel">-->
<!--      配置用户提现规则-->
<!--    </div>-->
<!--    <div class="formItem">-->
<!--      <div class="label">提现规则：</div>-->
<!--      <div class="input numberInput">-->
<!--        <el-checkbox v-model="checked">按照注册时间</el-checkbox>-->
<!--      </div>-->
<!--      <div class="label smLabel">注册时间：</div>-->
<!--      <div class="input numberInput">-->
<!--        <el-input-number v-model="num" controls-position="right" :min="0"></el-input-number>-->
<!--      </div>-->
<!--      <div class="numberText">天</div>-->
<!--      <div class="systemTips">(必须注册达到此设定时间方可进行余额提现)</div>-->
<!--    </div>-->
<!--    <div class="formItem">-->
<!--      <div class="label"></div>-->
<!--      <div class="input numberInput">-->
<!--        <el-checkbox v-model="checked">按照金币额度</el-checkbox>-->
<!--      </div>-->
<!--      <div class="label smLabel">金币额度：</div>-->
<!--      <div class="input numberInput">-->
<!--        <el-input-number v-model="num" controls-position="right" :min="0"></el-input-number>-->
<!--      </div>-->
<!--      <div class="numberText">金币</div>-->
<!--      <div class="systemTips">(金币达到设定额度方可进行提现)</div>-->
<!--    </div>-->
<!--    <div class="systemLabel">-->
<!--      配置邀新奖励-->
<!--    </div>-->
<!--    <div class="formItem">-->
<!--      <div class="label">每邀请：</div>-->
<!--      <div class="input numberInput">-->
<!--        <el-input-number v-model="inviteMission.numberOfInvite" controls-position="right" :min="0"></el-input-number>-->
<!--      </div>-->
<!--      <div class="numberText">人，</div>-->
<!--      <div class="numberText">奖励</div>-->
<!--      <div class="input numberInput">-->
<!--        <el-input-number v-model="inviteMission.reward" controls-position="right" :min="0"></el-input-number>-->
<!--      </div>-->
<!--      <div class="numberText">金币</div>-->
<!--    </div>-->
<!--    <div class="formItem">-->
<!--      <div class="label">是否开启：</div>-->
<!--      <div class="input">-->
<!--        <el-switch-->
<!--          v-model="inviteMission.activity"-->
<!--          active-color="#1890FF"-->
<!--          inactive-color="rgba(0, 0, 0, 0.25)">-->
<!--        </el-switch>-->
<!--      </div>-->
<!--    </div>-->
    <div class="systemLabel">
      配置注册用户奖励
    </div>
    <div class="formItem">
      <div class="label">注册奖励：</div>
      <div class="input numberInput">
        <el-input-number v-model="registerMission.reward" controls-position="right" :min="0"></el-input-number>
      </div>
      <div class="numberText">金币</div>
    </div>
    <div class="formItem">
      <div class="label">是否开启：</div>
      <div class="input">
        <el-switch
          v-model="registerMission.activity"
          active-color="#1890FF"
          inactive-color="rgba(0, 0, 0, 0.25)">
        </el-switch>
      </div>
    </div>
    <div class="systemLabel">
      配置客服电话
    </div>
    <div class="formItem" v-for="item in phoneList">
      <div class="label">客服电话{{item.index}}：</div>
      <div class="input phoneInput">
        <el-input v-model="item.phone" placeholder="请输入"></el-input>
      </div>
      <div v-if="item.index === phoneList.length && phoneList.length !== 1">
        <div class="phoneBtn minus" @click="removePhoneItem()"></div>
        <div class="phoneBtn plus" @click="addPhoneItem()"></div>
      </div>
      <div v-else-if="phoneList.length === 1">
        <div class="phoneBtn plus" @click="addPhoneItem()"></div>
      </div>
    </div>
    <div class="systemLabel">
      配置注册用户加权值
    </div>
    <div class="formItem">
      <div class="label">加权值：</div>
      <div class="input numberInput">
        <el-input-number v-model="weighting" controls-position="right" :min="0"></el-input-number>
      </div>
    </div>
    <div class="saveCon">
      <el-button type="primary" class="CoBtn" @click="saveSystemSet()">保存</el-button>
    </div>
  </div>
</template>

<script>
  import SYSTEM from 'admin/service/system-service.js'
    export default {
      name: "SystemSet",
      data(){
        return {
          checked: false,
          value: '',
          num:'',
          phoneList:[
            {index:1,phone:''}
          ],
          registerMission:{
            activity : true,
            reward:''
          },
          inviteMission:{
            numberOfInvite:'',
            reward : '',
            activity: true
          },
          weighting: '',
          serviceNumber : ''
        }
      },
      created(){
        this.getSetting();
      },
      methods:{
        //获取系统设置信息
        getSetting(){
          SYSTEM.getSetting()
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                let data = res.data;
                this.registerMission.activity = data.registerMission.activity === 'enable' ? true : false;
                this.registerMission.reward = data.registerMission.reward;
                // this.inviteMission.numberOfInvite = data.inviteMission.numberOfInvite;
                // this.inviteMission.reward = data.inviteMission.reward;
                // this.inviteMission.activity = data.inviteMission.activity  === 'enable' ? true : false;
                this.serviceNumber = data.serviceNumber;
                this.weighting = data.weighting;
                let serviceNumber = [];
                let phoneList = data.serviceNumber.split(",")
                for(let i=0;i<phoneList.length;i++){
                  let item = {
                    'index': i + 1,
                    'phone':phoneList[i]
                  }
                  serviceNumber.push(item);
                }
                this.phoneList = serviceNumber;
              }
            })
        },
        //客服电话增加行
        addPhoneItem(){
          let addPhoneList = this.phoneList;
          let newIndex = addPhoneList.length + 1;
          let newPhoneItem = {
            index: newIndex,phone:''
          };
          addPhoneList.push(newPhoneItem);
        },
        //删除客服电话行
        removePhoneItem(){
          let removePhoneList = this.phoneList;
          removePhoneList.pop();
        },

        //保存系统设置
        saveSystemSet(){
          let registerActivity = this.registerMission.activity;
          // let inviteActivity = this.inviteMission.activity;
          let phoneArray = [];
          for(let i=0;i<this.phoneList.length;i++){
            phoneArray.push(this.phoneList[i].phone)
          }
          let phoneList = phoneArray.join(',');
          console.log('phoneList',phoneList)
          let data = {
            "registerMission": {
              "activity":registerActivity ? 'enable' : 'disable' ,
              "reward": this.registerMission.reward
            },
            // "inviteMission": {
            //   "numberOfInvite": this.inviteMission.numberOfInvite,
            //   "reward": this.inviteMission.reward,
            //   "activity": inviteActivity ? 'enable' : 'disable'
            // },
            "weighting": this.weighting,
            "serviceNumber": phoneList
          };
          SYSTEM.systemSet(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                // this.resetData();
              }
            })
        },
        //重置页面数据
        resetData(){
          let that = this;
          that.registerMission.activity = true;
          that.registerMission.reward = '';
          // that.inviteMission.reward = '';
          // that.inviteMission.activity = true;
          // that.inviteMission.numberOfInvite = '';
          that.weighting = '';
          that.serviceNumber = '';
        }
      }
    }
</script>

<style lang="css" scoped>
  .centerTitle{
    margin-bottom: 23px;
  }
  .formItem{
    margin-bottom: 16px;
  }
  .systemLabel{
    width: 1088px;
    height: 40px;
    margin: auto;
    line-height: 40px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.04);
    border: 1px solid #E8E8E8;
    color: rgba(0, 0, 0, 0.65);
    padding-left: 16px;
    margin-bottom: 24px;
  }
  .smLabel{
    width: 100px;
  }
  .systemTips{
    width: 350px;
    height: 32px;
    line-height: 32px;
    float: left;
    color: rgba(0, 0, 0, 0.45);
    margin-left: 16px;
  }
  .phoneInput{
    width: 464px;
  }
  .phoneBtn{
    width: 32px;
    height: 32px;
    float: left;
    margin-left: 8px;
  }
  .minus{
    background:url(~admin/assets/minus.png) no-repeat;
    background-size:contain;
  }
  .plus{
    background:url(~admin/assets/plus.png) no-repeat;
    background-size:contain;
  }
  .saveCon{
    text-align: center;
  }
</style>
