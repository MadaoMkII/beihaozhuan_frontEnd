<template>
  <div>
    <div class="centerCon">
      <div class="centerTitle">
        用户信息
      </div>
      <div class="userImg">
        <img v-bind:src="userInfo.avatar" >
      </div>
      <div class="infoCon">
        <div class="userInfoItem">
          <div class="userLabel">昵称：</div>
          <div class="userText">{{userInfo.nickName}}</div>
        </div>
        <div class="userInfoItem">
          <div class="userLabel">账号：</div>
          <div class="userText">{{userInfo.tel_number}}</div>
        </div>
        <div class="userInfoItem">
          <div class="userLabel">金币余额：</div>
          <div class="userText">{{userInfo.Bcoins}}</div>
        </div>
        <div class="userInfoItem">
          <div class="userLabel">注册时间：</div>
          <div class="userText">{{userInfo.created_at}}</div>
        </div>
        <div class="userInfoItem">
          <div class="userLabel">微信：</div>
          <div class="userText">{{userInfo.hasVerifyWechat}}</div>
        </div>
<!--        <div class="userInfoItem">-->
<!--          <div class="userLabel">OPENID：</div>-->
<!--          <div class="userText">39287289</div>-->
<!--        </div>-->
      </div>
    </div>
    <div class="centerCon userTabsCon">
      <div class="subTabCon thirdTabCon">
        <div class="subTab thirdTab">
          <div class="subTabItem thirdTabItem">
            <router-link :to="{name:'UserOrderList',query:{'uuid':this.uuid}}" exact>
              <div class="subTabText thirdTabText">订单列表</div>
              <div class="subTabItemBorder"></div>
            </router-link>
          </div>
          <div class="subTabItem thirdTabItem">
            <router-link :to="{name:'Account',query:{'uuid':this.uuid}}" exact>
              <div class="subTabText thirdTabText">账户明细</div>
              <div class="subTabItemBorder"></div>
            </router-link>
          </div>
          <div class="subTabItem thirdTabItem">
            <router-link :to="{name:'Invite',query:{'uuid':this.uuid}}" exact>
              <div class="subTabText thirdTabText">邀请列表</div>
              <div class="subTabItemBorder"></div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-if="routerName === 'UserOrderList'">
        <UserOrderList></UserOrderList>
      </div>
      <div v-if="routerName === 'Account'">
        <Account></Account>
      </div>
      <div v-if="routerName === 'Invite'">
        <Invite></Invite>
      </div>
    </div>
  </div>
</template>

<script>
    import UserOrderList from 'admin/pages/User/UserOrderList.vue'
    import Account from 'admin/pages/User/Account.vue'
    import Invite from 'admin/pages/User/Invite.vue'
    import USER from 'admin/service/user-service.js'
    export default {
      name: "UserInfo",
      data(){
        return {
          routerName :false,
          uuid : '',
          userInfo:{
            nickName:'',
            tel_number:'',
            Bcoins:'',
            hasVerifyWechat:'',
            avatar:'~admin/assets/headImg.png',
            created_at:'',
          }
        }
      },
      components: {
        UserOrderList,Account,Invite
      },
      created() {
        this.routerName =this.$route.name;
        this.uuid = this.$route.query.uuid;
        this.getUserInfo();
      },
      //加载用户基本信息
      methods:{
        getUserInfo(){
          let data = {
            'uuid':this.uuid
          };
          USER.getUserInfo(data)
            .then(res => {
              // console.log('res',res);
              if(res.code === "0"){
                this.showUserInfo(res.data);
              }
            })
        },
        //回显用户基本信息
        showUserInfo(data){
          let that = this;
          let hasVerifyWechat = data.userStatus.hasVerifyWechat;
          that.userInfo.nickName = data.nickName;
          that.userInfo.tel_number = data.tel_number;
          that.userInfo.Bcoins = data.Bcoins;
          that.userInfo.hasVerifyWechat = hasVerifyWechat === 'enable' ? '已绑定' : '未绑定';
          that.userInfo.created_at = data.created_at;
          if(data.avatar && data.avatar != ''){
            that.userInfo.avatar = data.avatar;
          }
        },
      },
      watch:{
        '$route'(){
          this.routerName  =this.$route.name;
        }
      },
    }
</script>

<style lang="css" scoped>
  .centerCon{
    overflow: hidden;
  }
  .userImg{
    width: 72px;
    height: 72px;
    /*background:url(~@/assets/headImg.png) no-repeat;*/
    /*background-size:contain;*/
    margin: 24px 24px 0 24px;
    float: left;
  }
  .userImg img{
    width: 100%;
    height: 100%;
  }
  .infoCon{
    margin-top: 23px;
    margin-bottom: 24px;
  }
  .userInfoItem{
    width: 328px;
    height: 32px;
    margin-bottom: 8px;
    float: left;
    line-height: 32px;
  }
  .userLabel{
    width: 72px;
    float: left;
    color: rgba(0, 0, 0, .85);
  }
  .userText{
    width: 256px;
    float: left;
    color: rgba(0, 0, 0, .65);
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    word-break:keep-all;
  }
  .userTabsCon{
    margin-top: 8px;
  }

</style>
