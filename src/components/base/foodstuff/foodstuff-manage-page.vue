<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus">新增</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="商品名" width="180"></el-table-column>
        <el-table-column prop="typeid" label="类别" width="180"></el-table-column>
        <el-table-column prop="origin" label="产地" width="180"></el-table-column>
        <el-table-column prop="price" label="价格" width="180"></el-table-column>
        <el-table-column prop="unit" label="单位" width="180"></el-table-column>
        <el-table-column prop="inventory" label="库存" width="180"></el-table-column>
        <el-table-column prop="isDiscount" label="是否折扣" width="180"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="" label="操作">
          <el-button-group>
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看" placement="top">
              <el-button type="primary" icon="el-icon-view"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="primary" icon="el-icon-delete"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "foodstuff-manage-page",
    data() {
      return {
        tableData: [{
          date: '2019-02-25',
          name: 'fimi.zhuang',
          address: '广州市天河区 华南农业大学'
        }, {
          date: '2019-02-25',
          name: 'fimi.zhuang',
          address: '广州市天河区 华南农业大学'
        }, {
          date: '2019-02-25',
          name: 'fimi.zhuang',
          address: '广州市天河区 华南农业大学'
        }]
      }
    },
    mounted() {
      this.loadTableData()
    },
    methods: {
      loadTableData() {
        var $this = this
        $this.$http.get("/api/foodstuff-module/get_all_foodstuff").then((data) => {
          console.log(data.body);
          // var newdata = JSON.parse(data);
          // console.log("data2:\n" + newdata);
          $this.tableData = data.body.foodstuffList;
        })
      }
    }
  }
</script>

<style scoped>

</style>
