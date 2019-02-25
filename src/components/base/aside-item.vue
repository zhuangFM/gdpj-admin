<template>
  <div>
    <el-row
      style="height: 60px;color:#ffffff;font-family: Helvetica Neue;text-align: center;background-color: #409EFF;">
      <h1>Admin-Backend</h1>
    </el-row>
    <el-row>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1','2','3','4']" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>服务监控</template>
            <el-menu-item-group>
              <!--<template slot="title">分组一</template>-->
              <router-link to="/system-monitoring-page">
                <el-menu-item index="1-1"><i class="el-icon-setting"></i>服务监控</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>食品管理</template>
            <el-menu-item-group>
              <router-link to="/foodstuff-manage-page">
                  <el-menu-item index="2-1"><i class="el-icon-setting"></i>食品管理</el-menu-item>
              </router-link>
              <router-link to="/foodstuff-kind-manage-page">
                <el-menu-item index="2-2"><i class="el-icon-setting"></i>食品类别管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-menu"></i>交易管理</template>
            <el-menu-item-group>
              <!--<template slot="title">分组一</template>-->
              <router-link to="/transaction-order-manage-page">
                <el-menu-item index="3-1"><i class="el-icon-setting"></i>订单管理</el-menu-item>
              </router-link>
              <router-link to="/transaction-payment-record-page">
                <el-menu-item index="3-2"><i class="el-icon-setting"></i>支付记录</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
            <el-menu-item-group>
              <!--<template slot="title">分组一</template>-->
              <router-link to="/system-log-page">
                <el-menu-item index="4-1"><i class="el-icon-setting"></i>系统日志</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "aside-item",
    data() {
      return {
        isCollapse: false,
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-aside {
    color: #409EFF;
  }

</style>
