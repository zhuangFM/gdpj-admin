<template>
    <div>
      <el-row>
        <el-col :span="6">
          <el-select v-model="currentPage" placeholder="请选择" @change="changePage">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <router-view></router-view>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "system-monitoring-page",
      data(){
          return{
            options: [{
              value: 'all',
              label: '全局概况'
            }, {
              value: 'foodstuff',
              label: 'foodstuff服务'
            }, {
              value: 'shoppingCart',
              label: 'shoppingCart服务'
            }, {
              value: 'transaction',
              label: 'transaction服务'
            }, {
              value: 'base',
              label: 'base服务'
            }],
            'currentPage':'all',
          }
      },
      methods:{
        changePage(name){
          // console.log(this.currentPage);
          this.$router.push(`/${name}-monitoring-page`);
        }
      },
      created(){
        this.$router.push(`/all-monitoring-page`);
      },
    }
</script>

<style scoped>

</style>
