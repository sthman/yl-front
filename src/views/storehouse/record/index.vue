<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="使用者id，外键" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入使用者id，外键"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="使用开始时间" prop="usageStartTime">
        <el-date-picker clearable
          v-model="queryParams.usageStartTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择使用开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="usageEndTime">
        <el-date-picker clearable
          v-model="queryParams.usageEndTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="机构id，外键" prop="orgId">
        <el-input
          v-model="queryParams.orgId"
          placeholder="请输入机构id，外键"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物品id,外键" prop="itemId">
        <el-input
          v-model="queryParams.itemId"
          placeholder="请输入物品id,外键"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
          v-hasPermi="['storehouse:record:add']"
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
          v-hasPermi="['storehouse:record:edit']"
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
          v-hasPermi="['storehouse:record:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['storehouse:record:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="记录id，主键，自增" align="center" prop="recordId" />
      <el-table-column label="使用者id，外键" align="center" prop="userId" />
      <el-table-column label="使用开始时间" align="center" prop="usageStartTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.usageStartTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" align="center" prop="usageEndTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.usageEndTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="机构id，外键" align="center" prop="orgId" />
      <el-table-column label="物品id,外键" align="center" prop="itemId" />
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
            v-hasPermi="['storehouse:record:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['storehouse:record:remove']"
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

    <!-- 添加或修改设施使用记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="使用者id，外键" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入使用者id，外键" />
        </el-form-item>
        <el-form-item label="使用开始时间" prop="usageStartTime">
          <el-date-picker clearable
            v-model="form.usageStartTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择使用开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="usageEndTime">
          <el-date-picker clearable
            v-model="form.usageEndTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="机构id，外键" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入机构id，外键" />
        </el-form-item>
        <el-form-item label="物品id,外键" prop="itemId">
          <el-input v-model="form.itemId" placeholder="请输入物品id,外键" />
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
import { listRecord, getRecord, delRecord, addRecord, updateRecord } from "@/api/storehouse/record";

export default {
  name: "Record",
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
      // 设施使用记录表格数据
      recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        usageStartTime: null,
        usageEndTime: null,
        orgId: null,
        itemId: null,
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
    /** 查询设施使用记录列表 */
    getList() {
      this.loading = true;
      listRecord(this.queryParams).then(response => {
        this.recordList = response.rows;
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
        recordId: null,
        userId: null,
        usageStartTime: null,
        usageEndTime: null,
        orgId: null,
        itemId: null,
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
      this.ids = selection.map(item => item.recordId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加设施使用记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const recordId = row.recordId || this.ids
      getRecord(recordId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改设施使用记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.recordId != null) {
            updateRecord(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRecord(this.form).then(response => {
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
      const recordIds = row.recordId || this.ids;
      this.$modal.confirm('是否确认删除设施使用记录编号为"' + recordIds + '"的数据项？').then(function() {
        return delRecord(recordIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('storehouse/record/export', {
        ...this.queryParams
      }, `record_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
