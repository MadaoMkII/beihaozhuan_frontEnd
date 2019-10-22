<template>
  <div class="centerCon">
    <div class="centerTitle">
      用户管理
    </div>
    <div class="searchCon">
      <div class="searchItem userSearchItem">
        <div class="searchLabel">账号：</div>
        <div class="searchInput userInput">
          <el-input class="searchItem" v-model="search.tel_number" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="searchItem userSearchItem">
        <div class="searchLabel">昵称：</div>
        <div class="searchInput userInput">
          <el-input class="searchItem" v-model="search.nickName" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="searchItem userSearchItem">
        <div class="searchLabel">微信：</div>
        <div class="searchInput searchSelect userSelect">
          <el-select v-model="search.hasVerifyWechat" :popper-append-to-body = false placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchItem userSearchItem">
        <div class="searchLabel">状态：</div>
        <div class="searchInput searchSelect userSelect">
          <el-select v-model="search.activity" :popper-append-to-body = false placeholder="请选择">
            <el-option
              v-for="item in activitySelectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="searchBtnCon">
        <el-button type="primary" class="CoBtn" @click="searchList()">查询</el-button>
        <el-button class="CoResetBtn" @click="reset()">重置</el-button>
      </div>
    </div>
    <div class="btnGroupCon" v-if="AdminRole === 'true'">
      <el-button type="primary" class="CoBtn"><div class="excelIcon"></div><div class="exportText" @click="excel()">导出报表</div></el-button>
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

        <el-table-column slot="table_oper" align="center" label="操作" width="180" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn">
              <el-button type="text" @click="detailPop(scope.row.uuid)">详情</el-button>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div class="tableBtn">
              <el-popover trigger="hover" placement="top">
                <div class="confirmText">
                  <span class="el-icon-warning confirmIcon"></span>
                  <span class="confirmTips" v-if="scope.row.userStatus.activity === 'enable'">是否禁用该用户？</span>
                  <span class="confirmTips" v-if="scope.row.userStatus.activity === 'disable'">是否启用该用户？</span>
                </div>
                <div class="confirmBtnCon">
                  <el-button type="primary" @click="pSubmit(scope.row.uuid,scope.row.userStatus.activity)">确定</el-button>
                </div>
                <div slot="reference">
                  <el-button type="text" v-if="scope.row.userStatus.activity === 'enable'">禁用</el-button>
                  <el-button type="text" v-if="scope.row.userStatus.activity === 'disable'">启用</el-button>
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
  import USER from 'admin/service/user-service.js'
    export default {
      name: "UserMg",
      data() {
        return {
          AdminRole:localStorage.getItem('AdminRole'),
          search: {
            tel_number: '',
            nickName: '',
            hasVerifyWechat:'',
            activity : '',
          },
          selectOptions: [
            {
              value: 'enable',
              label: '已绑定'
            }, {
              value: 'disable',
              label: '未绑定'
            }
          ],
          activitySelectOptions:[
            {
              value: 'enable',
              label: '正常'
            }, {
              value: 'disable',
              label: '禁用'
            }
          ],
          columns: [
            {prop: 'tel_number', label: '账号', width: '150', align: 'left'},
            {prop: 'nickName', label: '昵称', width: '150', align: 'left'},
            {prop: 'todayIncoming', label: '今日收入', width: '100', align: 'left'},
            {prop: 'Bcoins', label: '金币余额', align: 'right',width: '100'},
            {prop: '', label: '微信', align: 'left',width: '100',formatter: this.formatter},
            // {prop: 'coin', label: 'OPENID', align: 'center',width: '96'},
            {prop: 'created_at', label: '注册时间', align: 'left',width: '160'}
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
            'tel_number':this.search.tel_number,
            'nickName':this.search.nickName,
            'hasVerifyWechat':this.search.hasVerifyWechat,
            'activity':this.search.activity
          }
          USER.getUserList(data)
            .then(res => {
              // console.log('res',res);
              if(res.code === "0"){
                this.tableData = res.data;
                this.page.total = res.count;
              }
            })
        },
        // 重新渲染微信列
        formatter(row, column, cellValue) {
          let wechat = row.userStatus.hasVerifyWechat;
          if(wechat === 'enable'){
            return '已绑定'
          }else {
            return '未绑定'
          }
        },
        //点击查询按钮
        searchList(){
          this.page.page = 1;
          this.getList();
        },
        //重置
        reset(){
          this.search.tel_number = '';
          this.search.nickName = '';
          this.search.hasVerifyWechat = '';
          this.search.activity = '';
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
        pSubmit(uuid,status) {
          // console.log('uuid',uuid);
          // console.log('status',status);
          let activity = status === 'enable' ? 'disable' : 'enable';
          let data = {
            'uuid' : uuid,
            'activity' : activity
          };

          USER.setUserstatus(data)
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
        //打开详情弹窗
        detailPop(uuid){
          this.$router.push({
            name:'UserInfo',
            query:{
              'uuid':uuid
            }
          })
        },
        excel(){
          window.location.href='https://www.beihaozhuan.com/biefanle';
        }
      }
    }
</script>

<style lang="css" scoped>
  .userInput{
    width: 168px;
  }
  .userSelect{
    width: 120px;
  }
  .userSearchItem{
    margin-right: 40px;
  }
</style>
