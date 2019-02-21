<template>
  <div>
    <el-row>
      <el-col :span="6">
        <!--<el-button type="primary" icon="el-icon-plus" @click="addNewItem">新增</el-button>-->
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="id" label="订单号" sortable width="180"></el-table-column>
        <el-table-column prop="totalMoney" label="订单金额" sortable width="180"></el-table-column>
        <el-table-column prop="buyerId" label="买家"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" sortable></el-table-column>
        <el-table-column prop="creator" label="创建人" width="180"></el-table-column>
        <el-table-column prop="modifyTime" label="修改时间" sortable width="180" sortable></el-table-column>
        <el-table-column prop="modifier" label="修改人" width="180"></el-table-column>
        <el-table-column prop="status" label="订单状态" width="180" sortable></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="订单详情" placement="top">
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

    <el-dialog :title="tableDialogTitle" :visible.sync="dialogTableVisible">
      <el-table :data="orderDetailData" style="width: 100%" v-loading="detailTableLoading" element-loading-text="拼命加载中">
        <el-table-column prop="id" label="序号" width="180" sortable></el-table-column>
        <el-table-column prop="transactionOrderId" label="订单号" width="180"></el-table-column>
        <el-table-column prop="foodstuffName" label="食品名称" sortable></el-table-column>
        <el-table-column prop="amount" label="数量" width="180" sortable></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "transaction-order-manage-page",
    data() {
      return {
        tableData: [],
        currentRowDate: {},
        currentPage: 1,
        total: 0,
        pageSize: 10,
        dialogTableVisible: false,
        tableDialogTitle: '订单详情',
        orderDetailData:[],
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
        detailTableLoading: true,
      }
    },
    mounted() {
      this.loadTableData()
    },
    methods: {
      loadTableData() {
        this.$http.get("/api/transaction-module/get_all_transaction_order", {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        }).then((data) => {
          console.log(data.body);
          this.tableData = data.body.transactionOrderList.list;
          this.total = data.body.transactionOrderList.total;
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
          this.$http.get("/api/transaction-module/delete_transaction_order_by_id", {params: {id: rowData.id}}).then((data) => {
            this.showMessage("success", "操作成功！")
            console.log("successfully! URI : /transaction-module/delete_transaction_order_by_id");
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
      showTableDetail(rowData){
        this.$http.get("/api/transaction-module/get_transaction_order_detail_by_toid", {params: {toid: rowData.id}}).then((data) => {
          console.log("successfully! URI : /transaction-module/delete_transaction_order_by_id");
          console.log(data.body);
          this.orderDetailData = data.body.transactionOrderDetailList;
          this.dialogTableVisible = true;
          this.detailTableLoading = false;
          // this.loadTableData();
        }, (response) => {
          this.showMessage("warning", response);
          console.log("request error")
          // 响应错误回调
        })
      }
    }
  }

</script>

<style scoped>

</style>
