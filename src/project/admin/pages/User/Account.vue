<template>
  <div>
    <div class="totalTableSize">
      <div class="tipIcon"></div>
      <div class="totalCon">
        共有{{page.total}}条信息
      </div>
    </div>
    <div class="tableCon">
      <commonTable :columns="columns" :data="tableData" :pager="page"
                   @handleCurrentChange="handleCurrentChange">
      </commonTable>
    </div>
  </div>
</template>

<script>
  import ORDER from 'index/service/order-service.js'
  export default {
    name: "Account",
    data() {
      return {
        columns: [
          {prop: 'income', label: '收支类型', width: '200', align: 'left'},
          {prop: 'category', label: '类型', width: '300', align: 'left'},
          {prop: 'amount', label: '金额', align: 'left',width: '150'},
          {prop: 'createTime', label: '时间', align: 'left',width: '350',formatter:this.formatter}
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
        let data ={
          'page' : this.page.page,
          'unit': 10,
          'userUUid':this.uuid,
          'period':'full'
        };
        ORDER.getUserBalance(data)
          .then(res => {
            // console.log('res',res);
            if (res.code == 0) {
              this.tableData = res.data;
              this.page.total = res.count;
            }
          });
      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.page = val;
        this.getList();
      },
      formatter(row, column, cellValue) {
        let val = this.getLocalTime(cellValue)
        return val;
      },
      //打开新建页面
      goAddGoods(){
        this.$router.push({
          name:'AddGoods',
        })
      },
      //格式化时间
      getLocalTime(date) {
        const moment = require(`moment`);
        require(`moment-timezone`);
        return moment.tz(date, "Asia/ShangHai").format(`YYYY/MM/DD HH:mm:ss`);
      },
      //弹窗中确认按钮
      pSubmit(row) {

      }
    }
  }
</script>

<style lang="css" scoped>

</style>
