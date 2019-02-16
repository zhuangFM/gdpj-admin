<template>
  <el-container>
    <el-header>
      <div style="text-align: right;font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </div>
    </el-header>
  </el-container>
</template>

<script>
  export default {
    name: "header-item",
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #409EFF;
    color: #ffffff;
    line-height: 60px;
  }
</style>
