<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="检查类型" prop="inspectionTypeId">
        <el-input
          v-model="queryParams.inspectionTypeId"
          placeholder="请输入检查类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被检查机构id" prop="orgId">
        <el-input
          v-model="queryParams.orgId"
          placeholder="请输入被检查机构id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否需要整改" prop="requiresCorrection">
        <el-input
          v-model="queryParams.requiresCorrection"
          placeholder="请输入是否需要整改"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="需要整改的问题" prop="correctionIssues">
        <el-input
          v-model="queryParams.correctionIssues"
          placeholder="请输入需要整改的问题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片1" prop="image1">
        <el-input
          v-model="queryParams.image1"
          placeholder="请输入图片1"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片2" prop="image2">
        <el-input
          v-model="queryParams.image2"
          placeholder="请输入图片2"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="图片3" prop="image3">
        <el-input
          v-model="queryParams.image3"
          placeholder="请输入图片3"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="检查时间" prop="inspectionTime">
        <el-date-picker clearable
          v-model="queryParams.inspectionTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择检查时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="备用列1" prop="beiyong1">
        <el-input
          v-model="queryParams.beiyong1"
          placeholder="请输入备用列1"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用列2" prop="beiyong2">
        <el-input
          v-model="queryParams.beiyong2"
          placeholder="请输入备用列2"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="备用列3" prop="beiyong3">
        <el-input
          v-model="queryParams.beiyong3"
          placeholder="请输入备用列3"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['credit:inspection:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['credit:inspection:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['credit:inspection:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['credit:inspection:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="inspectionList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="检查id" align="center" prop="inspectionId" />
      <el-table-column label="检查类型" align="center" prop="inspectionTypeId" />
      <el-table-column label="被检查机构id" align="center" prop="orgId" />
      <el-table-column label="是否需要整改" align="center" prop="requiresCorrection" />
      <el-table-column label="需要整改的问题" align="center" prop="correctionIssues" />
      <el-table-column label="图片1" align="center" prop="image1" />
      <el-table-column label="图片2" align="center" prop="image2" />
      <el-table-column label="图片3" align="center" prop="image3" />
      <el-table-column label="检查时间" align="center" prop="inspectionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inspectionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备用列1" align="center" prop="beiyong1" />
      <el-table-column label="备用列2" align="center" prop="beiyong2" />
      <el-table-column label="备用列3" align="center" prop="beiyong3" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['credit:inspection:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['credit:inspection:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改检查记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="检查类型" prop="inspectionTypeId">
          <el-input v-model="form.inspectionTypeId" placeholder="请输入检查类型" />
        </el-form-item>
        <el-form-item label="被检查机构id" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入被检查机构id" />
        </el-form-item>
        <el-form-item label="是否需要整改" prop="requiresCorrection">
          <el-input v-model="form.requiresCorrection" placeholder="请输入是否需要整改" />
        </el-form-item>
        <el-form-item label="需要整改的问题" prop="correctionIssues">
          <el-input v-model="form.correctionIssues" placeholder="请输入需要整改的问题" />
        </el-form-item>
        <el-form-item label="图片1" prop="image1">
          <el-input v-model="form.image1" placeholder="请输入图片1" />
        </el-form-item>
        <el-form-item label="图片2" prop="image2">
          <el-input v-model="form.image2" placeholder="请输入图片2" />
        </el-form-item>
        <el-form-item label="图片3" prop="image3">
          <el-input v-model="form.image3" placeholder="请输入图片3" />
        </el-form-item>
        <el-form-item label="检查时间" prop="inspectionTime">
          <el-date-picker clearable
            v-model="form.inspectionTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择检查时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="备用列1" prop="beiyong1">
          <el-input v-model="form.beiyong1" placeholder="请输入备用列1" />
        </el-form-item>
        <el-form-item label="备用列2" prop="beiyong2">
          <el-input v-model="form.beiyong2" placeholder="请输入备用列2" />
        </el-form-item>
        <el-form-item label="备用列3" prop="beiyong3">
          <el-input v-model="form.beiyong3" placeholder="请输入备用列3" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listInspection, getInspection, delInspection, addInspection, updateInspection } from "@/api/credit/inspection";

export default {
  name: "Inspection",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 检查记录表格数据
      inspectionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        inspectionTypeId: null,
        orgId: null,
        requiresCorrection: null,
        correctionIssues: null,
        image1: null,
        image2: null,
        image3: null,
        inspectionTime: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询检查记录列表 */
    getList() {
      this.loading = true;
      listInspection(this.queryParams).then(response => {
        this.inspectionList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        inspectionId: null,
        inspectionTypeId: null,
        orgId: null,
        requiresCorrection: null,
        correctionIssues: null,
        image1: null,
        image2: null,
        image3: null,
        inspectionTime: null,
        beiyong1: null,
        beiyong2: null,
        beiyong3: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.inspectionId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加检查记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const inspectionId = row.inspectionId || this.ids
      getInspection(inspectionId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改检查记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.inspectionId != null) {
            updateInspection(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInspection(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const inspectionIds = row.inspectionId || this.ids;
      this.$modal.confirm('是否确认删除检查记录编号为"' + inspectionIds + '"的数据项？').then(function() {
        return delInspection(inspectionIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('credit/inspection/export', {
        ...this.queryParams
      }, `inspection_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
