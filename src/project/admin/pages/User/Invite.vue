<template>
  <div>
    <div class="totalTableSize">
      <div class="tipIcon"></div>
      <div class="totalCon">
        共有{{page.total}}条信息
      </div>
    </div>
    <div class="tableCon">
      <commonTable :columns="columns" :data="tableData" :pager="page" @handleSizeChange="handleSizeChange"
                   @handleCurrentChange="handleCurrentChange">
      </commonTable>
    </div>
  </div>
</template>

<script>
  import MineInfo from 'index/service/mine-service.js'
  export default {
    name: "Invite",
    data() {
      return {
        columns: [
          {prop: 'tel_number', label: '账号', width: '350', align: 'left'},
          {prop: 'nickName', label: '昵称', width: '300', align: 'left'},
          {prop: 'created_at', label: '注册时间', align: 'left',width: '350'}
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
      getList(){
        let data ={
          'page' : this.page.page,
          'unit': 10,
          'uuid':this.uuid
        };
        MineInfo.getMyTeam(data)
          .then(res => {
            // console.log('res',res);
            if(res.code === '0'){
              this.tableData = res.data;
              this.page.total = res.data.length;
            }
          });
      },
      // 改变页面大小处理
      handleSizeChange(val) {

      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.page = val;
        this.getList();
      },
      editTableData(row) {
        // console.log('row',row);
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
