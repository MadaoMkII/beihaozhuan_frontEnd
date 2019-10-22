<template>
    <div class="homeCon">
      <div class="searchInput topSelect">
        <el-select v-model="date" :popper-append-to-body = false placeholder="请选择" @change="dateSelect">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
<!--      <div class="daterangeCon">-->
<!--        <el-date-picker-->
<!--          v-model="daterangeVal"-->
<!--          type="daterange"-->
<!--          @change="onPick"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期">-->
<!--        </el-date-picker>-->
<!--      </div>-->
      <div class="statisticsCon">
        <div class="statisticsItem">
          <apexchart type=area :options="userChartOptions" :series="userSeries" />
        </div>
        <div class="statisticsItem">
          <apexchart type=area :options="getAwardChartOptions" :series="getAwardSeries" />
        </div>
        <div class="statisticsItem noMargin">
          <apexchart type=area :options="payAwardChartOptions" :series="payAwardSeries" />
        </div>
      </div>
      <div class="bestTask">
        <div class="taskTitleCon">
          <div class="taskTitle">
            <span class="title">最受欢迎任务</span>
            <span class="tips">TOP10</span>
          </div>
          <div class="taskSearchCon">
            <el-select v-model="taskPeriod" :popper-append-to-body = false placeholder="请选择"  @change="taskSelect">
              <el-option
                v-for="item in selectOptionsColum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="homeTableCon">
          <div class="columnCon">
            <apexchart type=bar height=350 :options="taskcolumnchartOptions" :series="taskcolumnseries" />
          </div>
        </div>
      </div>
      <div class="bestTask bestGoods">
        <div class="taskTitleCon">
          <div class="taskTitle">
            <span class="title">最受欢迎商品</span>
            <span class="tips">TOP10</span>
          </div>
          <div class="taskSearchCon">
            <el-select v-model="goodsPeriod" :popper-append-to-body = false placeholder="请选择" @change="goodsSelect">
              <el-option
                v-for="item in selectOptionsColum"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="homeTableCon">
          <div class="columnCon">
            <apexchart type=bar height=350 :options="goodscolumnchartOptions" :series="goodscolumnseries" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import HOME from 'admin/service/home-service.js'
    export default {
      name: "Home",
      data() {
        return {
          date: 'month',
          goodsPeriod:'month',
          taskPeriod:'month',
          daterangeVal:'',
          selectOptions: [
            {
              value: 'day',
              label: '今日'
            }, {
              value: 'month',
              label: '最近30日'
            }, {
              value: 'full',
              label: '全部'
            }
          ],
          selectOptionsColum: [
            {
              value: 'weekly',
              label: '最近7天'
            }, {
              value: 'month',
              label: '最近30日'
            }, {
              value: 'full',
              label: '全部'
            }
          ],
          taskTableData: [],
          chartOptions: {
            chart: {
              height: 200,
              zoom: {
                enabled: false
              },
              toolbar: {
                show: false
              }
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            grid: {
              show: false
            },
            yaxis: {
              labels: {
                show: false
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              crosshairs: {
                show: false,
              }
            },
          },
          userChartOptions:{},
          userSeries:[],
          getAwardChartOptions:{},
          getAwardSeries:[],
          payAwardChartOptions:{},
          payAwardSeries:[],
          columnchartOptions: {
            chart: {
              zoom: {
                enabled: false
              },
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '30%',
                // endingShape: 'rounded'
                endingShape: 'flat'
              },
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              show: true,
              width: 2,
              colors: ['transparent']
            },
            yaxis: {
              title: {
                text: ''
              }
            },
            fill: {
              opacity: 1
            }
          },
          taskcolumnchartOptions:{},
          taskcolumnseries:[],
          goodscolumnchartOptions:{},
          goodscolumnseries:[],
          addUserAreaData:{}
        }
      },
      created(){
        this.getTopArea();
        this.getColumn();
      },
      methods:{
        //下拉框change
        dateSelect(val){
          this.date = val;
          this.getTopArea();
        },
        taskSelect(){
          this.popularTask();
        },
        goodsSelect(){
          this.popularGoods();
        },
        onPick(date){
          // console.log('date',date);
        },
        // 初始化顶部统计图
        getTopArea(){
          this.getAreaData('userRegister',this.date);
          this.getAreaData('increaseBcoin',this.date);
          this.getAreaData('consumeBcoin',this.date);
        },
        //初始化柱状图
        getColumn(){
          this.popularTask();
          this.popularGoods();
        },
        //请求接口获取折线图数据
        getAreaData(by,period){
          let data = 'by='+by+'&period='+period;
          HOME.countUser(data)
            .then(res => {
              // console.log('res11', res);
              if (res.code === "0") {
                if(by === 'userRegister'){
                  this.getAddUserArea(res.data);
                }else if(by === 'increaseBcoin'){
                  this.getAwardArea(res.data);
                }else if(by === 'consumeBcoin'){
                  this.payAwardArea(res.data);
                }
              }
            });
        },
        //获取新增用户量
        getAddUserArea(data){
          this.userChartOptions = {};
          this.userSeries = [];
          this.userChartOptions = {...this.chartOptions, ...{
              title:{
                text: '新增用户量',
                show:true,
                align: 'left',
                margin: 20,
                offsetX: 5,
                offsetY: 5,
                floating: true,
                style: {
                  fontSize:  '30px',
                  color:  '#263238'
                },
              },
              subtitle:{
                text:data.total,
                align: 'left',
                margin: 10,
                offsetX: 5,
                offsetY: 40,
                floating: false,
                style: {
                  fontSize: '30px',
                  color:  '#9699a2'
                },
              },
              xaxis:{
                labels: {
                  show: false
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories:data.categories
              }
            }
          };
          let seriesItem = {
            name:'用户',
            data:data.series[0].seriesData
          };
          this.userSeries.push(seriesItem);
        },
        //用户获得金币总量
        getAwardArea(data){
          this.getAwardChartOptions = {};
          this.getAwardSeries = [];
          this.getAwardChartOptions = {...this.chartOptions, ...{
              title:{
                text: '用户获得金币总量',
                show:true,
                align: 'left',
                margin: 20,
                offsetX: 5,
                offsetY: 5,
                floating: true,
                style: {
                  fontSize:  '30px',
                  color:  '#263238'
                },
              },
              subtitle:{
                text:data.total,
                align: 'left',
                margin: 10,
                offsetX: 5,
                offsetY: 40,
                floating: false,
                style: {
                  fontSize: '30px',
                  color:  '#9699a2'
                },
              },
              xaxis:{
                labels: {
                  show: false
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories:data.categories
              }
            }
          };
          let seriesItem = {
            name:'点击次数',
            data:data.series[0].seriesData
          };

          this.getAwardSeries.push(seriesItem);
        },
        //用户消耗金币总量
        payAwardArea(data){
          this.payAwardChartOptions = {};
          this.payAwardSeries = [];
          this.payAwardChartOptions = {...this.chartOptions, ...{
              title:{
                text: '用户消耗金币总量',
                show:true,
                align: 'left',
                margin: 20,
                offsetX: 5,
                offsetY: 5,
                floating: true,
                style: {
                  fontSize:  '30px',
                  color:  '#263238'
                },
              },
              subtitle:{
                text:data.total,
                align: 'left',
                margin: 10,
                offsetX: 5,
                offsetY: 40,
                floating: false,
                style: {
                  fontSize: '30px',
                  color:  '#9699a2'
                },
              },
              xaxis:{
                labels: {
                  show: false
                },
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                categories:data.categories
              }
            }
          };
          let seriesItem = {
            name:'金币',
            data:data.series[0].seriesData
          };
          this.payAwardSeries.push(seriesItem);
        },
        //最受欢迎的任务
        popularTask(){
          this.taskcolumnchartOptions={};
          this.taskcolumnseries=[];
          let period = this.taskPeriod;
          let data = 'period='+period;
          HOME.getAdvCompare(data)
            .then(res => {
              // console.log('res11', res);
              if (res.code === "0") {
                let data = res.data;
                this.taskcolumnchartOptions = {
                  ...this.columnchartOptions, ...{
                    xaxis:{
                      categories: data.categories,
                      labels: {
                        style: {
                          fontSize: '14px'
                        },
                        rotate: -45
                      }
                    }
                  }
                };
                let seriesItem = {
                  name:'点击次数',
                  data:data.series[0].seriesData
                };
                let seriesItemtwo = {
                  name:'完成次数',
                  data:data.series[1].seriesData
                };
                this.taskcolumnseries.push(seriesItem,seriesItemtwo);
              }
            });
        },
        //最受欢迎的商品
        popularGoods(){
          this.goodscolumnchartOptions={};
          this.goodscolumnseries=[];
          let period = this.goodsPeriod;
          let data = 'period='+period;
          HOME.countGoodForChart(data)
            .then(res => {
              // console.log('res11', res);
              if (res.code === "0") {
                let data = res.data;
                this.goodscolumnchartOptions = {
                  ...this.columnchartOptions, ...{
                    xaxis:{
                      categories: data.categories,
                      labels: {
                        style: {
                          fontSize: '14px'
                        },
                        rotate: -45
                      }
                    }
                  }
                };
                let seriesItem = {
                  name:'累计消费金币',
                  data:data.series[0].seriesData
                };
                this.goodscolumnseries.push(seriesItem);
              }
            });
        }
      }
    }
</script>

<style lang="css" scoped>
  .homeCon{
    width: 1136px;
    margin: auto;
    margin-top: 88px;
  }
  .topSelect{
    width: 128px;
    float: none;
    /*display: inline-block;*/
  }
  .statisticsCon{
    height: 200px;
    margin-top: 8px;
  }
  .statisticsItem{
    width: 368px;
    height: 200px;
    float: left;
    background: #fff;
    border-radius: 4px;
    margin-right: 16px;
  }
  .noMargin{
    margin: 0;
  }
  .bestTask{
    width: 100%;
    min-height: 400px;
    background: #fff;
    border-radius: 4px;
    margin-top: 24px;
    padding-bottom: 24px;
  }
  .taskTitleCon{
    height: 56px;
    border-bottom: 1px solid #E8E8E8;
  }
  .taskTitle{
    width: 275px;
    float: left;
    font-size: 18px;
    line-height: 56px;
  }
  .taskTitle .title{
    color: rgba(0, 0, 0, .85);
    margin-left: 24px;
    font-weight:600;
  }
  .taskTitle .tips{
    margin-left: 8px;
    color: rgba(245, 34, 45, .85);
  }
  .taskSearchCon{
    float: right;
    width: 128px;
    margin-top: 12px;
    margin-right: 24px;
  }
  .homeTableCon{
    width: 1055px;
    /*height: 300px;*/
    border: 1px solid #E8E8E8;
    border-radius: 4px;
    margin:auto;
    margin-top: 24px;
    padding: 0 16px;
  }
  .columnCon{
    width: 900px;
    margin: auto;
  }
  .daterangeCon{
    display: inline-block;
    margin-left: 10px;
  }




</style>
