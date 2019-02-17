<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">新增</el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="商品名" sortable width="180"></el-table-column>
        <el-table-column prop="typeid" label="类别" width="180"></el-table-column>
        <el-table-column prop="origin" label="产地" width="180"></el-table-column>
        <el-table-column prop="price" label="价格" sortable width="180"></el-table-column>
        <el-table-column prop="unit" label="单位" width="180"></el-table-column>
        <el-table-column prop="inventory" label="库存" sortable width="180"></el-table-column>
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

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" >
      <el-form :model="form" :label-width="formLabelWidth" size="small" :rules="rules">
        <el-form-item label="食品名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="form.price" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="产地" prop="origin">
          <el-input v-model="form.origin" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否折扣" prop="isDiscount">
          <el-switch v-model="form.isDiscount"></el-switch>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input v-model.number="form.inventory" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="typeid">
          <el-select v-model="form.typeid" placeholder="请选择食品类别">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品描述" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
        }],
        currentPage: 1,
        total: 0,
        pageSize: 10,
        dialogFormVisible: false,
        formLabelWidth: '100px',
        formTitle: '新增食品',
        form: {
          id: '',
          name: '',
          desc: '',
          typeid: '',
          createTime: '',
          creator: '',
          modifyTime: '',
          modifier: '',
          origin: '',
          price: '',
          unit: '',
          isDiscount: '',
          inventory: '',
          imagePath: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入食品名称', trigger: 'blur' },
            { min: 1, max:30, message: '长度在 1 到 30个字符', trigger: 'blur' }
          ],
          typeid: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          origin: [
            { required: true, message: '请填写生产地', trigger: 'change' }
          ],
          price: [
            { required: true, message: '请填写价格', trigger: 'change' },
            { type: 'number', message: '价格必须为数字值'}
          ],
          unit: [
            { required: true, message: '请填写单位', trigger: 'change' }
          ],
          isDiscount: [
            { required: true, message: '请选择是否折扣', trigger: 'change' }
          ],
          inventory: [
            { required: true, message: '请填写库存', trigger: 'change' },
            { type: 'number', message: '库存必须为数字值'}
          ],
          desc: [
            { required: true, message: '请填写食品描述', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {
      this.loadTableData()
    },
    methods: {
      loadTableData() {
        var $this = this
        $this.$http.get("/api/foodstuff-module/get_all_foodstuff", {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        }).then((data) => {
          console.log(data.body);
          $this.tableData = data.body.foodstuffList.list;
          $this.total = data.body.foodstuffList.total;
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
    }
  }
</script>

<style scoped>

</style>
