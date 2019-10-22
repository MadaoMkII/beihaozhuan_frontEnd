<template>
  <div class="countDetailCon">
    <div class="searchCon">
      <div class="searchItem">
        <div class="searchLabel">用户账号：</div>
        <div class="searchInput">
          <el-input class="searchItem" v-model="search.tel_number" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="searchBtnCon">
        <el-button type="primary" class="CoBtn searchCoBtn" @click="searchList()">查询</el-button>
        <el-button class="CoResetBtn" @click="reset()">重置</el-button>
      </div>
    </div>
<!--    <div class="totalTableSize">-->
<!--      <div class="tipIcon"></div>-->
<!--      <div class="totalCon">-->
<!--        共有2643条信息-->
<!--      </div>-->
<!--    </div>-->
    <div class="tableCon">
      <commonTable :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                   @handleCurrentChange="handleCurrentChange">
      </commonTable>
    </div>

    <div class="backCon">
      <el-button class="CoResetBtn" @click="goPrePage()">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
  import AD from 'admin/service/advertisement-service.js'
  export default {
    name: "CountDetail",
    data() {
      return {
        search: {
          tel_number: '',
          status: ''
        },
        selectOptions: [
          {
            value: '1',
            label: '上架'
          }, {
            value: '2',
            label: '下架'
          }
        ],
        columns: [
          {prop: 'advertisement.title', label: '广告名称', width: '200', align: 'left'},
          {prop: 'user.tel_number', label: '用户账号', width: '200', align: 'left'},
          {prop: 'totalReword', label: '支出佣金', width: '100', align: 'left'},
          {prop: 'RMBReword', label: '支出金额', align: 'right',width: '100'},
          {prop: 'amount', label: '次数', align: 'right',width: '100'},
          {prop: 'updated_at', label: '时间', align: 'center',width: '300'}
        ],
        tableData: [],
        page: {
          page: 1,
          unit: 10,
          total: 0
        },
        uuid:''
      }
    },
    created(){
      this.uuid = this.$route.query.uuid;
      this.getList();
    },
    methods: {
      //加载列表数据
      getList(){
        let data = {
          'page':this.page.page,
          'unit':10,
          'uuid':this.uuid,
          'tel_number':this.search.tel_number
        };
        AD.etAdvDetail(data)
          .then(res => {
            console.log('res',res);
            if(res.code === "0"){
              this.tableData = res.data;
              this.page.total = res.count;
            }
          })
      },
      getLocalTime(date) {
        const moment = require(`moment`);
        require(`moment-timezone`);
        return moment.tz(date, "Asia/ShangHai").format(`YYYY/MM/DD HH:mm:ss`);
      },
      // 重新渲染name列
      formatter(row, column, cellValue) {
        // return row.detail | ellipsis;
        let val = this.getLocalTime(cellValue);
        return val
      },
      // 改变页面大小处理
      handleSizeChange(val) {

      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.page = val;
        this.getList();
      },
      //打开新建页面
      goAddAds(){
        this.$router.push({
          name:'AddPoster',
        })
      },
      //点击查询按钮
      searchList(){
        this.page.page = 1;
        this.getList();
      },
      //重置
      reset(){
        this.search.tel_number = '';
      },
      //弹窗中确认按钮
      pSubmit(row) {

      },
      //打开详情弹窗
      detailPop(){
        this.$router.push({
          path: '/user/userMg/userInfo',
          name:'UserInfo'
        })
      }
    }

  }
</script>

<style lang="css" scoped>
  .countDetailCon{
    overflow: hidden;
  }
  .searchItem{
    margin-right: 32px;
  }
  .searchInput{
    width: 168px;
  }
  .searchSelect{
    width: 136px;
  }
  .searchCoBtn{
    margin-left: -20px;
  }
  .backCon{
    width: 102px;
    height: 32px;
    margin: auto;
    margin-top: 48px;
  }
</style>
