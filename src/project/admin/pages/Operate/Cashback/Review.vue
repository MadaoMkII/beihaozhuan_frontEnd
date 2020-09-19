<template>
  <div class="container">
    <el-card shadow="never">
      <div slot="header">审核列表</div>
      <el-table :data="reviewList">
        <el-table-column type="index" />
        <el-table-column prop="name" label="游戏名称" />
        <el-table-column label="测试">
          <template slot-scope="scope">
            <pre>{{ scope.row }}</pre>
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
    };
  },
  async created() {
    this.reviewList = await this.getReviewList();
  },
  methods: {
    async getReviewList() {
      const response = await axios.post('/api2/gameEvent/getAuditUploadRecordList', {
        category: 'STEP' + this.$route.query.step,
        unit: 1000,
        page: 1,
      })
      return response.data.data;
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
