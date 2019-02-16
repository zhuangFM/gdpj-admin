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
  import HelloWorld from './components/HelloWorld.vue'
  import Header from './components/base/header-item'
  import Aside from './components/base/aside-item'
  import Main from './components/base/main-item'

  export default {
    data() {
      return {
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    name: 'app',
    components: {
      HelloWorld, Header, Aside, Main
    }
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
</style>
