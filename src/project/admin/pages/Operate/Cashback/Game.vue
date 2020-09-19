<template>
  <div class="container">
    <el-card shadow="never">
      <div slot="header">添加 / 编辑游戏</div>
      <div style="margin-bottom: 20px;">所属步骤：{{ getStepText() }}</div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="游戏名称" prop="name" class="fix-float">
          <el-input v-model="form.name" placeholder="请输入游戏名称"></el-input>
        </el-form-item>
        <el-form-item label="所属平台" prop="platform" class="fix-float">
          <el-select v-model="form.platform" placeholder="请选择所属平台" @blur="$refs.form.validateField('platform')">
            <el-option label="通用" value="通用"></el-option>
            <el-option label="安卓" value="安卓"></el-option>
            <el-option label="IOS" value="IOS"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="游戏 Banner 图" prop="bannerFile" class="fix-float">
          <image-upload v-model="form.bannerFile" @change="$refs.form.validateField('bannerFile')"/>
        </el-form-item>
        <el-form-item label="下载链接" prop="downloadURL" class="fix-float">
          <el-input v-model="form.downloadURL" placeholder="请输入下载链接"></el-input>
        </el-form-item>
        <div class="split-line"></div>
        <el-form-item label="试玩描述" prop="description" class="fix-float">
          <el-input v-model="form.description" placeholder="请输入试玩描述"></el-input>
        </el-form-item>
        <el-form-item label="试玩奖励" prop="reward" class="fix-float">
          <el-input v-model.number="form.reward" placeholder="请输入试玩奖励">
            <template slot="append">金币</template>
          </el-input>
        </el-form-item>
        <el-form-item label="试玩示意图" prop="demoFile" class="fix-float">
          <image-upload v-model="form.demoFile" @change="$refs.form.validateField('demoFile')"/>
        </el-form-item>
        <div class="split-line"></div>
        <el-form-item label="是否开启后续任务A" prop="taskAEnableTask" class="fix-float">
          <el-switch v-model="form.taskAEnableTask"></el-switch>
        </el-form-item>
        <template v-if="form.taskAEnableTask">
          <el-form-item label="后续A任务描述" prop="taskADescription" class="fix-float">
            <el-input v-model="form.taskADescription" placeholder="请输入后续A任务描述"></el-input>
          </el-form-item>
          <el-form-item label="后续A任务奖励" prop="taskAReward" class="fix-float">
            <el-input v-model.number="form.taskAReward" placeholder="请输入后续A任务奖励"></el-input>
          </el-form-item>
          <el-form-item label="后续A任务示意图" prop="taskADemoFile" class="fix-float">
            <image-upload v-model="form.taskADemoFile" @change="$refs.form.validateField('taskADemoFile')"/>
          </el-form-item>
        </template>
        <div class="split-line"></div>
        <el-form-item label="是否开启后续任务B" prop="taskBEnableTask" class="fix-float">
          <el-switch v-model="form.taskBEnableTask"></el-switch>
        </el-form-item>
        <template v-if="form.taskBEnableTask">
          <el-form-item label="后续B任务描述" prop="taskBDescription" class="fix-float">
            <el-input v-model="form.taskBDescription" placeholder="请输入后续B任务奖励"></el-input>
          </el-form-item>
          <el-form-item label="后续B任务奖励" prop="taskBReward" class="fix-float">
            <el-input v-model.number="form.taskBReward" placeholder="请输入后续B任务奖励"></el-input>
          </el-form-item>
          <el-form-item label="后续B任务示意图" prop="taskBDemoFile" class="fix-float">
            <image-upload v-model="form.taskBDemoFile" @change="$refs.form.validateField('taskBDemoFile')"/>
          </el-form-item>
        </template>
        <div class="split-line"></div>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" :disabled="isLoading">保存</el-button>
          <el-button @click="$router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';
import ImageUpload from 'admin/components/ImageUpload';

