<template>
  <div>
    <div style="margin-bottom: 20px; text-align: right;">
      <el-button v-if="$route.params.step !== '1'" type="primary" @click="$router.push({ name: 'CashbackGame', query: { step: $route.params.step, type: 'add' } })">添加游戏</el-button>
      <el-button type="primary" @click="$router.push({ name: 'CashbackStepSetting', params: { step: $route.params.step } })">步骤设置</el-button>
    </div>
    <el-table :data="gameList">
      <el-table-column type="index" />
      <el-table-column label="LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.gameBannerUrl" :alt="scope.row.gameName" width="160" height="90">
        </template>
      </el-table-column>
      <el-table-column prop="gameName" label="游戏名称" />
      <el-table-column prop="platform" label="平台" />
      <el-table-column prop="demoReward" label="试玩奖励" />
      <el-table-column prop="subsequent_A.subsequentReward" label="后续A任务奖励" />
      <el-table-column prop="subsequent_B.subsequentReward" label="后续B任务奖励" />
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="$router.push({ name: 'CashbackGame', query: { step: $route.params.step, type: 'edit', id: scope.row.uuid, payload: JSON.stringify(scope.row) } })">编辑</el-button>
          <el-button v-if="$route.params.step !== '1'" type="text" @click="deleteGame(scope.row.uuid)">删除</el-button>
          <el-button type="text" @click="$router.push({ name: 'CashbackReview', query: { step: $route.params.step } })">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      gameList: [],
    };
  },
  async created() {
    this.gameList = await this.getGameList();
  },
  methods: {
    async getGameList() {
      const response = await axios.post('/api/gameEvent/getEventGameSettingList', {
        category: 'STEP' + this.$route.params.step
      })
      return response.data.data;
    },
    async deleteGame(id) {
      this.$confirm('此操作将永久删除该游戏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try {
          await axios.post('/api/gameEvent/deleteEventGameSetting', {
            uuid: id
          });
          this.gameList.splice(this.gameList.findIndex(game => game.uuid === id), 1);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        } catch (e) {
          if (e.response.data && e.response.data.message) {
            this.$message({ type: 'error', message: e.response.data.message });
          } else {
            this.$message({ type: 'error', message: '请求失败，服务器发生错误' });
          }
        }
      }).catch(() => { });
    },
  },
};
</script>
