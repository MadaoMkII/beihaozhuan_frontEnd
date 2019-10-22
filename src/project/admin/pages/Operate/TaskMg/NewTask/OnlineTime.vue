<template>
  <div>
    <div class="centerTitle">
      在线时间
    </div>
    <div class="totalTableSize">
      <div class="tipIcon"></div>
      <div class="totalCon">
        在线时间：可配置需要积累的在线时间(单位/分钟)，及奖励的金币数
      </div>
    </div>
    <div class="formCon">
      <div class="formItem">
        <div class="label">任务名称：</div>
        <div class="input">
          <el-input v-model="name" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">在线时间：</div>
        <div class="input numberInput">
          <el-input-number v-model="num" controls-position="right" :min="0"></el-input-number>
        </div>
        <div class="numberText">分钟</div>
      </div>
      <div class="formItem">
        <div class="label">奖励金币：</div>
        <div class="input numberInput">
          <el-input-number v-model="num" controls-position="right" :min="0"></el-input-number>
        </div>
        <div class="numberText">金币</div>
      </div>
      <div class="formItem">
        <div class="label">上传图标：</div>
        <div class="input">
          <el-upload
            class="uploadFile"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList">
            <el-button size="small" class="CoResetBtn" icon="el-icon-upload2">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">支持扩展名：.png .jpg...</div>
          </el-upload>
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
    name: "OnlineTime",
    data(){
      return{
        name : '',
        status : '',
        num : '',
        fileList:[],
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
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
  }
</script>

<style lang="css" scoped>
  .totalCon{
    width: 95%;
  }

</style>
