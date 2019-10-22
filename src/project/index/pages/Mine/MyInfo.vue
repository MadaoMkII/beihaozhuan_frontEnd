<template>
  <div class="myInfoCon">
    <div class="backIcon" @click="prev()"></div>
    <div class="title">个人信息</div>
    <div class="infoCon">
      <div class="infoItem headItem">
        <div class="infoTitle headTitle">头像</div>
        <div class="rightIcon headRightIcon"></div>
        <div class="headImg" :style="{backgroundImage:'url('+avatar+')'}"></div>
        <input type="file" id="logimg"  ref="file" accept="image/*"  @change="onRead" />
      </div>
      <div class="infoItem" @click="goUpdateNickname()">
        <div class="infoTitle">昵称</div>
        <div class="rightIcon"></div>
        <div class="text">{{nickName}}</div>
      </div>
      <div class="infoItem" @click="showSelectCon('gender')">
        <div class="infoTitle">性别</div>
        <div class="rightIcon"></div>
        <div class="text">{{gender}}</div>
      </div>
      <div class="infoItem" @click="showDate()">
        <div class="infoTitle">生日</div>
        <div class="rightIcon"></div>
        <div class="text">{{birth}}</div>
      </div>
      <div class="infoItem" @click="openAreaCon()">
        <div class="infoTitle">地区</div>
        <div class="rightIcon"></div>
        <div class="text">{{area}}</div>
      </div>
    </div>
    <div class="more">更多</div>
    <div class="infoCon moreInfoCon">
      <div class="infoItem" @click="showSelectCon('job')">
        <div class="infoTitle">职业</div>
        <div class="rightIcon"></div>
        <div class="text">{{job}}</div>
      </div>
      <div class="infoItem" @click="showSelectCon('educate')">
        <div class="infoTitle">教育经历</div>
        <div class="rightIcon"></div>
        <div class="text">{{educate}}</div>
      </div>
    </div>
    <div class="areaCon" v-show="showBirthCon">
      <van-datetime-picker type="date" @cancel="onCancel" @confirm="onConfirm" :min-date="minDate"/>
    </div>
    <div class="areaCon" v-show="showAreaCon">
      <van-area :area-list="areaList" :columns-num="3" @confirm="confirm"  @cancel="cancel"/>
    </div>
    <div class="genderCon" v-show="showGenderCon">
      <van-picker show-toolbar title="" :columns="genderList" @cancel="onCancel" @confirm="onConfirm"/>
    </div>
    <div class="genderCon" v-show="showJobCon">
      <van-picker show-toolbar title="" :columns="jobList" @cancel="onCancel" @confirm="onConfirm"/>
    </div>
    <div class="genderCon" v-show="showEducateCon">
      <van-picker show-toolbar title="" :columns="educateList" @cancel="onCancel" @confirm="onConfirm"/>
    </div>
    <div class="logoutBtn" @click="logout()">退出登录</div>
  </div>
</template>

