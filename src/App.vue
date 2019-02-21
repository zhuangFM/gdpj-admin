<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
      <Aside></Aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>fimi.zhuang</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Header from './components/base/header-item'
  import Aside from './components/base/aside-item'
  import Main from './components/base/main-item'

  export default {
    data() {
      return {}
    },
    name: 'app',
    components: {
      Header, Aside, Main
    },
  }
</script>

<style>
  /*去掉 router-link 下划线*/
  a {
    text-decoration: none;
  }
  .el-header {
    background-color: #409EFF;
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
</style>
