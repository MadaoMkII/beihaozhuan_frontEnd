<template>
  <div>
    <div class="searchCon">
      <div class="searchItem">
        <div class="searchLabel">广告位：</div>
        <div class="searchInput">
          <el-select v-model="search.status" :popper-append-to-body = false placeholder="请选择">
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
        <el-button type="primary" class="CoBtn searchCoBtn">查询</el-button>
        <el-button class="CoResetBtn">重置</el-button>
      </div>
    </div>
    <div class="btnGroupCon">
      <el-button type="primary" class="CoBtn" icon="el-icon-plus" @click="goAddAds()">新建广告位</el-button>
    </div>
    <div class="totalTableSize">
      <div class="tipIcon"></div>
      <div class="totalCon">
        共有2643条信息
      </div>
    </div>
    <div class="tableCon">
      <commonTable :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                   @handleCurrentChange="handleCurrentChange">

        <el-table-column slot="table_oper" align="center" label="状态" width="80" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <el-badge is-dot class="dots" type="success"></el-badge>
            <span>{{scope.row.status}}</span>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn">
              <el-button type="text" @click="detailPop()">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </commonTable>
    </div>


  </div>
</template>

<script>
  export default {
    name: "AdType",
    data() {
      return {
        search: {
          goodsName: '',
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
          {prop: 'name', label: '广告位名称', width: '200', align: 'left'},
          {prop: 'detail', label: '广告位', width: '200', align: 'left'},
          {prop: 'coin', label: '尺寸', align: 'right',width: '96'},
          {prop: 'coin', label: '时间', align: 'right',width: '96'}
        ],
        tableData: [],
        page: {
          pageNo: 1,
          limit: 10,
          sizes: [10, 50, 100],
          total: 0
        }
      }
    },
    mounted() {
      this.tableData = [
        {id:111,name: '商品名称11', detail: '商品描述描述描述商品描述描述描述商品描述描述描述商品描述描述描述', coin: '784729',home:'首页',num:'323',status:'已完成'},

      ];
      this.page.total = this.tableData.length;
    },
    methods: {
      // 重新渲染name列
      formatter(row, column, cellValue) {
        // return row.detail | ellipsis;
      },
      // 改变页面大小处理
      handleSizeChange(val) {

      },
      // 翻页处理
      handleCurrentChange(val) {

      },
      editTableData(row) {
        console.log('row',row);
      },
      //打开新建页面
      goAddAds(){
        this.$router.push({
          name:'AddSeat',
        })
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
