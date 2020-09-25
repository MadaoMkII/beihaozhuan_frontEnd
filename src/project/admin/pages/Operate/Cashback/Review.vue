<template>
  <div class="container">
    <el-card shadow="never">
      <div slot="header">审核列表</div>
      <el-radio-group style="margin-bottom: 20px;" v-model="form.type" @change="onFilter">
        <el-radio-button label="try">试玩任务</el-radio-button>
        <el-radio-button label="A">后续任务A</el-radio-button>
        <el-radio-button label="B">后续任务B</el-radio-button>
      </el-radio-group>
      <el-form :inline="true" :model="form">
        <el-form-item label="账号" class="fix-float">
          <el-input v-model="form.phone" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="状态" class="fix-float">
          <el-select v-model="form.status" placeholder="状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="未审核"></el-option>
            <el-option label="审核未通过" value="审核未通过"></el-option>
            <el-option label="审核通过" value="审核通过"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onFilter" size="mini">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="reviewList">
        <el-table-column type="index" />
        <el-table-column prop="tel_number" label="账号" />
        <el-table-column prop="name" label="游戏名称" />
        <el-table-column label="玩家上传截图">
          <template slot-scope="scope">
            <img :src="scope.row.screenshotUrl" :alt="scope.row.name" width="160" height="90" @click="showPreview(scope.row.screenshotUrl)">
          </template>
        </el-table-column>
        <el-table-column prop="sub_title" label="任务类型">
          <template slot-scope="scope">
            <template v-if="scope.row.sub_title === 'try'">试玩任务</template>
            <template v-else-if="scope.row.sub_title === 'A'">后续任务A</template>
            <template v-else-if="scope.row.sub_title === 'B'">后续任务B</template>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="created_at" label="提交时间" />
        <el-table-column
          fixed="right"
          label="操作"
          width="160"
        >
          <template slot-scope="scope">
            <el-button-group v-if="scope.row.status === '未审核'" size="mini">
              <el-button type="success" size="mini" @click="submitReview(scope.row.uuid,true)">通过</el-button>
              <el-button type="danger" size="mini" @click="submitReview(scope.row.uuid,false)">不通过</el-button>
            </el-button-group>
            <el-button-group v-else-if="scope.row.status === '审核未通过'" size="mini">
              <el-button type="success" size="mini" @click="submitReview(scope.row.uuid,true)">通过</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="getReviewList"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </el-card>
    <div v-if="previewImage !== null" class="preview" @click="closePreview">
      <img :src="previewImage">
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reviewList: [],
      isLoading: false,
      form: {
        type: 'try',
        phone: '',
        status: '',
      },
      page: 1,
      pageSize: 20,
      total: 0,
      previewImage: null,
    };
  },
  async created() {
    await this.getReviewList();
  },
  methods: {
    showPreview(image) {
      this.previewImage = image;
    },
    closePreview() {
      this.previewImage = null;
    },
    async getReviewList() {
      const response = await axios.post('/api/gameEvent/getAuditUploadRecordList', {
        category: 'STEP' + this.$route.query.step,
        unit: this.pageSize + '',
        page: this.page + '',
        tel_number: this.form.phone,
        status: this.form.status,
        sub_title: this.form.type,
        missionUUid: this.$route.query.gameId,
      })
      this.reviewList = response.data.data;
      this.total = response.data.count;
    },
    async submitReview(id, is) {
      if (!is) {
        await this.review(id, is);
        return;
      }
      this.$confirm(`确认${ is ? '通过' : '不通过' }审核嘛?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.review(id, is);
      }).catch(() => { });
    },
    async review(id, is) {
      if (this.isLoading) return;
      try {
        this.isLoading = true;
        await axios.post('/api/gameEvent/approveAuditUploadRecord', {
          decision: is,
          uuid: id
        });
        await this.getReviewList();
        this.$message({
          type: 'success',
          message: '审核成功!'
        });
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
    onFilter() {
      this.page = 1;
      this.getReviewList();
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
  margin-right: 14px;
}
</style>

<style scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview img {
  max-width: 80%;
  max-height: 80%;
}
</style>
