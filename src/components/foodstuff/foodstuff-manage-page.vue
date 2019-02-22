<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-button type="primary" icon="el-icon-plus" @click="addNewItem">新增</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" style="width: 100%" v-loading="loading" element-loading-text="拼命加载中">
        <el-table-column prop="name" label="商品名" sortable></el-table-column>
        <el-table-column prop="typeid" label="类别"></el-table-column>
        <el-table-column prop="origin" label="产地" ></el-table-column>
        <el-table-column prop="price" label="价格" sortable ></el-table-column>
        <el-table-column prop="unit" label="单位"></el-table-column>
        <el-table-column prop="inventory" label="库存" sortable ></el-table-column>
        <el-table-column prop="isDiscount" label="是否折扣"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
        <el-table-column prop="" label="操作" width="200">
          <template slot-scope="scope">
            <el-button-group>
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="primary" icon="el-icon-edit" @click="modifyData(scope.row)"></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="查看图片" placement="top">
                <el-button type="primary" icon="el-icon-picture" @click="showImages(scope.row)"></el-button>
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

    <el-dialog :title="formTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form" :label-width="formLabelWidth" ref="form" size="small" :rules="rules">
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
          <el-switch v-model="form.isDiscount" :active-value="activeVal" :inactive-value="inActiveVal"></el-switch>
        </el-form-item>
        <el-form-item label="库存" prop="inventory">
          <el-input v-model.number="form.inventory" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="typeid">
          <el-select v-model="form.typeid" placeholder="请选择食品类别">
            <el-option v-for="item in typeArr" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="食品描述" prop="desc">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData('form')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="图片查看" :visible.sync="dialogImagesVisible">
      <el-dialog width="30%" title="图片上传" :visible.sync="dialogImagesUploadVisible" append-to-body>
        <el-upload
          class="upload-demo"
          :action="imageUploadUri"
          name="file"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          list-type="picture"
          :data="{'id':showImagesRowId}">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-dialog>
      <div class="block">
        <el-button type="primary" @click="dialogImagesUploadVisible = true">添加图片</el-button>
        <el-carousel height="200px" type="card" v-if="imagesPathArr.length>0">
          <el-carousel-item v-for="(item,index) in imagesPathArr" :key="index">
            <img :src="'\\static\\images\\'+showImagesRowId+'\\'+item" style="width: 200px;">
          </el-carousel-item>
        </el-carousel>
        <h3 v-else>该食品暂无图片！</h3>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "foodstuff-manage-page",
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 0,
        pageSize: 10,
        dialogFormVisible: false,
        dialogImagesVisible: false,
        dialogImagesUploadVisible: false,
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
        activeVal: 1,
        inActiveVal: 0,
        rules: {
          name: [
            {required: true, message: '请输入食品名称', trigger: 'blur'},
            {min: 1, max: 30, message: '长度在 1 到 30个字符', trigger: 'blur'}
          ],
          typeid: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          origin: [
            {required: true, message: '请填写生产地', trigger: 'change'}
          ],
          price: [
            {required: true, message: '请填写价格', trigger: 'change'},
            {type: 'number', message: '价格必须为数字值'}
          ],
          unit: [
            {required: true, message: '请填写单位', trigger: 'change'}
          ],
          inventory: [
            {required: true, message: '请填写库存', trigger: 'change'},
            {type: 'number', message: '库存必须为数字值'}
          ],
          desc: [
            {required: true, message: '请填写食品描述', trigger: 'blur'}
          ]
        },
        loading: true,
        typeArr: [],
        showImagesRowId: "",
        imageUploadUri: "/api/foodstuff-module/upload_foodstuff_images",
        imagesPathArr: [],
      }
    },
    mounted() {
      this.loadTableData();
      this.loadTypeArr();
    },
    methods: {
      loadTableData() {
        this.$http.get("/api/foodstuff-module/get_all_foodstuff", {
          params: {
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
        }).then((data) => {
          console.log(data.body);
          this.tableData = data.body.foodstuffList.list;
          this.total = data.body.foodstuffList.total;
          this.loading = false;
        })
      },
      loadTypeArr() {
        this.$http.get("/api/foodstuff-module/get_all_foodstuff_kind").then((data) => {
          console.log(data.body);
          this.typeArr = data.body.foodstuffKindList;
        })
      },
      handleSizeChange(val) {
        this.loading = true;
        this.pageSize = val;
        this.loadTableData();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.loading = true;
        this.currentPage = val;
        this.loadTableData();
        console.log(`当前页: ${val}`);
      },
      addNewItem() {
        for (var key in this.form) {
          this.form[key] = '';
        }
        this.formTitle = "新增食品";
        this.dialogFormVisible = true;
      },
      submitData(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.form);
            this.$http.post("/api/foodstuff-module/save_foodstuff", [this.form]).then((data) => {
              this.loadTableData();
              this.showMessage("success", "操作成功！");
              console.log(data.body);
            }, (response) => {
              this.showMessage("warning", response);
              console.log("request error");
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
        console.log(this.form);
        this.formTitle = "编辑食品";
        this.dialogFormVisible = true;
      },
      deleteData(rowData) {
        this.$confirm('此操作将永久该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get("/api/foodstuff-module/delete_foodstuff_by_id", {params: {id: rowData.id}}).then((data) => {
            this.showMessage("success", "操作成功！")
            console.log("successfully! URI : /api/foodstuff-module/delete_foodstuff_by_id");
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      getImagePath() {
        this.$http.get("/api/foodstuff-module/get_foodstuff_images_by_id", {params: {id: this.showImagesRowId}}).then((data) => {
          console.log("successfully! URI : /api/foodstuff-module/get_foodstuff_images_by_id");
          console.log(data.body);
          if(data.body.imagePath == null || data.body.imagePath==""){
            this.imagesPathArr = [];
            this.dialogImagesVisible = true;
          }
          else{
            this.imagesPathArr = data.body.imagePath.split(",");
            this.dialogImagesVisible = true;
          }
        }, (response) => {
          // 响应错误回调
          this.showMessage("warning", response);
          console.log("request error")
        })
      },
      showImages(rowData) {
        this.showImagesRowId = rowData.id;
        this.getImagePath();
      },
      uploadSuccess(response, file, fileList) {
        this.getImagePath();
        console.log(response);
        console.log(file);
        console.log(fileList);
      }
    }
  }
</script>

<style scoped>

</style>
