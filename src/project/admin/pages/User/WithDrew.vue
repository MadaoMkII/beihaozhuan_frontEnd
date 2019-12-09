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
  import USER from 'admin/service/user-service.js'
  export default {
    name: "WithDrew",
    data() {
      return {
        columns: [
          {prop: 'partner_trade_no', label: '流水单号', width: '200', align: 'left'},
          {prop: 'desc', label: '订单描述', width: '250', align: 'left'},
          {prop: 'amount', label: '金额', width: '100', align: 'left',formatter:this.formatterAmount},
          {prop: 'nickName', label: '微信昵称', align: 'left',width: '200'},
          {prop: 'return_msg', label: '订单状态', align: 'left',width: '100'},
          {prop: 'createTime', label: '创建时间', align: 'left',width: '200',formatter:this.formatter}
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
          'userUUid':this.uuid
        };
        USER.getWithDrewByUser(data)
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
      formatterAmount(row, column, cellValue){
        let val = cellValue / 10000 +'元';
        return val;
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
