<template>
  <div>
    <div class="centerTitle">
      商品管理
    </div>
    <div class="searchCon">
        <div class="searchItem">
          <div class="searchLabel">商品名称：</div>
          <div class="searchInput">
            <el-input class="searchItem" v-model="search.title" placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchLabel">商品状态：</div>
          <div class="searchInput searchSelect">
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
    <div class="btnGroupCon" v-if="csRole === 'false'">
      <el-button type="primary" class="CoBtn" icon="el-icon-plus" @click="goAddGoods()">新建</el-button>
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
        <el-table-column slot="table_oper" align="left" label="商品描述" width="200" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div v-html="scope.row.description"></div>
          </template>
        </el-table-column>

        <el-table-column slot="table_oper" prop="price" align="right" label="金币" width="80" :resizable="false" fixed="right"></el-table-column>


        <el-table-column slot="table_oper" align="center" label="推荐首页" width="88" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn">
              <el-popover trigger="hover" placement="top">
                <div class="confirmText">
                  <span class="el-icon-warning confirmIcon"></span>
                  <span class="confirmTips" v-if="scope.row.isRecommend === false">是否推荐该商品至首页？</span>
                  <span class="confirmTips" v-else-if="scope.row.isRecommend === true">是否取消推荐？</span>
                </div>
                <div class="confirmBtnCon">
                  <el-button type="primary" @click="pSubmit(scope.row.uuid,scope.row.isRecommend,'setRecommendGood')">确定</el-button>
                </div>
                <div slot="reference">
                  <el-button type="text">{{scope.row.isRecommend ? '取消' : '推荐'}}</el-button>
                </div>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column slot="table_oper" prop="inventory" align="right" label="库存" width="80" :resizable="false" fixed="right"></el-table-column>
        <el-table-column slot="table_oper" align="center" label="状态" width="80" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 'disable'">
              <el-badge is-dot class="dots" type="danger"></el-badge>
              <span>下架</span>
            </div>
            <div v-if="scope.row.status === 'enable'">
              <el-badge is-dot class="dots" type="success"></el-badge>
              <span>上架</span>
            </div>

          </template>
        </el-table-column>

        <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right">
          <template slot-scope="scope">
            <div class="tableBtn" @click="editGoods(scope.row.uuid)">
              <el-button type="text">编辑</el-button>
            </div>

            <el-divider direction="vertical" v-if="csRole === 'false'"></el-divider>
            <div class="tableBtn"  v-if="csRole === 'false'">
              <el-popover trigger="hover" placement="top">
                <div v-if="scope.row.isRecommend === true && scope.row.status === 'enable'">
                  <div class="delTips">请先取消推荐商品</div>
                  <div class="delArrow"></div>
                </div>
                <div v-else>
                  <div class="confirmText">
                    <span class="el-icon-warning confirmIcon"></span>
                    <span class="confirmTips" v-if="scope.row.status === 'disable'">是否上架该商品？</span>
                    <span class="confirmTips" v-if="scope.row.status === 'enable'">是否下架该商品？</span>
                  </div>
                  <div class="confirmBtnCon">
                    <el-button type="primary" @click="pSubmit(scope.row.uuid,scope.row.status,'setGoodStatus')">确定</el-button>
                  </div>
                </div>
                <div slot="reference">
                  <el-button type="text" v-if="scope.row.status === 'disable'">上架</el-button>
                  <el-button type="text" v-if="scope.row.status === 'enable'">下架</el-button>
                </div>
              </el-popover>
            </div>

            <el-divider direction="vertical"  v-if="csRole === 'false'"></el-divider>

            <div class="tableBtn"  v-if="csRole === 'false'">
              <el-popover trigger="hover" placement="top">
                <div v-if="scope.row.status === 'enable'">
                  <div class="delTips">该商品尚未下架，不可删除！</div>
                  <div class="delArrow"></div>
                </div>
                <div v-else>
                  <div class="confirmText">
                    <span class="el-icon-warning confirmIcon"></span>
                    <span class="confirmTips" v-if="scope.row.status === 'disable'">确定删除该商品？</span>
                  </div>
                  <div class="confirmBtnCon">
                    <el-button type="primary" @click="pSubmit(scope.row.uuid,scope.row.status,'delGoods')">确定</el-button>
                  </div>
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
  import GOODS from 'admin/service/goods-service.js'
  export default {
    name: 'GoodsMg',
    data() {
      return {
        search : {
          title : '',
          status : ''
        },
        selectOptions : [
          {
            value: 'enable',
            label: '上架'
          }, {
            value: 'disable',
            label: '下架'
          }
        ],
        csRole:localStorage.getItem('csRole'),
        columns: [
          {prop: 'title', label: '商品名称', width: '200', align: 'left'}
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
          'title': this.search.title,
          'status':this.search.status
        };
        GOODS.getGoodsList(data)
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
        this.search.status = '';
      },
      // 重新渲染name列
      formatter(row, column, cellValue) {
        // return row.detail | ellipsis;
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
      pSubmit(uuid,status,type) {
        let statusNew = (status === 'disable') ? 'enable' : 'disable';
        let setData = {
          'uuid' : uuid,
          'status': statusNew
        };
        let delData = {
          'uuid' : uuid
        };
        let recommendData = {
          'uuid' : uuid,
          'status': status ? false : true
        };
        if(type === 'setGoodStatus'){
          GOODS.setGoodStatus(setData)
            .then(res => {
              // console.log('res',res);
              if(res.code === "0"){
                this.getList();
              }
            })
        }else if(type === 'delGoods'){
            GOODS.delGood(delData)
              .then(res => {
                // console.log('res',res);
                if(res.code === "0"){
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  this.getList();
                }
              })
        }else if(type === 'setRecommendGood'){
          GOODS.setRecommendGood(recommendData)
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
        }
      },
      //编辑商品
      editGoods(uuid){
        this.$router.push({
          name:'AddGoods',
          query:{
            'uuid' : uuid
          }
        })
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
  .searchSelect{
    width: 224px;
  }

</style>
