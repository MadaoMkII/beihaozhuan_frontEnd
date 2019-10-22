<template>
  <div>
    <div class="centerTitle">
      新增广告位
    </div>
    <div class="formCon">
      <div class="formItem">
        <div class="label">广告位名称：</div>
        <div class="input">
          <el-input v-model="name" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">广告位：</div>
        <div class="input">
          <el-select v-model="status" :popper-append-to-body = false placeholder="请选择">
            <el-option
              v-for="item in selectOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="formItem">
        <div class="label">尺寸：</div>
        <div class="numLabel">长</div>
        <div class="input numberInput">
          <el-input-number v-model="num" controls-position="right" :min="0"></el-input-number>
        </div>
        <div class="numberText">PX</div>

        <div class="numLabel">宽</div>
        <div class="input numberInput">
          <el-input-number v-model="num" controls-position="right" :min="0"></el-input-number>
        </div>
        <div class="numberText">PX</div>
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
    name: "AddSeat",
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
  .numLabel{
    width: 24px;
    height: 32px;
    line-height: 32px;
    float: left;
  }
  .numberText{
    width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    margin-left: 8px;
    margin-right: 40px;
  }







</style>
