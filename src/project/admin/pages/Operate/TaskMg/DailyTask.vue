<template>
  <div>
    <div class="searchCon">
      <div class="searchItem">
        <div class="searchLabel">任务名称：</div>
        <div class="searchInput">
          <el-input class="searchItem" v-model="search.title" placeholder="请输入"></el-input>
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

        <el-table-column slot="table_oper" align="center" label="状态" width="80" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'enable'">
              <el-badge is-dot class="dots" type="success"></el-badge>
              <span>开启</span>
            </div>
            <div v-if="scope.row.status === 'disable'">
              <el-badge is-dot class="dots" type="danger"></el-badge>
              <span>关闭</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right" >
          <template slot-scope="scope" v-if="csRole === 'false'">
            <div class="tableBtn">
              <el-button type="text" @click="editPop(scope.row.title,scope.row)">编辑</el-button>
            </div>

            <el-divider direction="vertical"></el-divider>
            <div class="tableBtn">
              <el-popover trigger="hover" placement="top">
                <div class="confirmText">
                  <span class="el-icon-warning confirmIcon"></span>
                  <span class="confirmTips" v-if="scope.row.status === 'disable'">是否开启该任务？</span>
                  <span class="confirmTips" v-if="scope.row.status === 'enable'">是否关闭该任务？</span>
                </div>
                <div class="confirmBtnCon">
                  <el-button type="primary" @click="pSubmit(scope.row.UUid,scope.row.status)">确定</el-button>
                </div>
                <div slot="reference">
                  <el-button type="text" v-if="scope.row.status === 'disable'">开启</el-button>
                  <el-button type="text" v-if="scope.row.status === 'enable'">关闭</el-button>
                </div>
              </el-popover>
            </div>

          </template>
        </el-table-column>
      </commonTable>
    </div>


  </div>
</template>

<script>
  import TASK from 'admin/service/task-service.js'
  export default {
    name: "UpTask",
    data() {
      return {
        csRole:localStorage.getItem('csRole'),
        routerName: '',
        search: {
          title: ''
        },
        columns: [
          {prop: 'title', label: '任务名称', width: '200', align: 'left'},
          {prop: 'reward', label: '奖励金币数', width: '200', align: 'left'},
          {prop: 'requireAmount', label: '完成次数', align: 'right',width: '96'}
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
        let data ={
          'page' : this.page.page,
          'unit': 10,
          "missionType": "Daily",
          'title': this.search.title
        };
        TASK.getTaskList(data)
          .then(res => {
            // console.log('res',res);
            if(res.code === "0"){
              this.tableData = res.data;
              this.page.total = res.data.length;
            }
          })
      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.page = val;
        this.getList();
      },
      //点击查询按钮
      searchList(){
        this.page.page = 1;
        this.getList();
      },
      //重置
      reset(){
        this.search.title = '';
      },
      //弹窗中确认按钮
      pSubmit(uuid,status) {
        let statusChange = status === 'enable' ? 'disable' : 'enable'
        let data = {
          'uuid' : uuid,
          'status': statusChange
        }
          TASK.setMissionStatus(data)
            .then(res => {
              // console.log('res',res);
              if(res.code === "0"){
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.getList();
              }
            })
      },
      //打开编辑页面
      editPop(title,data){
        let query = {};
        if(title === '每日签到'){
          this.routerName = 'SignIn';
          query.uuid = data.UUid;
          query.title = data.title;
          query.reward = data.reward;
          query.requireAmount = data.requireAmount;
          query.imgUrl = data.imgUrl ? data.imgUrl : ''
        }else if(title === '每日看广告' || title === '每日看广告_高级'){
          this.routerName = 'AlreadyDaily';
          query.uuid = data.UUid;
          query.title = data.title;
          query.reward = data.reward;
          query.requireAmount = data.requireAmount;
          query.imgUrl = data.imgUrl ? data.imgUrl : ''
        }else if(title === '每日晒收入'){
          this.routerName = 'Income';
          query.uuid = data.UUid;
          query.title = data.title;
          query.reward = data.reward;
          query.imgUrl = data.imgUrl ? data.imgUrl : ''
        }else if(title === '每日邀新人'){
          this.routerName = 'InviteDaily';
          query.uuid = data.UUid;
          query.title = data.title;
          query.reward = data.reward;
          query.requireAmount = data.requireAmount;
          query.imgUrl = data.imgUrl ? data.imgUrl : ''
        }
        this.$router.push({
          name:this.routerName,
          query:query
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
