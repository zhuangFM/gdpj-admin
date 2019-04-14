<template>
  <div>
    <el-row>
      <el-col :span="6">
        <!--<el-button type="primary" icon="el-icon-plus" @click="addNewItem">新增</el-button>-->
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="id" label="日志id" sortable></el-table-column>
        <el-table-column prop="level" label="日志级别" sortable></el-table-column>
        <el-table-column prop="action" label="操作类型" sortable></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
        <el-table-column prop="creator" label="创建人"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit" disabled="true"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看日志详情" placement="top">
                <el-button type="primary" icon="el-icon-view" @click="showTableDetail(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button type="primary" icon="el-icon-delete" @click="deleteData(scope.row)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </el-row>

    <el-dialog :title="logContentDialogTitle" :visible.sync="logContentDialogVisible">
      <h3>{{logContent}}</h3>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "system-log-page",
    data() {
      return {
        tableData: [],
        currentRowDate: {},
        currentPage: 1,
        total: 0,
        pageSize: 10,
        logContentDialogVisible: false,
        logContentDialogTitle: '日志内容',
        loading: true,
        logContent: "",
      }
    },
    mounted() {
      this.loadTableData()
    },
    methods: {
      loadTableData() {
        this.$http.get("/api/base-module/get_all_system_log", {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        }).then((data) => {
          console.log(data.body);
          this.tableData = data.body.systemLogList.list;
          this.total = data.body.systemLogList.total;
          this.loading = false;
        })
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.loadTableData();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.loadTableData();
        console.log(`当前页: ${val}`);
      },
      addNewItem() {
        for (var key in this.form) {
          this.form[key] = '';
        }
        this.dialogFormVisible = true;
      },
      showMessage(type, msg) {
        this.$message({
          message: msg,
          type: type
        });
      },
      deleteData(rowData) {
        this.$confirm('此操作将永久该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("/api/base-module/delete_system_log_by_id", {params: {id: rowData.id}}).then((data) => {
            this.showMessage("success", "操作成功！")
            console.log("successfully! URI : /api/base-module/delete_system_log_by_id");
            console.log(data.body);
            this.loadTableData();
          }, (response) => {
            this.showMessage("warning", response);
            console.log("request error")
            // 响应错误回调
          })
        }).catch(() => {
          this.showMessage("info", "已取消删除");
        });
      },
      showTableDetail(rowData) {
        this.logContent = rowData.content;
        this.logContentDialogVisible = true;
      },
    }
  }
</script>

<style scoped>

</style>
