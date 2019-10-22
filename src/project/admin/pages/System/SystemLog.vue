<template>
  <div class="cons">
    <div class="searchCon">
      <div class="searchItem">
        <div class="searchLabel">level：</div>
        <div class="searchInput searchSelect">
          <el-select v-model="search.level" :popper-append-to-body = false placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchItem">
        <div class="searchInput dateInput">
          <el-date-picker
            v-model="daterangeVal"
            type="daterange"
            @change="onPick"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="searchBtnCon">
        <el-button type="primary" class="CoBtn searchCoBtn" @click="searchList()">查询</el-button>
        <el-button class="CoResetBtn" @click="reset()">重置</el-button>
        <el-button class="CoResetBtn" @click="share()">分享</el-button>
      </div>
    </div>
    <div class="totalTableSize">
      <div class="tipIcon"></div>
      <div class="totalCon">
        共有{{page.total}}条信息
      </div>
    </div>
    <div class="tableCon">
      <commonTable :columns="columns" :data="tableData" :pager="page"
                   @handleCurrentChange="handleCurrentChange">

        <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn" @click="detail('request',scope.row.request)">
              <el-button type="text">request</el-button>
            </div>
            <el-divider direction="vertical"></el-divider>

            <div class="tableBtn" @click="detail('stack',scope.row.stack)">
              <el-button type="text">stack</el-button>
            </div>
            <el-divider direction="vertical"></el-divider>

            <div class="tableBtn" @click="detail('详情',scope.row)">
              <el-button type="text">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </commonTable>
    </div>
    <div class="mask" v-show="showPopBox"></div>
    <div class="popBox"  v-show="showPopBox">
      <div class="popBoxTitle">
        <span>{{popTitle}}</span>
        <div class="closeBtn" @click="showPopBox = false">X</div>
      </div>
      <div class="popCon" v-if="popTitle === 'request'">
        <div v-for="item in popArrayTwo">
          <div class="popLabel">{{item.name}}</div>
          <div class="popData">{{item.val}}</div>
        </div>

