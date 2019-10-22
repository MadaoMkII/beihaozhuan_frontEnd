<template>
  <div>
    <div class="centerTitle">
      信息配置
    </div>
    <div class="totalTableSize">
      <div class="tipIcon"></div>
      <div class="totalCon">
        完善用户信息配置：可配置给予用户的金币数
      </div>
    </div>
    <div class="formCon">
      <div class="formItem">
        <div class="label">任务名称：</div>
        <div class="input">
          <el-input v-model="data.title" placeholder="请输入" :disabled="true"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">奖励金币：</div>
        <div class="input numberInput">
          <el-input-number v-model="data.reward" controls-position="right" :min="0"></el-input-number>
        </div>
        <div class="numberText">金币</div>
      </div>
      <div class="formItem">
        <div class="label">上传图标：</div>
        <div class="input">
          <el-upload
            class="uploadFile"
            list-type="picture"
            action="https://jsonplaceholder.typicode.com/posts/9"
            :auto-upload="false"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :on-change="saveToUrl"
            :limit="1"
            :file-list="fileList">
            <el-button size="small" class="CoResetBtn" icon="el-icon-upload2">上传文件</el-button>
            <div slot="tip" class="el-upload__tip">支持扩展名：.png .jpg...（建议上传尺寸 48px*48px）</div>
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
  import TASK from 'admin/service/task-service.js'
  import urlToFile from '@/utils/urlToFile.js'
  export default {
    name: "InfoSet",
    data(){
      return{
        fileList:[],
        data:{},
        fileArray:[]
      }
    },
    created(){
      this.data = this.$route.query;
      console.log('传过来的数据',this.data)
      let imgUrl = this.data.imgUrl;
      if(imgUrl && imgUrl != ''){
        let imgFileItem = [{
          'url' : this.data.imgUrl
        }];
        this.fileList = imgFileItem;
        urlToFile.imgUrlToFile(imgUrl,
          '图片文件').then(fileObj => {
          console.log('图片文件111', fileObj); // 打印出来的file类型
          this.fileArray.push(fileObj);
        });
      }
    },
    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileArray = [];
      },
      saveToUrl(event,fileList){
        this.fileArray.push(event.raw)
      },
      handleExceed(files, fileList) {
        this.$message.warning('只能上传一个图标');
      },
      //表单保存
      saveForm() {
        this.$confirm('是否保存表单信息?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          let fileArrayRule = this.isEmpty(this.fileArray);
          let rewardRule = this.isEmpty(this.data.reward);

          if(fileArrayRule || rewardRule){
            this.$alert('请将信息填写完整', '', {
              confirmButtonText: '确定'
            });
            return false;
          }
          let formData = new FormData();

          formData.append('fileArray', this.fileArray[0]);
          formData.append('reward', this.data.reward.toString());
          formData.append('uuid', this.data.uuid);

          TASK.updateMission(formData)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.$message({
                  type: 'success',
                  message: '保存成功'
                });
                this.$router.go(-1);
              }
            })

        }).catch(() => {
          console.log('表单提交弹窗中点击了取消按钮');
        });

      }
    }
  }
</script>

<style lang="css" scoped>
  .totalCon{
    width: 95%;
  }

</style>
