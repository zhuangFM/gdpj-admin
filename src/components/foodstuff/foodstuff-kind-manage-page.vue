<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="addNewItem">新增</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="食品类名" sortable width="180"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column prop="creator" label="创建人" width="180"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间" sortable width="180"></el-table-column>
        <el-table-column prop="modifier" label="修改人" width="180"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit" @click="modifyData(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看" placement="top">
                <el-button type="primary" icon="el-icon-view"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <el-button type="primary" icon="el-icon-delete" @click="deleteData(scope.row)"></el-button>
              </el-tooltip>
            </el-button-group>
          </template>

        </el-table-column>
      </el-table>
      <!--<div class="block">-->
      <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage"-->
      <!--:page-sizes="[10, 20]"-->
      <!--:page-size="pageSize"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="total">-->
      <!--</el-pagination>-->
      <!--</div>-->
    </el-row>

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-width="120px" ref="form" size="small" :rules="rules">
        <el-form-item label="食品类别名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "foodstuff-kind-manage-page",
    data() {
      return {
        tableData: [],
        currentRowDate: {},
        currentPage: 1,
        total: 0,
        pageSize: 10,
        dialogFormVisible: false,
        formTitle: '新增食品类别',
        form: {
          id: '',
          name: '',
          desc: '',
          createTime: '',
          creator: '',
          modifyTime: '',
          modifier: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入食品类别名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请填写食品描述', trigger: 'blur'}
          ]
        },
        loading: true,
      }
    },
    mounted() {
      this.loadTableData()
    },
    methods: {
      loadTableData() {
        this.$http.get("/api/foodstuff-module/get_all_foodstuff_kind").then((data) => {
          console.log(data.body);
          this.tableData = data.body.foodstuffKindList;
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
      submitData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form);
            this.$http.post("/api/foodstuff-module/save_foodstuff_kind", [this.form]).then((data) => {
              console.log(data.body);
              this.showMessage('success', '操作成功！');
              this.loadTableData();
            }, (response) => {
              this.showMessage("warning", response);
              console.log("request error")
              // 响应错误回调
            })
            this.dialogFormVisible = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      showMessage(type, msg) {
        this.$message({
          message: msg,
          type: type
        });
      },
      modifyData(rowData) {
        for (var key in this.form) {
          this.form[key] = rowData[key];
        }
        this.dialogFormVisible = true;
      },
      deleteData(rowData) {
        this.$confirm('此操作将永久该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("/api/foodstuff-module/delete_foodstuff_kind_by_id", {params: {id: rowData.id}}).then((data) => {
            this.showMessage("success", "操作成功！")
            console.log("successfully! URI : /api/foodstuff-module/delete_foodstuff_kind_by_id");
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
      }
    }
  }
</script>

<style scoped>

</style>