<!--        <div class="popLabel">body</div>-->
<!--        <div class="popData">{{popData.body}}</div>-->
<!--        <div class="popLabel">header</div>-->
<!--        <div class="popData">{{popData.header}}</div>-->
      </div>
      <div class="popCon" v-else-if="popTitle === 'stack'">
        <div class="popLabel">stack</div>
        <div class="popData">{{popData}}</div>
      </div>
      <div class="popCon" v-else-if="popTitle === '详情'">
        <div class="popItem" v-for="item in popArray" >
          <div class="popLabel">{{item.name}}</div>
          <div class="popData">{{item.val}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import SYSTEM from 'admin/service/system-service.js'
  import wx from 'weixin-js-sdk';
  export default {
    name: "SystemLog",
    data() {
      return {
        search: {
          level: '',
          beginTime:'',
          endTime:''
        },
        daterangeVal:'',
        selectOptions : [
          {
            value: 'WARNING',
            label: 'WARNING'
          }, {
            value: 'ERROR',
            label: 'ERROR'
          }, {
            value: 'INFO',
            label: 'INFO'
          }
        ],
        columns: [
          {prop: 'originalUrl', label: '位置', width: '200', align: 'left'},
          {prop: 'message', label: 'message', align: 'left',width: '400'},
          {prop: 'date', label: '日期', align: 'left',width: '180'},
        ],
        tableData: [],
        page: {
          page: 1,
          unit: 10,
          total: 0
        },
        showPopBox:false,
        popData:{},
        popTitle:'',
        popArray:[],
        popArrayTwo:[]
      }
    },
    mounted() {

    },
    created(){
      this.getList();
      SYSTEM.checkWechat()
        .then(res => {
          console.log('res',res);
          if(res.code === "0"){
            wx.config({
              debug : true, //开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId : res.data.appID, //必填，公众号的唯一标识
              timestamp : res.data.timestamp, //必填，生成签名的时间戳
              nonceStr : res.data.noncestr, //必填，生成签名的随机串
              signature : res.data.signature,//必填，签名，见附录1
              jsApiList : [ 'onMenuShareAppMessage','onMenuShareTimeline' ]//必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
          }
        })
      wx.ready(function () {
        //分享给好友
        wx.onMenuShareAppMessage({
          title: '尊敬的xxx', // 分享标题
          desc: '请柬描述', // 分享描述
          link: 'https://www.beihaozhuan.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/images/13198600801258.jpg', // 自定义图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            alert('已分享');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            alert('分享失败');
          }
        });
      });
    },
    methods: {
      //加载列表数据
      getList(){
        let data ={
          'page' : this.page.page,
          'unit': 10,
          'level':this.search.level,
          'beginTime' : this.search.beginTime,
          'endTime':this.search.endTime
        };
        SYSTEM.getLogger(data)
          .then(res => {
            console.log('res',res);
            if(res.code === "0"){
              this.tableData = res.data;
              this.page.total = res.count;
            }
          })
      },
      //点击查询按钮
      searchList(){
        this.page.page = 1;
        this.getList();
      },
      //重置
      reset(){
        this.search.level = '';
        this.search.beginTime = '';
        this.search.endTime = '';
      },
      onPick(date){
        this.search.beginTime = date[0];
        this.search.endTime = date[1];
      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.page = val;
        this.getList();
      },
      //打开新建页面
      goAddAds(){
        this.$router.push({
          name:'AddAdministrators',
        })
      },
      //弹窗中确认按钮
      pSubmit(uuid) {
        let data = {
          'uuid' : uuid,
          'activity': 'disable'
        };
        SYSTEM.setUserStatus(data)
          .then(res => {
            console.log('res',res);
            if(res.code === "0"){
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getList();
            }
          })
      },
      //打开详情页面
      detail(title,data){
        this.showPopBox = true;
        this.popTitle = title;
        this.popData = data;
        if(title === '详情'){
          let array = [];
          for(let item in data){
            if(item != 'request' && item != 'stack'){
              let a = {
                'name' : item,
                'val':data[item]
              };
              array.push(a);
            }
          }
          this.popArray = array;
        }else if(title === 'request'){
          let arrayTwo = [];
          for(let item in data){
            let a = {
              'name' : item,
              'val':data[item]
            };
            arrayTwo.push(a);
          }
          this.popArrayTwo = arrayTwo;
        }

      },
      share(){
        wx.ready(function () {
          //分享给好友
          wx.onMenuShareAppMessage({
            title: '尊敬的xxx', // 分享标题
            desc: '请柬描述', // 分享描述
            link: 'https://www.beihaozhuan.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/images/13198600801258.jpg', // 自定义图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
              alert('已分享');
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
              alert('分享失败');
            }
          });
        });
      }
    }

  }
</script>

<style lang="css" scoped>
  .cons{
    overflow: hidden;
  }
  .searchItem{
    margin-right: 32px;
  }
  .searchInput{
    width: 168px;
  }
  .dateInput{
    width: 100%;
  }
  .searchSelect{
    width: 136px;
  }
  .searchCoBtn{
    margin-left: -20px;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .popBox{
    width: 1000px;
    height: 600px;
    background: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .popBoxTitle{
    width: 1000px;
    height: 50px;
    line-height: 50px;
    background: #F0F2F5;
    /*padding: 0 150px 0 20px;*/
    position: fixed;
    overflow: hidden;
  }
  .popBoxTitle span{
    margin-left: 20px;
  }
  .closeBtn{
    float: right;
    cursor: pointer;
    margin-right: 20px;
  }
  .popCon{
    margin-top: 50px;
    padding: 10px 20px;
    overflow: auto;
  }
  .popLabel{
    height: 40px;
    line-height: 40px;
  }
  .popData{
    border: 1px solid #F0F2F5;
    line-height: 30px;
    padding: 10px;
    word-break: break-all;
  }
  .popItem{
    width: 49%;
    float: left;
    margin-right: 5px;
  }
</style>
