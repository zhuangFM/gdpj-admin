<template>
  <el-row :gutter="15">
    <el-col :span="12">
      <div id="mem-echarts" :style="{height:'500px',width:'500px'}"></div>
    </el-col>
    <el-col :span="12">
      <div id="heap-echarts" :style="{height:'500px',width:'500px'}"></div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "foodstuff-monitoring-page",
    data() {
      return {
        'foodstuffMetricsData': {},
      }
    },
    methods: {
      loadData() {
        this.$http.get("/api/foodstuff-module/metrics").then((data1) => {
          console.log(data1.body);
          this.foodstuffMetricsData = data1.body;
          this.drawEcharts();
        });
      },
      drawEcharts() {
        let memChart = this.$echarts.init(document.getElementById('mem-echarts'));
        let heapChart = this.$echarts.init(document.getElementById('heap-echarts'));
        memChart.setOption({
          title: {
            text: '内存概况',
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
              name: '单位:KB',
              type: 'pie',
              radius: '60%',
              data: [
                {value: this.foodstuffMetricsData['mem.free'], name: '空闲'},
                {value: this.foodstuffMetricsData['mem'] - this.foodstuffMetricsData['mem.free'], name: '已使用'},
              ],
              roseType: 'radius',

            }
          ]
        });

        heapChart.setOption({
          title: {
            text: '堆栈概况',
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
              name: '单位:KB',
              type: 'pie',
              radius: '60%',
              data: [
                {value: this.foodstuffMetricsData['heap.used'], name: '已使用'},
                {value: this.foodstuffMetricsData['heap.init'], name: '初始化'},
                {value: this.foodstuffMetricsData['heap.committed'], name: '可使用'},
              ],
              roseType: 'radius',

            }
          ]
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.loadData();
      });
    },
  }
</script>

<style scoped>

</style>
