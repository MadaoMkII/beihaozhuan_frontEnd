<template>
  <div>
    <div class="centerTitle" v-if="uuid">
      编辑商品
    </div>
    <div class="centerTitle" v-else>
      新建商品
    </div>
    <div class="formCon">
      <div class="formItem">
        <div class="label">商品名称：</div>
        <div class="input">
          <el-input v-model="title" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">库存：</div>
        <div class="input numberInput">
          <el-input-number v-model="inventory" controls-position="right" :min="1"></el-input-number>
        </div>
      </div>
      <div class="formItem">
        <div class="label">保单链接：</div>
        <div class="input">
          <el-input v-model="insuranceLink" placeholder="请输入"></el-input>
        </div>
      </div>
      <div class="formItem">
        <div class="label">支付方式：</div>
        <div class="input">
          <el-checkbox v-model="checked">金币</el-checkbox>
        </div>
      </div>
      <div class="formItem">
        <div class="label">价格：</div>
        <div class="input numberInput">
          <el-input-number v-model="price" controls-position="right" :min="1"></el-input-number>
        </div>
        <div class="numberText">金币</div>
      </div>
      <div class="formItem">
        <div class="label">首图：</div>
        <div class="input">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/9"
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :file-list="mainlyFile"
            :on-exceed="handleExceed"
            :on-change="mainlyImgSaveToUrl"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemoveMainly">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="uploadTips">只支持.jpg 格式</div>
        </div>
      </div>
      <div class="formItem">
        <div class="label">轮播图：</div>
        <div class="input">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/9"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="imgFileList"
            :on-change="imgSaveToUrl"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="uploadTips">只支持.jpg 格式</div>
        </div>
      </div>
      <div class="formItem">
        <div class="label">描述：</div>
        <div class="input">
          <quill-editor ref="text" v-model="description" class="myQuillEditor"/>
        </div>
      </div>
      <div class="formBtnGroup">
        <el-button type="primary" class="CoBtn" @click="saveForm()" v-if="csRole === 'false'">保存</el-button>
        <el-button class="CoResetBtn" @click="goPrePage()">返回上一页</el-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { quillEditor } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import GOODS from 'admin/service/goods-service.js'
  import  axios from 'axios'
    export default {
      name: "AddGoods",
      data(){
        return {
          csRole:localStorage.getItem('csRole'),
          uuid : '',
          title : '',
          description : '',
          inventory : '',
          price: '',
          insuranceLink : '',
          checked: true,
          imageUrl: '',
          dialogImageUrl: '',
          dialogVisible: false,
          content: '',
          mainlyFile:[],
          imgFileList : [],
          mainlyFileArray:[],
          imgFileListArray:[],
          newImgFileListArray : []
        }
      },
      components: {
        quillEditor
      },
      created(){
        this.uuid = this.$route.query.uuid;
        if(this.uuid && this.uuid != ''){
          this.getGoodsInfo();
        }
      },
      methods:{
        //如果是编辑页面，先获取商品信息
        getGoodsInfo(){
          let uuid = this.uuid;
          let data ={
            'page' : 1,
            'unit': 10,
            'uuid':uuid
          };
          GOODS.getGoodsList(data)
            .then(res => {
              console.log('res',res);
              if(res.code === "0"){
                this.showGoodsInfo(res.data[0]);  //回显商品信息
              }
            })
        },
        //回显商品信息
        showGoodsInfo(data){
          this.title = data.title;
          this.description = data.description;
          this.inventory = data.inventory;
          this.price = data.price;
          this.insuranceLink = data.insuranceLink;
          let mainlyFileItem = [{
            'url' : data.mainlyShowPicUrl
          }];
          this.mainlyFile = mainlyFileItem;
          let slideShowPicUrlArray = data.slideShowPicUrlArray;
          let newSlideShowPicUrlArray = [];
          for (let i=0;i<slideShowPicUrlArray.length;i++){
            let item = {
              'url' : slideShowPicUrlArray[i]
            }
            newSlideShowPicUrlArray.push(item);
          }
          this.imgFileList = newSlideShowPicUrlArray;
        },
        //将服务器上的图片本地化转换为base64
        async readFile(url){
          let that = this;
          return new Promise((resolve, reject) => {
            axios({
              method: 'get',
              url: url,
              responseType: 'blob'
            })
              .then(function (blob) {
                let reader = new FileReader();
                let base = '';
                reader.onloadend = function () {
                  // console.log('base64', reader.result); // 转换后的base64图片编码
                  base =  reader.result;
                  resolve(reader.result);
                };
                reader.readAsDataURL(blob.data);
              })
          });
        },
        // 将base64转换成file
         base64toFile(base, name){
          var arr = base.split(',');
          var mime = arr[0].match(/:(.*?);/)[1];
          var bstr = atob(arr[1]);
          var n = bstr.length;
          var u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          //转换成file对象
          return new File([u8arr], name, {
            type: mime
          });
        },
        //图片转换公共方法
        async imgUrlToFile(url, name = 'file'){
          let fileObj = {};
          let that = this;
          await that.readFile(url).then(base => {
            fileObj = that.base64toFile(base, name);
          });
          return fileObj;
        },

        beforeAvatarUpload(file) {
          const isPNG = file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;
          console.log('file',file)
          if (!isPNG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          // if (!isLt2M) {
          //   this.$message.error('上传头像图片大小不能超过 2MB!');
          // }
          return isPNG;
        },

        handleRemove(file, fileList) {
          this.imgFileListArray = [];
          for(let i=0;i<fileList.length;i++){
            let itemFile = fileList[i];
            this.imgFileListArray.push(itemFile);
          }
        },
        handleRemoveMainly(file, fileList){
          this.mainlyFileArray = [];
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        //表单保存
        saveForm(){
          this.$confirm('是否保存表单信息?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            let uuid = this.$route.query.uuid;
            let that = this;

            let promiseArray = [];
            let newImgFileListArray = [];
            if (this.mainlyFileArray.length == 0 && this.uuid) {
              promiseArray.push(this.resetMainImgs());
            }

            if (this.imgFileListArray.length == 0 && this.uuid) {
              for (let i = 0; i < this.imgFileList.length; i++) {
                let url = this.imgFileList[i].url;
                promiseArray.push(this.resetListImgs(url));
              }
              this.imgFileListArray = this.newImgFileListArray;
            } else if (this.imgFileListArray.length > 0 && this.uuid) {
              for (let i=0;i<this.imgFileListArray.length;i++){
                if (this.imgFileListArray[i].status === 'success') {
                  let url = this.imgFileListArray[i].url;
                  promiseArray.push(this.resetListImgs(url));
                }else {
                  console.log('新上传的图片')
                  let file = this.imgFileListArray[i].raw;
                  this.newImgFileListArray.push(file);
                }
              }
              this.imgFileListArray = this.newImgFileListArray;
            }else if(this.imgFileListArray.length > 0 && !this.uuid){
              let newImgFileListArray = [];
              for (let i = 0; i < this.imgFileListArray.length; i++) {
                let file = this.imgFileListArray[i].raw;
                newImgFileListArray.push(file);
              }
              this.imgFileListArray = newImgFileListArray;
            }

            if(promiseArray.length > 0) {
              let that = this;
              Promise.all(promiseArray).then(function (res) {
                console.log('都执行完的数据', res);
                that.submitData();
              });
            }else {
              this.submitData();
            }


            }).catch(() => {
              console.log('表单提交弹窗中点击了取消按钮');
            });
        },

        // 将除图片外的公共数据和提交方法封装
        submitData(){
          let formData = new FormData();
          let imgFileListArray = this.imgFileListArray;

          let imgFileListArrayRule = this.isEmpty(imgFileListArray);
          let mainlyFileArrayRule = this.isEmpty(this.mainlyFileArray);
          let titleRule = this.isEmpty(this.title);
          let priceRule = this.isEmpty(this.price);
          let descriptionRule = this.isEmpty(this.description);
          let inventoryRule = this.isEmpty(this.inventory);
          let insuranceLinkRule = this.isEmpty(this.insuranceLink);

          if(imgFileListArrayRule || mainlyFileArrayRule || titleRule || priceRule || descriptionRule || inventoryRule || insuranceLinkRule){
            this.$alert('请将信息填写完整', '', {
              confirmButtonText: '确定'
            });
            return false;
          }

          for (let i = 0; i < imgFileListArray.length; i++) {
            formData.append('imgFileList' + i, imgFileListArray[i]);
          }
          formData.append('mainlyShowPicUrl', this.mainlyFileArray[0]);
          formData.append('title', this.title);
          formData.append('paymentMethod', 'Bcoin');
          formData.append('price', this.price);
          formData.append('description', this.description);
          formData.append('inventory', this.inventory);
          formData.append('insuranceLink', this.insuranceLink);
          if(this.uuid && this.uuid != ''){
            formData.append('uuid', this.uuid);
            GOODS.editGoods(formData)
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
          }else {
            GOODS.addGoods(formData)
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
          }
        },

        //表单提交前，对图片进行整理，统一上传(重组首图)
        resetMainImgs () {
            return new Promise((resolve, reject) => {
              let that = this;
              let mainlyFileArray = this.mainlyFileArray;
              let imgFileListArray = this.imgFileListArray;
              let uuid = this.uuid;
              let newMainlyFileArray = [];
              //重组首图
              if (this.mainlyFileArray.length == 0 && uuid) {
                console.log('原图片没有动,将服务器上的图片转换')

                let url = this.mainlyFile[0].url;
                console.log('url', url)

                that.imgUrlToFile(url,
                  '图片文件').then(fileObj => {
                  console.log('图片文件111', fileObj); // 打印出来的file类型
                  this.mainlyFileArray.push(fileObj);
                  resolve(fileObj)
                });
              } else if (this.mainlyFileArray.length > 0 && uuid) {
                console.log('不用重组首图')
              }
            });
        },
        // 重组轮播图
        resetListImgs(url){
          //重组轮播图
          return new Promise((resolve, reject) => {
            this.imgUrlToFile(url,
              '图片文件').then(fileObj => {
              resolve(fileObj)
              console.log('图片文件', fileObj); // 打印出来的file类型
              this.newImgFileListArray.push(fileObj);
            });
          });
        },

        // 选取图片后自动回调，里面可以获取到文件
        mainlyImgSaveToUrl(event){
          // this.mainlyFileArray = [];
          this.mainlyFileArray.push(event.raw)
          console.log('选取首图之后',this.mainlyFileArray)
        },
        imgSaveToUrl(event,fileList){
          this.imgFileListArray = [];
          this.imgFileListArray = fileList;
        },
        handleExceed(files, fileList) {
          this.$message.warning('只能上传一张首图');
        },
      }
    }
</script>

<style lang="css" scoped>
  .formCon{
    width: 1088px;
    margin: auto;
    margin-top: 23px;
  }
  .formItem{
    width: 100%;
    overflow: hidden;
    margin-bottom: 32px;
  }
  .label{
    width: 320px;
    height: 32px;
    float: left;
    text-align: right;
    line-height: 32px;
    color: rgba(0, 0, 0, .85);
  }
  .input{
    width: 464px;
    min-height: 32px;
    float: left;
  }
  .numberInput{
    width: 120px;
  }
  .uploadTips{
    height: 24px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 24px;
  }
  .formBtnGroup{
    width: 210px;
    margin: auto;
    margin-top: 48px;
  }




</style>
