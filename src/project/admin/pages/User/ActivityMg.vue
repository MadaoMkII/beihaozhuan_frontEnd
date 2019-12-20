<template>
  <div class="centerCon">
    <div class="centerTitle">
      参与用户列表
    </div>
    <div class="searchCon">
      <div class="searchItem userSearchItem">
        <div class="searchLabel">账号：</div>
        <div class="searchInput userInput">
          <el-input class="searchItem" v-model="search.tel_number_verify" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="searchItem userSearchItem">
        <div class="searchLabel">状态：</div>
        <div class="searchInput searchSelect userSelect">
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
        <el-button type="primary" class="CoBtn" @click="searchList()">查询</el-button>
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

        <el-table-column slot="table_oper" align="center" label="登录截图" width="100" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableImgCon" @click="previewPic(scope.row.loginPicUrl ? scope.row.loginPicUrl :'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/doubleDec/20200000013920144735683904067_s.jpg')">
              <img class="img" :src="scope.row.loginPicUrl ? scope.row.loginPicUrl :'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/doubleDec/20200000013920144735683904067_s.jpg'" alt="登录截图">
            </div>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="是否下载" width="100" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div>{{scope.row.hasDownload === true ? '是' : '否'}}</div>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="提交时间" width="180" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <span>{{scope.row.created_at}}</span>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="状态" width="90" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.status === '审核通过'" class="success">
              审核通过
            </div>
            <div v-else-if="scope.row.status === '审核不通过'" class="fail">
              审核不通过
            </div>
            <div v-else-if="scope.row.status === '未审核'">
              未审核
            </div>
            <div v-else-if="scope.row.status === '已领取'" class="success">
              已领取
            </div>
          </template>
        </el-table-column>
        <el-table-column slot="table_oper" align="center" label="操作" width="180" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn">
              <div class="tableBtn" v-if="scope.row.status === '未审核' || scope.row.status === '审核不通过'">
                <el-popover trigger="hover" placement="top">
                  <div class="confirmText">
                    <span class="el-icon-warning confirmIcon"></span>
                    <span class="confirmTips">确定审核通过？</span>
                  </div>
                  <div class="confirmBtnCon">
                    <el-button type="primary" @click="pSubmit(scope.row._id,'审核通过')">确定</el-button>
                  </div>
                  <div slot="reference">
                    <el-button type="text">审核通过</el-button>
                  </div>
                </el-popover>
              </div>
            </div>
            <el-divider direction="vertical"  v-if="scope.row.status === '未审核'"></el-divider>
            <div class="tableBtn" v-if="scope.row.status === '未审核'">
              <el-popover trigger="hover" placement="top">
                <div class="confirmText">
                  <span class="el-icon-warning confirmIcon"></span>
                  <span class="confirmTips">确定审核不通过？</span>
                </div>
                <div class="confirmBtnCon">
                  <el-button type="primary" @click="pSubmit(scope.row._id,'审核不通过')">确定</el-button>
                </div>
                <div slot="reference">
                  <el-button type="text">审核不通过</el-button>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
      </commonTable>
    </div>
    <div class="mask" v-show="showPopBox"></div>
    <div class="popBox"  v-show="showPopBox">
      <div class="popBoxTitle">
        <span>图片预览</span>
        <div class="closeBtn" @click="showPopBox = false">X</div>
      </div>
      <div class="popCon">
        <img class="imgCon" :src="previewImgUrl" >
      </div>
    </div>
  </div>
</template>

<script>
  import USER from 'admin/service/user-service.js'
  export default {
    name: "ActivityMg",
    data() {
      return {
        previewImgUrl :'',
        AdminRole:localStorage.getItem('AdminRole'),
        search: {
          status:'',
          tel_number_verify:''
        },
        selectOptions: [
          {
            value: '审核通过',
            label: '审核通过'
          }, {
            value: '审核不通过',
            label: '审核不通过'
          }, {
            value: '未审核',
            label: '未审核'
          }
        ],
        columns: [
          {prop: 'tel_number_verify', label: '账号', width: '120', align: 'left'},
          {prop: 'account', label: '试玩手机号', width: '120', align: 'left'}
        ],
        tableData: [],
        page: {
          page: 1,
          unit: 10,
          total: 0
        },
        showPopBox:false
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
          'status':this.search.status,
          'account':this.search.tel_number_verify
        }
        USER.getProofs(data)
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

      },
      //点击查询按钮
      searchList(){
        this.page.page = 1;
        this.getList();
      },
      //重置
      reset(){
        this.search.status = '';
        this.search.account = '';
      },
      // 翻页处理
      handleCurrentChange(val) {
        this.page.page = val;
        this.getList();
      },
      previewPic(url){
        this.showPopBox = true;
        this.previewImgUrl = url;
      },
      //弹窗中确认按钮
      pSubmit(id,status) {
        let data = {
          'id' : id,
          'status':status
        };

        USER.verifyProof(data)
          .then(res => {
            if(res.code === "0"){
              this.$message({
                type: 'success',
                message: '操作成功'
              });
              this.getList();
            }
          })

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
  .tableImgCon{
    width: 50px;
    height: 20px;
    margin: auto;
  }
  .img{
    width: 100%;
    height: 100%;
  }
  .success{
    color: #67C23A;
  }
  .fail{
    color: #F56C6C;
  }
  .mask{
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }
  .popBox{
    width: 1000px;
    height: 600px;
    background: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    overflow-x: hidden;
    overflow-y: auto;
  }
  .popBoxTitle{
    width: 1000px;
    height: 50px;
    line-height: 50px;
    background: #F0F2F5;
    /*padding: 0 150px 0 20px;*/
    position: fixed;
    overflow: hidden;
  }
  .popBoxTitle span{
    margin-left: 20px;
  }
  .closeBtn{
    float: right;
    cursor: pointer;
    margin-right: 20px;
  }
  .popCon{
    margin-top: 50px;
    padding: 10px 20px;
    overflow: auto;
  }
  .imgCon{
    width: 100%;
  }
</style>
