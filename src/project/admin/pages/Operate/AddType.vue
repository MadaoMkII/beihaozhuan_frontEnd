<template>
  <div>
    <div class="centerTitle">
      新建类型
    </div>
    <div class="totalTableSize">
      <div class="tipIcon"></div>
      <div class="totalCon">
        广告类型设置
      </div>
    </div>
    <div class="formCon">
      <div class="formItem">
        <div class="label">广告类型：</div>
        <div class="input">
          <el-input v-model="name" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">广告来源：</div>
        <div class="input">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="复选框 A"></el-checkbox>
            <el-checkbox label="复选框 B"></el-checkbox>
            <el-checkbox label="复选框 C"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="formBtnGroup">
        <el-button type="primary" class="CoBtn" @click="saveForm()">保存</el-button>
        <el-button class="CoResetBtn" @click="goPrePage()">返回上一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AddType",
    data(){
      return{
        name : '',
        status : '',
        num : '',
        selectOptions: [
          {
            value: '1',
            label: '上架'
          }, {
            value: '2',
            label: '下架'
          }
        ],
        checkList:[]
      }
    }
  }
</script>

<style lang="css" scoped>
  .totalCon{
    width: 95%;
  }
</style>
