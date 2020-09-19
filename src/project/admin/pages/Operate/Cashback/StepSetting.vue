<template>
  <div class="container">
    <el-card shadow="never">
      <div slot="header">步骤设置</div>
      <div style="margin-bottom: 20px;">所属步骤：{{ getStepText() }}</div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="一句话描述" prop="description" class="fix-float">
          <el-input v-model="form.description" placeholder="请输入一句话描述"></el-input>
        </el-form-item>
        <el-form-item label="预期收益" prop="reward" class="fix-float">
          <el-input v-model.number="form.reward" placeholder="请输入预期收益">
            <template slot="append">金币</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="$route.params.step === '1'" label="注册奖励" prop="registerReward" class="fix-float">
          <el-input v-model.number="form.registerReward" placeholder="请输入预期收益">
            <template slot="append">金币</template>
          </el-input>
        </el-form-item>
        <div class="split-line"></div>
        <el-form-item label="视频教程链接" prop="videoURL" class="fix-float">
          <el-input v-model="form.videoURL" placeholder="请输入视频教程链接"></el-input>
        </el-form-item>
        <el-form-item label="首次观看任务视频奖励" prop="firstReward" class="fix-float">
          <el-input v-model.number="form.firstReward" placeholder="请输入预期收益">
            <template slot="append">金币</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :disabled="isLoading">保存</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async created() {
    console.log(await this.getSetting());
  },
  data() {
    return {
      form: {
        description: '',
        reward: '',
        registerReward: '',
        videoURL: '',
        firstReward: '',
      },
      rules: {
        description: [
          { required: true, message: '请输入试玩描述', trigger: 'blur' },
          { min: 3, max: 250, message: '长度在 1 到 250 个字符', trigger: 'blur' },
        ],
        reward: [
          { type: 'integer', required: true, message: '请输入正确的金币数量', trigger: 'blur' },
        ],
        registerReward: [
          { type: 'integer', required: true, message: '请输入正确的金币数量', trigger: 'blur' },
        ],
        videoURL: [
          { type: 'url', required: true, message: '请输入正确的视频教程链接', trigger: 'blur' },
        ],
        firstReward: [
          { type: 'integer', required: true, message: '请输入正确的金币数量', trigger: 'blur' },
        ],
      },
      isLoading: false,
    };
  },
  methods: {
    getStepText() {
      switch (this.$route.params.step) {
        case '1':
          return '第一步';
        case '2':
          return '第二步';
        case '3':
          return '第三步';
        case '4':
          return '第四步';
        case '5':
          return '第五步';
        case '6':
          return '第六步';
        default:
          return '???';
      }
    },
    isValidForm(formName) {
      return new Promise((resolve, reject) => {
        this.$refs[formName].validate((valid) => {
          resolve(valid);
        });
      })
    },
    async submitForm(formName) {
      if (!await this.isValidForm(formName)) {
        return;
      }
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        await axios.post('/api2/gameEvent/setGameEvent', {
          category: 'STEP' + this.$route.params.step,
          description_short: this.form.description,
          expectEarning: this.form.reward,
          videoTutorialUrl: this.form.videoURL,
          firstWatchEarning: this.form.firstReward,
        });
        this.$message({
          type: 'success',
          message: '步骤设置保存成功!'
        });
        this.$router.back();
      } catch (e) {
        if (e.response.data && e.response.data.message) {
          this.$message({ type: 'error', message: e.response.data.message });
        } else {
          this.$message({ type: 'error', message: '请求失败，服务器发生错误' });
        }
      } finally {
        this.isLoading = false;
      }
    },
    async getSetting() {
      const response = await axios.post('/api2/gameEvent/getEventGameByCategory', {
        category: 'STEP' + this.$route.params.step
      })
      console.log(response);
      return response.data.data;
    }
  },
};
</script>

<style lang="css" scoped>
.container {
  margin: 24px auto;
  width: 1152px;
  background: #fff;
  border-radius: 4px;
}

.fix-float >>> .el-form-item__label {
  float: none;
}

.split-line {
  margin: 40px 0;
  border-bottom: 1px solid #EBEEF5;
}
</style>
