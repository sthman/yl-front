<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="工单名称" prop="workOrderName">
        <el-input
          v-model="queryParams.workOrderName"
          placeholder="请输入工单名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工单执行机构id" prop="orgId">
        <el-input
          v-model="queryParams.orgId"
          placeholder="请输入工单执行机构id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="执行负责人id" prop="responsiblePerson">
        <el-input
          v-model="queryParams.responsiblePerson"
          placeholder="请输入执行负责人id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="工单创建时间" prop="createdTime">
        <el-date-picker clearable
          v-model="queryParams.createdTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择工单创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="工单结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择工单结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="话务工单id" prop="telworkId">
        <el-input
          v-model="queryParams.telworkId"
          placeholder="请输入话务工单id"
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
          v-hasPermi="['tickets:worder:add']"
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
          v-hasPermi="['tickets:worder:edit']"
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
          v-hasPermi="['tickets:worder:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['tickets:worder:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="worderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="工单id" align="center" prop="workOrderId" />
      <el-table-column label="工单名称" align="center" prop="workOrderName" />
      <el-table-column label="工单执行机构id" align="center" prop="orgId" />
      <el-table-column label="执行负责人id" align="center" prop="responsiblePerson" />
      <el-table-column label="工单创建时间" align="center" prop="createdTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createdTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工单结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="话务工单id" align="center" prop="telworkId" />
      <el-table-column label="执行工单状态" align="center" prop="executedStatus" />
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
            v-hasPermi="['tickets:worder:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['tickets:worder:remove']"
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

    <!-- 添加或修改执行工单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="工单名称" prop="workOrderName">
          <el-input v-model="form.workOrderName" placeholder="请输入工单名称" />
        </el-form-item>
        <el-form-item label="工单执行机构id" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入工单执行机构id" />
        </el-form-item>
        <el-form-item label="执行负责人id" prop="responsiblePerson">
          <el-input v-model="form.responsiblePerson" placeholder="请输入执行负责人id" />
        </el-form-item>
        <el-form-item label="工单创建时间" prop="createdTime">
          <el-date-picker clearable
            v-model="form.createdTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择工单创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工单结束时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择工单结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="话务工单id" prop="telworkId">
          <el-input v-model="form.telworkId" placeholder="请输入话务工单id" />
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
import { listWorder, getWorder, delWorder, addWorder, updateWorder } from "@/api/tickets/worder";

export default {
  name: "Worder",
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
      // 执行工单表格数据
      worderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        workOrderName: null,
        orgId: null,
        responsiblePerson: null,
        createdTime: null,
        endTime: null,
        telworkId: null,
        executedStatus: null,
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
    /** 查询执行工单列表 */
    getList() {
      this.loading = true;
      listWorder(this.queryParams).then(response => {
        this.worderList = response.rows;
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
        workOrderId: null,
        workOrderName: null,
        orgId: null,
        responsiblePerson: null,
        createdTime: null,
        endTime: null,
        telworkId: null,
        executedStatus: null,
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
      this.ids = selection.map(item => item.workOrderId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加执行工单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const workOrderId = row.workOrderId || this.ids
      getWorder(workOrderId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改执行工单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.workOrderId != null) {
            updateWorder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWorder(this.form).then(response => {
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
      const workOrderIds = row.workOrderId || this.ids;
      this.$modal.confirm('是否确认删除执行工单编号为"' + workOrderIds + '"的数据项？').then(function() {
        return delWorder(workOrderIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tickets/worder/export', {
        ...this.queryParams
      }, `worder_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
