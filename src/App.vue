<template>
  <div id="app">
    <Header></Header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <Aside></Aside>
      <Main></Main>
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
  /*#app {*/
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  /*}*/

  .el-footer {
    background-color: #409EFF;
  }

  /*去掉 router-link 下划线*/
  a {
    text-decoration: none;
  }
</style>
