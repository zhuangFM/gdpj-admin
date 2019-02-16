<template>
  <el-table :data="tableData">
    <el-table-column prop="date" label="日期" width="140">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "table-main",
    data() {
      const item = {
        date: '2019-02-25',
        name: 'fimi.zhuang',
        address: '广州市 华南农业大学'
      };
      return {
        isCollapse: false,
        tableData: Array(20).fill(item)
      }
    }
  }
</script>

<style scoped>

</style>
