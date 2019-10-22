<template>
  <div>
    <div class="searchCon">
      <div class="searchItem">
        <div class="searchLabel">SSP来源：</div>
        <div class="searchInput">
          <el-select v-model="search.source" :popper-append-to-body = false placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBtnCon">
        <el-button type="primary" class="CoBtn searchCoBtn" @click="searchList()">查询</el-button>
        <el-button class="CoResetBtn" @click="reset()">重置</el-button>
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
        <el-table-column slot="table_oper" align="center" label="操作" width="120" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn">
              <el-button type="text" @click="detailPop(scope.row.uuid)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </commonTable>
    </div>


  </div>
</template>

<script>
  import AD from 'admin/service/advertisement-service.js'
  export default {
    name: "AdType",
    data() {
      return {
        search: {
          source: ''
        },
        selectOptions: [
          {
            value: 'banner',
            label: 'banner'
          }, {
            value: 'native',
            label: 'native'
          }, {
            value: 'full',
            label: 'full'
          }
        ],
        columns: [
          {prop: 'positionName', label: '广告名称', width: '120', align: 'left'},
          {prop: 'source', label: 'SSP来源', width: '120', align: 'left'},
          {prop: 'total', label: '总点击', align: 'right',width: '120'},
          {prop: 'totalAmount', label: '支出佣金', align: 'right',width: '120'},
          {prop: 'commission', label: '支出金额', align: 'right',width: '120',formatter:this.formatterCommission},
          {prop: 'updated_at', label: '时间', align: 'left',width: '200',formatter:this.formatter}
        ],
        tableData: [],
        page: {
          page: 1,
          unit: 10,
          total: 0
        },
      }
    },
    created(){
      this.getList();
    },
    methods: {
      //加载列表数据
      getList(){
        let data = 'page='+ this.page.page + '&unit=10&source=' + this.search.source;
        AD.countAdv(data)
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
        let val = this.getLocalTime(cellValue);
        return val
      },
      formatterCommission(row, column, cellValue){
        let a = cellValue.toFixed(3);
        return a
      },
      //点击查询按钮
      searchList(){
        this.page.page = 1;
        this.getList();
      },
      //重置
      reset(){
        this.search.source = '';
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
          name:'AddType',
        })
      },
      //弹窗中确认按钮
      pSubmit(row) {

      },
      //打开详情弹窗
      detailPop(uuid){
        this.$router.push({
          name:'CountDetail',
          query:{
            uuid : uuid
          }
        })
      }
    }

  }
</script>

<style lang="css" scoped>
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
</style>
