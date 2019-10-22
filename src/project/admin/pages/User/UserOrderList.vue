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

          <el-table-column slot="table_oper" align="center" label="状态" width="80" :resizable="false" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.orderStatus === 'Pending'">
                <el-badge is-dot class="dots" type="warning"></el-badge>
                <span>进行中</span>
              </div>
              <div v-else-if="scope.row.orderStatus === 'Close'">
                <el-badge is-dot class="dots" type="danger"></el-badge>
                <span>已关闭</span>
              </div>
              <div v-else-if="scope.row.orderStatus === 'Complete'">
                <el-badge is-dot class="dots" type="success"></el-badge>
                <span>已完成</span>
              </div>
            </template>
          </el-table-column>
        </commonTable>
      </div>
    </div>
</template>

<script>
  import USER from 'admin/service/user-service.js'
    export default {
      name: "UserOrderList",
      data() {
        return {
          uuid:'',
          columns: [
            {prop: 'orderUUid', label: '订单编号', width: '200', align: 'left'},
            {prop: 'title', label: '商品名称', width: '200', align: 'left'},
            {prop: 'goodPrice', label: '金额', align: 'right',width: '150'},
            {prop: 'redeemCode', label: '兑换码', align: 'right',width: '150'},
            {prop: 'created_at', label: '购买时间', align: 'right',width: '150'}
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
          USER.findOrderByUser(data)
            .then(res => {
              // console.log('res',res);
              if(res.code === "0"){
                if(res.data){
                  this.tableData = res.data;
                }
                this.page.total = res.count;
              }
            })
        },
        // 翻页处理
        handleCurrentChange(val) {
          this.page.page = val;
          this.getList();
        },
        //打开新建页面
        goAddGoods(){
          this.$router.push({
            name:'AddGoods',
          })
        },
        //弹窗中确认按钮
        pSubmit(row) {

        }
      }
    }
</script>

<style lang="css" scoped>

</style>
