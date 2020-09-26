<template>
  <div>
    <div class="centerTitle">
      订单管理
    </div>
    <div class="searchCon">
      <div class="searchItem">
        <div class="searchLabel">订单编号：</div>
        <div class="searchInput">
          <el-input class="searchItem" v-model="search.orderUUid" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="searchItem">
        <div class="searchLabel">商品名称：</div>
        <div class="searchInput">
          <el-input class="searchItem" v-model="search.title" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="searchBtnCon">
        <el-button type="primary" class="CoBtn" @click="searchList()">查询</el-button>
        <el-button class="CoResetBtn" @click="reset()">重置</el-button>
      </div>
    </div>
    <div class="btnGroupCon">
      <el-button type="primary" class="CoBtn" @click="goAddGoods()"><div class="excelIcon"></div><div class="exportText" @click="excel()">导出报表</div></el-button>
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

         <el-table-column slot="table_oper" align="center" label="状态" width="80" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <el-badge is-dot class="dots" type="success"></el-badge>
            <span v-if="scope.row.orderStatus === 'Close'">已关闭</span>
            <span v-else-if="scope.row.orderStatus === 'Pending'">进行中</span>
            <span v-else-if="scope.row.orderStatus === 'Complete'">已完成</span>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn">
              <el-button type="text" @click="detailPop(scope.row.orderUUid)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </commonTable>
    </div>
  </div>
</template>

<script>
  import ORDER from 'admin/service/order-service.js'
  export default {
    name: 'OrderMg',
    data() {
      return {
        search : {
          orderUUid : '',
          title : ''
        },
        selectOptions : [
          {
            value: '1',
            label: '上架'
          }, {
            value: '2',
            label: '下架'
          }
        ],
        columns: [
          {prop: 'orderUUid', label: '订单编号', width: '200', align: 'left'},
          {prop: 'title', label: '商品名称', width: '150', align: 'left'},
          {prop: 'goodPrice', label: '金额', align: 'right',width: '80'},
          {prop: 'coin', label: '兑换码', align: 'right',width: '96'},
          {prop: 'created_at', label: '购买时间', align: 'right',width: '120'}
        ],
        tableData: [],
        page: {
          page: 1,
          unit: 10,
          total: 0
        },
      }
    },
    mounted() {
      this.page.total = this.tableData.length;
    },
    created(){
      this.getList();
    },
    methods: {
      //加载列表数据
      getList(){
        let data ={
          'orderUUid':this.search.orderUUid,
          'title':this.search.title,
          'page' : this.page.page,
          'unit': 10
        }
        ORDER.getOrderDetail(data)
          .then(res => {
            // console.log('res',res);
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
        this.search.title = '';
        this.search.orderUUid = '';
      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.page = val;
        this.getList();
      },
      //打开详情弹窗
      detailPop(){
        this.$router.push({
          path: '/goods/orderMg/orderDetail',
          name:'OrderDetail'
        })
      },
      excel(){
        // window.location.href='http://192.168.1.183:3000/excel/getExcel';
        window.location.href='https://www.beihaozhuan.com/api/excel/getExcel';
      }
    }
  }
</script>


<style lang="css" scoped>
  .searchInput{
    width: 256px;
    height: 32px;
    float: left;
  }
  .excelIcon{
    width: 16px;
    height: 16px;
    background:url(~admin/assets/excel.png) no-repeat;
    background-size:contain;
    float: left;
  }
  .exportText{
    float: left;
    padding-top: 2px;
  }

</style>