<script>
  import AddressInfo from 'index/utils/area';
  import MineInfo from 'index/service/mine-service.js'
  import API from 'index/service/login-service.js'
    export default {
      name: "MyInfo",
      data(){
        return{
          genderList: ['男', '女'],
          jobList : ['教师','工人','记者','演员','厨师','医生','护士','司机','军人','律师','工程师','会计','互联网从业者','其他'],
          educateList : ['小学','初中','高中','本科','硕士','博士','其他'],
          address : '',
          birth: '',
          gender : '',
          job:'',
          educate:'',
          showBirthCon : false,
          showGenderCon:false,
          showJobCon : false,
          showEducateCon : false,
          areaList : AddressInfo,
          area : '',
          showAreaCon : false,
          avatar : require('../../assets/mine/headImg@2x.png'),
          nickName : '',
          showAvatar:'',
          minDate: new Date(1900, 1, 1),
        }
      },
      created(){
        MineInfo.getUserInfo()
          .then(res => {
            console.log('res',res)
            if(res.code === '0'){
              let gender = res.data.gender;
              if(gender === 'male'){
                this.gender = '女';
              }else if(gender === 'man'){
                this.gender = '男';
              }else {
                this.gender = '';
              }
              this.avatar = res.data.avatar;
              this.nickName = res.data.nickName;
              this.birth = res.data.birthday;
              this.educate = res.data.educationLevel;
              this.job = res.data.job;
            }
          });
      },
      methods:{
        //更新头像
        onRead(){
          this.avatarFile = this.$refs.file.files[0];
          //头像转码显示
          let reader = new FileReader();
          if(this.avatarFile && this.avatarFile != ''){
            reader.readAsDataURL(this.avatarFile);
            reader.onload=()=>{
              this.avatar = reader.result
              this.showAvatar = true
            }
            this.updateMyInfo('avatar',this.avatarFile);
          }
        },
        formatter(type, value) {
          console.log('value',value);
          return value;
        },
        timeFormat(time) { // 时间格式化 2019-09-08
          let year = time.getFullYear();
          let month = time.getMonth() + 1;
          let day = time.getDate();
          month = month < 10 ? '0'+month : month;
          day = day < 10 ? '0'+day : day;
          return year + '-' + month + '-' + day
        },
        showDate(){
          this.onCancel()
          this.showBirthCon = true
        },
        //点击区域确认按钮
        confirm: function (data) {
          this.onCancel()
          let areaName = [];
          for (let i=0;i<data.length;i++){
            areaName.push(data[i].name)
          }
          this.area = areaName.join('/');
          this.updateMyInfo('area',this.area);
        },
        //点击区取消按钮
        cancel : function(){
          this.onCancel()
          this.showAreaCon = false;
        },
        //显示下拉选项区域
        showSelectCon(type){
          if(type === 'gender'){
            this.onCancel();
            this.showGenderCon = true;
          }else if(type === 'job'){
            this.onCancel();
            this.showJobCon = true;
          }else if(type === 'educate'){
            this.onCancel();
            this.showEducateCon = true;
          }
        },
        //显示地区选择区域
        openAreaCon : function () {
          this.onCancel();
          this.showAreaCon = true;
        },
        //点击下拉框中的确定按钮
        onConfirm(value, index) {
          if(this.showGenderCon){
            this.gender = value
            this.updateMyInfo('gender',value)
          }else if(this.showJobCon){
            this.job = value
            this.updateMyInfo('job',value)
          }else if(this.showEducateCon){
            this.educate = value
            this.updateMyInfo('educationLevel',value)
          }else if(this.showBirthCon){
            let val = this.timeFormat(value);
            this.birth = val;
            this.updateMyInfo('birthday',val)
          }
          this.onCancel();
        },
        onCancel() {
          this.showAreaCon = false;
          this.showGenderCon = false;
          this.showJobCon = false;
          this.showEducateCon = false;
          this.showBirthCon = false;
        },
        //更新个人信息（因为该页面没有保存按钮，所以改成动态保存）
        updateMyInfo(name,value){
          console.log('name',name);
          console.log('value',value);

          let formData = new FormData();
          formData.append(name, value);

          MineInfo.updateUserInfo(formData)
            .then(res => {
              console.log('res',res);

            })
        },
        //退出登录
        logout(){
          API.logout()
            .then(res => {
              console.log('res',res)
              if(res.code === '0'){
                this.$router.push({
                  path: '/login',
                  name:'Login'
                })
              }
            });
        },
        //跳转到修改昵称页面
        goUpdateNickname(){
          this.$router.push({
            path: '/updateNickname',
            name:'UpdateNickname',
            query: {
              nickName: this.nickName
            }
          })
        }
      }
    }
</script>

<style lang="less" scoped>
  .myInfoCon{
    width: 100%;
    height: 100%;
    background: #313340;
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
    background: #282A37;
    margin-top: 20px;
  }
  .infoItem{
    height: 48*2px;
    margin-left: 24px;
    border-bottom: 2px solid #21232F;
  }
  .headItem{
    height: 56*2px;
    position: relative;
  }
  .infoTitle{
    width: 128*2px;
    height: 48*2px;
    font-size: 28px;
    line-height: 56*2px;
    float: left;
  }
  .headTitle{
    height: 56*2px;
  }
  .rightIcon{
    width: 24px;
    height: 24px;
    .bg-image("~index/assets/right");
    float: right;
    margin-top: 18*2px;
    margin-right: 24px;
  }
  .headRightIcon{
    margin-top: 44px;
  }
  .headImg{
    width: 80px;
    height: 80px;
    border-radius: 80px;
    border: 2px solid #FFFFFF;
    float: right;
    margin-right: 14px;
    margin-top: 16px;
    .bg-image("~index/assets/right");
    background-size:cover;
  }
  .text{
    height: 48*2px;
    line-height: 48*2px;
    margin-right: 14px;
    opacity: .6;
    font-size: 13*2px;
    text-align: right;
  }
  .more{
    height: 80px;
    line-height: 80px;
    opacity: .6;
    margin-left: 24px;
  }
  .moreInfoCon{
    margin-top: 0px;
  }
  .logoutBtn{
    width: 100%;
    height: 48*2px;
    background: #15161D;
    line-height: 48*2px;
    text-align: center;
    color: #DDB67F;
    font-size: 36px;
    font-weight:600;
    position: fixed;
    bottom: 0px;
  }
  #logimg{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
  }



</style>
