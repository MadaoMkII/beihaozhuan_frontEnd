<template>
    <div>
      <div class="subTabCon thirdTabCon">
        <div class="subTab thirdTab">
          <div class="subTabItem thirdTabItem" v-if="!editTaskAd" :class="{'activeThirdTab' : bannerAd}" @click="showAddCon('bannerAd')">
              <div class="subTabText thirdTabText">{{bannerTabTitle}}</div>
              <div class="subTabItemBorder thirdTabItemBorder"></div>
          </div>
          <div class="subTabItem thirdTabItem" v-if="!editBannerAd" :class="{'activeThirdTab' : taskAd}"  @click="showAddCon('taskAd')">
              <div class="subTabText thirdTabText">{{taskTabTitle}}</div>
              <div class="subTabItemBorder thirdTabItemBorder"></div>
          </div>
        </div>
      </div>
      <div class="centerCon">
        <div class="totalTableSize">
          <div class="tipIcon"></div>
          <div class="totalCon">
            进行广告位广告来源的配置：通过此功能可以动态切换各广告位展示的广告来源，从而可以根据不同SSP平台的佣金多寡、类型实现动态调整
          </div>
        </div>
        <div class="formCon">
          <div class="formItem">
            <div class="label">广告名称：</div>
            <div class="input">
              <el-input v-model="title" placeholder="给广告起个名字"></el-input>
            </div>
          </div>
          <div class="formItem" v-if="bannerAd">
            <div class="label">广告位置：</div>
            <div class="input">
              <el-select v-model="positionName" placeholder="请选择" @change="changePosition">
                <el-option
                  v-for="item in formSelectOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="formItem" v-if="taskAd">
            <div class="label">广告位置：</div>
            <div class="input">
              <el-input v-model="positionName" :disabled="true"></el-input>
            </div>
          </div>
          <div class="formItem" v-if="bannerAd">
            <div class="label">尺寸：</div>
            <div class="input">
              <el-input v-model="bannerSize" :disabled="true"></el-input>
            </div>
          </div>
          <div class="formItem" v-if="taskAd">
            <div class="label">尺寸：</div>
            <div class="numLabel">宽</div>
            <div class="input numberInput">
              <el-input-number v-model="width" controls-position="right" :min="0" :disabled="true"></el-input-number>
            </div>
            <div class="numberText">PX</div>

            <div class="numLabel">高</div>
            <div class="input numberInput">
              <el-input-number v-model="height" controls-position="right" :min="0"></el-input-number>
            </div>
            <div class="numberText">PX</div>
          </div>
          <div class="formItem">
            <div class="label">广告图片：</div>
            <div class="input">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/9"
                list-type="picture-card"
                :auto-upload="false"
                :limit="1"
                :file-list="fileList"
                :on-exceed="handleExceed"
                :on-change="mainlyImgSaveToUrl"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemoveMainly">
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <div class="uploadTips">请按照广告尺寸或等比例上传图片，支持扩展名：.png .jpg ...</div>
            </div>
          </div>
          <div class="formItem">
            <div class="label">广告来源：</div>
            <div class="input sourceItem">
              <el-radio-group v-model="source" @change="changeSource">
                <el-radio label="banner">banner-video</el-radio>
                <el-radio label="native">native-video</el-radio>
                <el-radio label="full">full-video</el-radio>
                <el-radio label="单图片">单图片</el-radio>
                <el-radio label="1">自定义</el-radio>
              </el-radio-group>
              <el-input v-model="sourceVal" v-show="customSource"></el-input>
            </div>
          </div>
          <div class="formItem" v-if="taskAd">
            <div class="label">佣金：</div>
            <div class="input numberInput">
              <el-input-number v-model="reward" controls-position="right" :min="0"></el-input-number>
            </div>
            <div class="numberText">金币</div>
          </div>
          <div class="formItem" v-if="taskAd">
            <div class="label">数量：</div>
            <div class="input numberInput">
              <el-input-number v-model="amount" controls-position="right" :min="0"></el-input-number>
            </div>
            <div class="numberText">个</div>
          </div>
          <div class="formBtnGroup">
            <el-button type="primary" class="CoBtn" @click="saveForm()">保存</el-button>
            <el-button class="CoResetBtn" @click="goPrePage()">返回上一页</el-button>
          </div>
        </div>



      </div>
    </div>
</template>

