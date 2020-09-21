<template>
  <div class="container">
    <el-card shadow="never">
      <div slot="header">审核列表</div>
      <el-table :data="reviewList">
        <el-table-column type="index" />
        <el-table-column prop="name" label="游戏名称" />
        <el-table-column label="玩家上传截图">
          <template slot-scope="scope">
            <img :src="scope.row.screenshotUrl" :alt="scope.row.name" width="160" height="90">
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
          label="操作">
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
    </el-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      reviewList: [],
      isLoading: false,
    };
  },
  async created() {
    this.reviewList = await this.getReviewList();
  },
  methods: {
    async getReviewList() {
      const response = await axios.post('/api/gameEvent/getAuditUploadRecordList', {
        category: 'STEP' + this.$route.query.step,
        unit: 1000,
        page: 1,
      })
      return response.data.data;
    },
    async submitReview(id, is) {
      this.$confirm(`确认${ is ? '通过' : '不通过' }审核嘛?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        if (this.isLoading) return;
        try {
          this.isLoading = true;
          await axios.post('/api/gameEvent/approveAuditUploadRecord', {
            decision: is,
            uuid: id
          });
          this.reviewList = await this.getReviewList();
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
      }).catch(() => { });
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
</style>
