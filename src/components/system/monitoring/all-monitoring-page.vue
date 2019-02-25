<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="12">
        <!--<p>内存使用情况</p>-->
        <div id="mem-echarts" :style="{height:'500px',width:'500px'}"></div>
      </el-col>
      <el-col :span="12">
        <div id="heap-echarts" :style="{height:'500px',width:'500px'}"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <div id="thread-echarts" :style="{height:'500px',width:'500px'}"></div>
      </el-col>
      <el-col :span="14">
        <div id="count-echarts" :style="{height:'500px',width:'800px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "all-monitoring-page",
    data() {
      return {
        'metricsUrl': ['/api/base-module/metrics', '/api/foodstuff-module/metrics', '/api/transaction-module/metrics', '/api/shopping-cart-module/metrics'],
        'metricsData': {
          'base': {},
          'foodstuff': {},
          'transaction': {},
          'shoppingCart': {},
        },
      }
    },
    methods: {
      loadAllMetricsData() {
        this.$http.get("/api/base-module/metrics").then((data1) => {
          console.log(data1.body);
          this.metricsData.base = data1.body;

          this.$http.get("/api/foodstuff-module/metrics").then((data2) => {
            console.log(data2.body);
            this.metricsData.foodstuff = data2.body;

            this.$http.get("/api/transaction-module/metrics").then((data3) => {
              console.log(data3.body);
              this.metricsData.transaction = data3.body;

              this.$http.get("/api/shopping-cart-module/metrics").then((data4) => {
                console.log(data4.body);
                this.metricsData.shoppingCart = data4.body;


                this.drawEcharts();
              });
            });
          });
        });
      },
      drawEcharts() {
        let memChart = this.$echarts.init(document.getElementById('mem-echarts'));
        let heapChart = this.$echarts.init(document.getElementById('heap-echarts'));
        let threadChart = this.$echarts.init(document.getElementById('thread-echarts'));
        let countChart = this.$echarts.init(document.getElementById('count-echarts'),'light');

        memChart.setOption({
          title: {
            text: '各服务内存的使用概况',
            left: 'center',
            top: 20,
            textStyle: {
              color: 'black'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          series: [
            {
              name: '内存使用(kb)',
              type: 'pie',
              radius: '60%',
              data: [
                {value: this.metricsData.foodstuff.mem, name: 'foodstuff服务'},
                {value: this.metricsData.shoppingCart.mem, name: 'shoppingCart服务'},
                {value: this.metricsData.transaction.mem, name: 'transaction服务'},
                {value: this.metricsData.base.mem, name: 'base服务'},
              ],
              roseType: 'radius',

            }
          ]
        });

        heapChart.setOption({
          title: {
            text: '各服务堆栈的使用概况',
            left: 'center',
            top: 20,
            textStyle: {
              color: 'black'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          series: [
            {
              name: '堆栈使用(kb)',
              type: 'pie',
              radius: '70%',
              data: [
                {value: this.metricsData.foodstuff['heap.used'], name: 'foodstuff服务'},
                {value: this.metricsData.shoppingCart['heap.used'], name: 'shoppingCart服务'},
                {value: this.metricsData.transaction['heap.used'], name: 'transaction服务'},
                {value: this.metricsData.base['heap.used'], name: 'base服务'},
              ],
              roseType: 'radius',
            }
          ]
        });

        threadChart.setOption({
          title: {
            text: '各服务线程的使用概况',
            left: 'center',
            top: 20,
            textStyle: {
              color: 'black'
            }
          },

          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },

          series: [
            {
              name: '线程数',
              type: 'pie',
              radius: '70%',
              data: [
                {value: this.metricsData.foodstuff['threads.totalStarted'], name: 'foodstuff服务'},
                {value: this.metricsData.shoppingCart['threads.totalStarted'], name: 'shoppingCart服务'},
                {value: this.metricsData.transaction['threads.totalStarted'], name: 'transaction服务'},
                {value: this.metricsData.base['threads.totalStarted'], name: 'base服务'},
              ],
              roseType: 'radius',
            }
          ]
        });

        countChart.setOption({
          title: {
            text: '近期 GC 次数（单位:次）',
          },
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: ['base服务', 'foodstuff服务', 'shoppingCart服务', 'transaction服务']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name:'GC次数',
            data: [this.metricsData.base['gc.ps_scavenge.count'], this.metricsData.foodstuff['gc.ps_scavenge.count'], this.metricsData.shoppingCart['gc.ps_scavenge.count'], this.metricsData.transaction['gc.ps_scavenge.count']],
            type: 'bar',
            barWidth: '60%',
          }]
        });
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.loadAllMetricsData();
      });
    },

  }
</script>

<style scoped>

</style>