<script>
  import urlToFile from '@/utils/urlToFile.js'
  import AD from 'admin/service/advertisement-service.js'
    export default {
      name: "AddPoster",
      data(){
        return{
          title : '',
          positionName : '',
          source : '',
          reward:'',
          width:'702',
          height:'',
          amount:'',
          bannerSize:'',
          customSource:false,
          sourceVal:'',
          bannerTabTitle:'新建轮播广告',
          taskTabTitle:'新建任务频道广告',
          selectOptions: [
            {
              value: '首页banner',
              label: '首页banner'
            }, {
              value: '任务banner',
              label: '任务banner'
            }, {
              value: '商城banner',
              label: '商城banner'
            }, {
              value: '个人中心banner',
              label: '个人中心banner'
            }, {
              value: '任务频道',
              label: '任务频道'
            }
          ],
          formSelectOptions:[
            {
              value: '首页banner',
              label: '首页banner'
            }, {
              value: '任务banner',
              label: '任务banner'
            }, {
              value: '商城banner',
              label: '商城banner'
            }, {
              value: '个人中心banner',
              label: '个人中心banner'
            }
          ],
          bannerAd:true,
          taskAd:false,
          editBannerAd : false,
          editTaskAd : false,
          checkList:[],
          fileList:[],
          fileArray:[],
          imgFileList : [],
          mainlyFile:[],
          mainlyFileArray:[],
          dialogImageUrl: '',
          dialogVisible: false,
          data:{},
          uuid : ''
        }
      },
      created(){
        this.data = this.$route.query.data;
        if(this.data){
          this.uuid = this.data.uuid;
          this.showAdInfo();
        }
      },
      methods: {
        //如果是编辑页面，回显表单信息
        showAdInfo(){
          let data = this.data;
          let positionName = data.positionName;
          this.positionName = data.positionName;
          if(positionName === '任务频道'){
            this.taskAd = true;
            this.bannerAd = false;
            this.editTaskAd = true;
            this.bannerTabTitle = '编辑任务频道广告'
          }else {
            this.taskAd = false;
            this.bannerAd = true;
            this.changePosition(positionName);
            this.editBannerAd = true;
            this.bannerTabTitle = '编辑轮播广告'
          }
          this.title = data.title;
          if(data.source !== 'banner' && data.source !== 'native' && data.source !== 'full' && data.source !== '单图片'){
            this.source = '1';
            this.customSource = true;
            this.sourceVal = data.source;
          }else {
            this.source = data.source;
          }
          this.reward = data.reward ? data.reward : '';
          this.amount = data.amount ? data.amount : '';
          this.height = data.height ? data.height : '';
          this.width = data.width ? data.width : '';
          this.imageFile();  //图片转换
        },
        // 服务器图片转为本地图片
        imageFile(){
          let imgUrl = this.data.carouselUrl;
          if(imgUrl && imgUrl != ''){
            let imgFileItem = [{
              'url' : imgUrl
            }];
            this.fileList = imgFileItem;
            urlToFile.imgUrlToFile(imgUrl,
              '图片文件').then(fileObj => {
              console.log('图片文件111', fileObj); // 打印出来的file类型
              this.mainlyFileArray.push(fileObj);
            });
          }
        },
        //动态显示表单中字段
        showAddCon(type){
          if(type === 'bannerAd'){
            this.bannerAd = true;
            this.taskAd = false;
            this.positionName = '';
          }else if(type === 'taskAd'){
            this.bannerAd = false;
            this.taskAd = true;
            this.positionName = '任务频道';
          }
        },
        //根据选择的广告位置不同，改变尺寸大小
        changePosition(val){
          if(val === '首页banner'){
            this.bannerSize = '354 * 142'
          }else if(val === '任务banner' || val === '商城banner'){
            this.bannerSize = '375 * 153'
          }else if(val === '个人中心banner'){
            this.bannerSize = '352 * 92'
          }
        },
        //监听广告来源
        changeSource(val){
          if(val == 1){
            this.customSource = true;
          }else {
            this.customSource = false;
            this.sourceVal = '';
          }
        },
        handleRemoveMainly(file, fileList){
          this.mainlyFileArray = [];
        },
        saveToUrl(event,fileList){
          this.fileArray.push(event.raw)
        },
        handleExceed(files, fileList) {
          this.$message.warning('只能上传一个图标');
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        // 选取图片后自动回调，里面可以获取到文件
        mainlyImgSaveToUrl(event){
          // this.mainlyFileArray = [];
          this.mainlyFileArray.push(event.raw)
          console.log('选取首图之后',this.mainlyFileArray)
        },
        //表单保存
        saveForm() {
          this.$confirm('是否保存表单信息?', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            let source = this.sourceVal ? this.sourceVal : this.source;
            let titleRule = this.isEmpty(this.title);
            let positionNameRule = this.isEmpty(this.positionName);
            let sourceRule = this.isEmpty(source);
            let rewardRule = this.isEmpty(this.reward);
            let widthRule = this.isEmpty(this.width);
            let heightRule = this.isEmpty(this.height);
            let amountRule = this.isEmpty(this.amount);
            let mainlyFileArrayRule = this.isEmpty(this.mainlyFileArray);
            if(this.bannerAd){
              if(titleRule || positionNameRule || sourceRule || mainlyFileArrayRule){
                this.$alert('请将信息填写完整', '', {
                  confirmButtonText: '确定'
                });
                return false;
              }
            }else if(this.taskAd){
              if(titleRule || positionNameRule || sourceRule || mainlyFileArrayRule || rewardRule || heightRule || widthRule || amountRule){
                this.$alert('请将信息填写完整', '', {
                  confirmButtonText: '确定'
                });
                return false;
              }
            }

            let formData = new FormData();
            formData.append('title', this.title);
            formData.append('positionName', this.positionName);
            formData.append('source', source);
            formData.append('reward', this.reward);
            formData.append('height', this.height);
            formData.append('width', this.width);
            formData.append('amount', this.amount);
            formData.append('activity', 'disable');
            formData.append('file', this.mainlyFileArray[0]);
            let uuid = this.uuid;
            if(uuid && uuid != ''){
              formData.append('uuid', uuid);
              AD.updateAdvertisement(formData)
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
              AD.addTaskAd(formData)
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
          }).catch(() => {
            console.log('表单提交弹窗中点击了取消按钮');
          });

        }
      }
    }
</script>

<style lang="css" scoped>
  .totalCon{
    width: 95%;
  }
  .subTabItem{
    width: 112px;
  }
  .thirdTabText{
    font-size: 14px;
  }
  .activeThirdTab .thirdTabText{
    color: rgba(24, 144, 255, .85);
  }
  .activeThirdTab .thirdTabItemBorder{
    background: #1890FF;
  }
  .numLabel{
    width: 24px;
    height: 32px;
    line-height: 32px;
    float: left;
  }
  .numberText{
    width: 32px;
    height: 32px;
    line-height: 32px;
    float: left;
    margin-left: 8px;
    margin-right: 40px;
  }
  .sourceItem{
    width: 600px;
  }
</style>
