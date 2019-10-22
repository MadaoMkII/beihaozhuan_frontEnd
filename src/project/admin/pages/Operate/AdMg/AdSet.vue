<template>
    <div>
      <div class="searchCon">
        <div class="searchItem">
          <div class="searchLabel">广告名称：</div>
          <div class="searchInput">
            <el-input class="searchItem" v-model="search.title" placeholder="请输入"></el-input>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchLabel">广告位：</div>
          <div class="searchInput searchSelect">
            <el-select v-model="search.positionName" :popper-append-to-body = false placeholder="请选择">
              <el-option
                v-for="item in positionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchLabel">广告来源：</div>
          <div class="searchInput searchSelect">
            <el-select v-model="search.source" :popper-append-to-body = false placeholder="请选择">
              <el-option
                v-for="item in sourceOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="searchItem">
          <div class="searchLabel">状态：</div>
          <div class="searchInput searchSelect">
            <el-select v-model="search.activity" :popper-append-to-body = false placeholder="请选择">
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
          <el-button class="CoResetBtn"  @click="reset()">重置</el-button>
        </div>
      </div>
      <div class="btnGroupCon" v-if="csRole === 'false'">
        <el-button type="primary" class="CoBtn" icon="el-icon-plus" @click="goAddAds()">新建广告</el-button>
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
              <div v-if="scope.row.activity === 'disable'">
                <el-badge is-dot class="dots" type="danger"></el-badge>
                <span>下架</span>
              </div>
              <div v-if="scope.row.activity === 'enable'">
                <el-badge is-dot class="dots" type="success"></el-badge>
                <span>上架</span>
              </div>

            </template>
          </el-table-column>

          <el-table-column slot="table_oper" align="center" label="操作" width="200" :resizable="false" fixed="right">
            <template slot-scope="scope">
              <div class="tableBtn" @click="editAds(scope.row)">
                <el-button type="text">编辑</el-button>
              </div>

              <el-divider direction="vertical" v-if="csRole === 'false'"></el-divider>
              <div class="tableBtn"  v-if="csRole === 'false'">
                <el-popover trigger="hover" placement="top">
                  <div class="confirmText">
                    <span class="el-icon-warning confirmIcon"></span>
                    <span class="confirmTips" v-if="scope.row.activity === 'disable'">是否上架该商品？</span>
                    <span class="confirmTips" v-if="scope.row.activity === 'enable'">是否下架该商品？</span>
                  </div>
                  <div class="confirmBtnCon">
                    <el-button type="primary" @click="pSubmit(scope.row.uuid,scope.row.activity,'setAdStatus')">确定</el-button>
                  </div>
                  <div slot="reference">
                    <el-button type="text" v-if="scope.row.activity === 'disable'">上架</el-button>
                    <el-button type="text" v-if="scope.row.activity === 'enable'">下架</el-button>
                  </div>
                </el-popover>
              </div>

              <el-divider direction="vertical"  v-if="csRole === 'false'"></el-divider>

              <div class="tableBtn" v-if="csRole === 'false'">
                <el-popover trigger="hover" placement="top">
                  <div v-if="scope.row.activity === 'enable'">
                    <div class="delTips">该商品尚未下架，不可删除！</div>
                    <div class="delArrow"></div>
                  </div>
                  <div v-else>
                    <div class="confirmText">
                      <span class="el-icon-warning confirmIcon"></span>
                      <span class="confirmTips" v-if="scope.row.activity === 'disable'">确定删除该商品？</span>
                    </div>
                    <div class="confirmBtnCon">
                      <el-button type="primary" @click="pSubmit(scope.row.uuid,scope.row.activity,'delAds')">确定</el-button>
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
  import AD from 'admin/service/advertisement-service.js'
    export default {
      name: "AdSet",
      data() {
        return {
          csRole:localStorage.getItem('csRole'),
          search: {
            title: '',
            positionName: '',
            source: '',
            activity: '',
          },
          selectOptions: [
            {
              value: 'enable',
              label: '上架'
            }, {
              value: 'disable',
              label: '下架'
            }
          ],
          positionOptions:[
            {
              value: '首页banner',
              label: '首页banner'
            }, {
              value: '任务banner',
              label: '任务banner'
            }, {
              value: '商城banner',
              label: '商城banner'
            }, {
              value: '个人中心banner',
              label: '个人中心banner'
            }, {
              value: '任务频道',
              label: '任务频道'
            }
          ],
          sourceOptions:[
            {
              value: 'banner',
              label: 'banner'
            }, {
              value: 'native',
              label: 'native'
            }, {
              value: 'full',
              label: 'full'
            },{
              value: '单图片',
              label: '单图片'
            }
          ],
          columns: [
            {prop: 'title', label: '广告名称', width: '200', align: 'left'},
            {prop: 'positionName', label: '广告位置', width: '200', align: 'left'},
            {prop: 'source', label: '广告来源', align: 'right',width: '96'},
            {prop: 'reward', label: '佣金金币数', align: 'right',width: '100'},
            {prop: 'coin', label: '点击次数', align: 'right',width: '96'}
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
            'title':this.search.title,
            'positionName':this.search.positionName,
            'source':this.search.source,
            'activity':this.search.activity
          };
          AD.getAdvertisement(data)
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
          this.search.activity = '';
          this.search.positionName = '';
          this.search.source = '';
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
        goAddAds(){
          this.$router.push({
            name:'AddPoster',
          })
        },
        //弹窗中确认按钮
        pSubmit(uuid,status,type) {
          let statusNew = (status === 'disable') ? 'enable' : 'disable';
          if(type === 'setAdStatus'){
            let data = {
              'uuid': uuid,
              'activity': statusNew
            };
            AD.setAdvertisementActivity(data)
              .then(res => {
                // console.log('res',res);
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                  this.getList();
              })
          }else if(type === 'delAds'){
            let data = {
              'uuid': uuid,
            };
            AD.deleteAdvertisement(data)
              .then(res => {
                // console.log('res',res);
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.getList();
              })
          }
        },
        //编辑
        editAds(data){
          this.$router.push({
            name:'AddPoster',
            query:{
              data:data
            }
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
