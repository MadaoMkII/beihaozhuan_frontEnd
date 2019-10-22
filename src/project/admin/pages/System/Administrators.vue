<template>
  <div class="cons">
    <div class="searchCon">
      <div class="searchItem">
        <div class="searchLabel">权限组：</div>
        <div class="searchInput searchSelect">
          <el-select v-model="search.role" :popper-append-to-body = false placeholder="请选择">
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
    <div class="btnGroupCon">
      <el-button type="primary" class="CoBtn" icon="el-icon-plus" @click="goAddAds()">新建管理员</el-button>
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
            <div v-if="scope.row.userStatus.activity === 'enable'">
              <el-badge is-dot class="dots" type="success"></el-badge>
              <span>正常</span>
            </div>
            <div v-if="scope.row.userStatus.activity === 'disable'">
              <el-badge is-dot class="dots" type="danger"></el-badge>
              <span>禁用</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn" @click="edit(scope.row)">
              <el-button type="text">编辑</el-button>
            </div>

            <el-divider direction="vertical"></el-divider>

            <div class="tableBtn">
              <el-popover trigger="hover" placement="top">
                <div class="confirmText">
                  <span class="el-icon-warning confirmIcon"></span>
                  <span class="confirmTips">确定删除该用户？</span>
                </div>
                <div class="confirmBtnCon">
                  <el-button type="primary" @click="pSubmit(scope.row.uuid)">确定</el-button>
                </div>
                <div slot="reference">
                  <el-button type="text">删除</el-button>
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
  import SYSTEM from 'admin/service/system-service.js'
  export default {
    name: "Administrators",
    data() {
      return {
        search: {
          role: ''
        },
        selectOptions : [
          {
            value: '客服',
            label: '客服'
          }, {
            value: '运营',
            label: '运营'
          }
        ],
        columns: [
          {prop: 'realName', label: '管理员', width: '150', align: 'left'},
          {prop: 'role', label: '权限组', width: '150', align: 'left'},
          {prop: 'tel_number', label: '手机号', align: 'right',width: '150'},
          {prop: 'updated_at', label: '最近登录时间', align: 'right',width: '150'}
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
          'role': this.search.role
        };
        SYSTEM.getSystemList(data)
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
        this.search.role = '';
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
      //打开编辑页面
      edit(data){
        this.$router.push({
          name:'AddAdministrators',
          query:{
            'uuid' : data.uuid,
            'realName' : data.realName,
            'tel_number': data.tel_number,
            'role': data.role
          }
        })
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
  .searchSelect{
    width: 136px;
  }
  .searchCoBtn{
    margin-left: -20px;
  }
</style>
