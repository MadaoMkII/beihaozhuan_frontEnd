<template>
  <div>
    <div class="centerTitle" v-if="uuid != ''">
      编辑管理员
    </div>
    <div class="centerTitle" v-else>
      新建管理员
    </div>
    <div class="formCon">
      <div class="formItem">
        <div class="label">管理员姓名：</div>
        <div class="input">
          <el-input v-model="realName" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">手机号：</div>
        <div class="input">
          <el-input v-model="tel_number" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">权限分配：</div>
        <div class="input">
          <el-radio v-model="role" label="运营">运营</el-radio>
          <el-radio v-model="role" label="客服">客服</el-radio>
<!--          <el-radio v-model="role" label="User">普通用户</el-radio>-->
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
  import SYSTEM from 'admin/service/system-service.js'
  export default {
    name: "AddAdministrators",
    data(){
      return{
        uuid: '',
        realName : '',
        tel_number : '',
        role: '客服'
      }
    },
    created(){
      let data = this.$route.query;
      this.uuid = this.$route.query.uuid;
      if(this.uuid && this.uuid != ''){
        this.realName = data.realName;
        this.tel_number = data.tel_number;
        this.role = data.role;
      }
    },
    methods:{
      saveForm(){
        let realNameRule = this.isEmpty(this.realName);
        let tel_numberRule = this.isEmpty(this.tel_number);
        let roleRule = this.isEmpty(this.role);

        if(realNameRule || tel_numberRule || roleRule){
          this.$alert('请将信息填写完整', '', {
            confirmButtonText: '确定'
          });
          return false;
        }
        let data = {
          'realName' : this.realName,
          'tel_number' : this.tel_number,
          'role' : this.role
        };
        if(this.uuid && this.uuid != ''){
          data.uuid = this.uuid;
          SYSTEM.updateAdmin(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.goPrePage();
              }
            })
        }else {
          SYSTEM.setUserAdmin(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                this.goPrePage();
              }
            })
        }
      }
    }
  }
</script>

<style lang="css" scoped>
  .totalCon{
    width: 95%;
  }
</style>
