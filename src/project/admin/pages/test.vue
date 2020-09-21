<template>
  <div>测试登录</div>
</template>

<script>
import axios from 'axios';

export default {
  async created() {
    await axios.post('/api/login', { tel_number: this.$route.query.phone, password: this.$route.query.password });
  },
};
</script>
