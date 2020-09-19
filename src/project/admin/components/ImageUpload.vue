<template>
  <div class="image-upload-component">
    <div v-if="!showcase" class="image-upload-component__placeholder">
      <i class="el-icon-plus"></i>
    </div>
    <img v-if="showcase" class="image-upload-component__showcase" :src="showcase" alt="上传截图">
    <input
      ref="input"
      class="image-upload-component__input"
      type="file"
      accept="image/*"
      @change="onChange"
    >
    <div v-if="showcase && !isUploading" class="image-upload-component__clear" @click="clear">
      <i class="el-icon-circle-close"></i>
    </div>
    <div v-if="isUploading" class="image-upload-component__uploading">
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<style scoped>
.image-upload-component {
  display: block;
  width: 104px;
  height: 104px;
  position: relative;
}
.image-upload-component__input {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
}

.image-upload-component__showcase {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  display: block;
}

.image-upload-component__placeholder {
  border-radius: 8px;
  border: 1px dashed #ccc;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 48px;
}

.image-upload-component__clear {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  right: 0;
  font-size: 40px;
  transform: translateY(-50%) translateX(50%);
  color: #ccc;
}

.image-upload-component__uploading {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
}
</style>

<script>
import axios from "axios";

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isUploading: false,
      showcase: null,
    };
  },
  created() {
    if (this.value !== '') {
      this.showcase = this.value;
    }
  },
  methods: {
    readAsDataURL(input) {
      const file = input.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        this.showcase = e.target.result;
        this.$emit('change', '');
        this.upload(file);
      };
      fileReader.readAsDataURL(file);
    },
    async upload(file) {
      if (this.isUploading) return;
      try {
        this.isUploading = true;
        const formData = new FormData();
        formData.append('files[]', file);
        const response = await axios.post('/api2/images/uploadImages', formData);
        this.$emit('change', response.data.data);
      } catch (e) {
        if (e.response.data && e.response.data.message) {
          this.$message({ type: 'error', message: e.response.data.message });
        } else {
          this.$message({ type: 'error', message: '请求失败，服务器发生错误' });
        }
      } finally {
        this.isUploading = false;
      }
    },
    onChange(e) {
      const file = e.target.files[0];
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return;
      }
      this.readAsDataURL(e.target);
    },
    clear() {
      this.$refs.input.value = '';
      this.showcase = null;
      this.$emit('change', '');
    },
  },
};
</script>