export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      form: {
        name: '',
        platform: '',
        bannerFile: 'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/EventProof/7539232096617.jpg',
        downloadURL: '',
        description: '',
        reward: '',
        demoFile: 'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/EventProof/7539232096617.jpg',
        taskAEnableTask: false,
        taskADescription: '',
        taskAReward: '',
        taskADemoFile: 'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/EventProof/7539232096617.jpg',
        taskBEnableTask: false,
        taskBDescription: '',
        taskBReward: '',
        taskBDemoFile: 'https://beihaozhuan.oss-cn-zhangjiakou.aliyuncs.com/EventProof/7539232096617.jpg',
      },
      rules: {
        name: [
          { required: true, message: '请输入游戏名称', trigger: 'blur' },
          { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
        ],
        platform: [
          { required: true, message: '请选择所属平台', trigger: 'change' },
        ],
        bannerFile: [
          { required: true, message: '请选择游戏 Banner 图', trigger: 'change' },
        ],
        downloadURL: [
          { type: 'url', required: true, message: '请输入正确的下载链接', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入试玩描述', trigger: 'blur' },
          { min: 3, max: 250, message: '长度在 1 到 250 个字符', trigger: 'blur' },
        ],
        reward: [
          { type: 'integer', required: true, message: '请输入正确的金币数量', trigger: 'blur' },
        ],
        demoFile: [
          { required: true, message: '请选择试玩示意图', trigger: 'change' },
        ],
        taskADescription: [
          { required: true, message: '请输入后续A任务描述', trigger: 'blur' },
          { min: 3, max: 250, message: '长度在 1 到 250 个字符', trigger: 'blur' },
        ],
        taskAReward: [
          { type: 'integer', required: true, message: '请输入正确的金币数量', trigger: 'blur' },
        ],
        taskADemoFile: [
          { required: true, message: '请选择后续A任务示意图', trigger: 'change' },
        ],
        taskBDescription: [
          { required: true, message: '请输入后续B任务描述', trigger: 'blur' },
          { min: 3, max: 250, message: '长度在 1 到 250 个字符', trigger: 'blur' },
        ],
        taskBReward: [
          { type: 'integer', required: true, message: '请输入正确的金币数量', trigger: 'blur' },
        ],
        taskBDemoFile: [
          { required: true, message: '请选择后续B任务示意图', trigger: 'change' },
        ],
      },
      isLoading: false,
    };
  },
  created() {
    if (this.$route.query.type === 'edit') {
      const payload = JSON.parse(this.$route.query.payload);
      this.form.name = payload.gameName;
      this.form.platform = payload.platform;
      this.form.bannerFile = payload.gameBannerUrl;
      this.form.downloadURL = payload.downloadUrl;
      this.form.description = payload.demoDescription;
      this.form.reward = payload.demoReward;
      this.form.demoFile = payload.demoSketchUrl;
      this.form.taskAEnableTask = payload.subsequent_A.available;
      this.form.taskADescription = payload.subsequent_A.subsequentDescription;
      this.form.taskAReward = payload.subsequent_A.subsequentReward;
      this.form.taskADemoFile = payload.subsequent_A.subsequentSketchUrl;
      this.form.taskBEnableTask = payload.subsequent_B.available;
      this.form.taskBDescription = payload.subsequent_B.subsequentDescription;
      this.form.taskBReward = payload.subsequent_B.subsequentReward;
      this.form.taskBDemoFile = payload.subsequent_B.subsequentSketchUrl;
    }
  },
  methods: {
    getStepText() {
      switch (this.$route.query.step) {
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
      switch (this.$route.query.type) {
        case 'add':
          await this.submitAddForm(formName);
          break;
        case 'edit':
          await this.submitEditForm(formName);
          break;
        default:
          break;
      }
    },
    async submitAddForm(formName) {
      if (!await this.isValidForm(formName)) {
        return;
      }
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        await axios.post('/api2/gameEvent/createEventGameSetting', {
          category: 'STEP' + this.$route.query.step,
          gameName: this.form.name,
          platform: this.form.platform,
          gameBannerUrl: this.form.bannerFile,
          downloadUrl: this.form.downloadURL,
          demoDescription: this.form.description,
          demoReward: this.form.reward,
          demoSketchUrl: this.form.demoFile,
          subsequent_A: {
            available: this.form.taskAEnableTask,
            subsequentDescription: this.form.taskADescription,
            subsequentReward: this.form.taskAReward,
            subsequentSketchUrl: this.form.taskADemoFile,
          },
          subsequent_B: {
            available: this.form.taskBEnableTask,
            subsequentDescription: this.form.taskBDescription,
            subsequentReward: this.form.taskBReward,
            subsequentSketchUrl: this.form.taskBDemoFile,
          },
        });
        this.$message({
          type: 'success',
          message: '游戏添加成功!'
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
    async submitEditForm(formName) {
      if (!await this.isValidForm(formName)) {
        return;
      }
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        await axios.post('/api2/gameEvent/updateEventGameSetting', {
          uuid: this.$route.query.id,
          category: 'STEP' + this.$route.query.step,
          gameName: this.form.name,
          platform: this.form.platform,
          gameBannerUrl: this.form.bannerFile,
          downloadUrl: this.form.downloadURL,
          demoDescription: this.form.description,
          demoReward: this.form.reward,
          demoSketchUrl: this.form.demoFile,
          subsequent_A: {
            available: this.form.taskAEnableTask,
            subsequentDescription: this.form.taskADescription,
            subsequentReward: this.form.taskAReward,
            subsequentSketchUrl: this.form.taskADemoFile,
          },
          subsequent_B: {
            available: this.form.taskBEnableTask,
            subsequentDescription: this.form.taskBDescription,
            subsequentReward: this.form.taskBReward,
            subsequentSketchUrl: this.form.taskBDemoFile,
          },
        });
        this.$message({
          type: 'success',
          message: '游戏编辑成功!'
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
