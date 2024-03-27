<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="话务工单单号" prop="telworkNumber">
        <el-input v-model="queryParams.telworkNumber" placeholder="请输入话务工单单号" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="话务工单名称" prop="telworkName">
        <el-input v-model="queryParams.telworkName" placeholder="请输入话务工单名称" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="话务工单申请人id" prop="userId">
        <el-input v-model="queryParams.userId" placeholder="请输入话务工单申请人id" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="申请人手机号" prop="userPhone">
        <el-input v-model="queryParams.userPhone" placeholder="请输入申请人手机号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="话务工单负责机构id" prop="orgId">
        <el-input v-model="queryParams.orgId" placeholder="请输入话务工单负责机构id" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="话务工单调度人id" prop="applicanDispatcherId">
        <el-input v-model="queryParams.applicanDispatcherId" placeholder="请输入话务工单调度人id" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="话务工单创建时间" prop="creationTime">
        <el-date-picker clearable v-model="queryParams.creationTime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择话务工单创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="话务工单类型" prop="orderTypeId">
        <el-input v-model="queryParams.orderTypeId" placeholder="请输入话务工单类型" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="工单具体执行人员id" prop="executionPersonnel">
        <el-input v-model="queryParams.executionPersonnel" placeholder="请输入工单具体执行人员id" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="话务工单结束时间" prop="endTime">
        <el-date-picker clearable v-model="queryParams.endTime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择话务工单结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['tickets:telwork:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['tickets:telwork:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['tickets:telwork:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['tickets:telwork:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="telworkList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="话务工单id" align="center" prop="telworkId" />
      <el-table-column label="话务工单单号" align="center" prop="telworkNumber" />
      <el-table-column label="话务工单名称" align="center" prop="telworkName" />
      <el-table-column label="话务工单申请人id" align="center" prop="userId" />
      <el-table-column label="申请人手机号" align="center" prop="userPhone" />
      <el-table-column label="话务工单负责机构id" align="center" prop="orgId" />
      <el-table-column label="话务工单调度人id" align="center" prop="applicanDispatcherId" />
      <el-table-column label="话务工单创建时间" align="center" prop="creationTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.creationTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="话务工单状态" align="center" prop="orderStatus" />
      <el-table-column label="话务工单类型" align="center" prop="orderTypeId" />
      <el-table-column label="工单具体执行人员id" align="center" prop="executionPersonnel" />
      <el-table-column label="话务工单负责机构类型" align="center" prop="responsibleOrgType" />
      <el-table-column label="话务工单内容" align="center" prop="workOrderContent" />
      <el-table-column label="话务工单结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备用列1" align="center" prop="beiyong1" />
      <el-table-column label="备用列2" align="center" prop="beiyong2" />
      <el-table-column label="备用列3" align="center" prop="beiyong3" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['tickets:telwork:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['tickets:telwork:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改话务工单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="话务工单单号" prop="telworkNumber">
          <el-input v-model="form.telworkNumber" placeholder="请输入话务工单单号" />
        </el-form-item>
        <el-form-item label="话务工单名称" prop="telworkName">
          <el-input v-model="form.telworkName" placeholder="请输入话务工单名称" />
        </el-form-item>
        <el-form-item label="话务工单申请人id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入话务工单申请人id" />
        </el-form-item>
        <el-form-item label="申请人手机号" prop="userPhone">
          <el-input v-model="form.userPhone" placeholder="请输入申请人手机号" />
        </el-form-item>
        <el-form-item label="话务工单负责机构id" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入话务工单负责机构id" />
        </el-form-item>
        <el-form-item label="话务工单调度人id" prop="applicanDispatcherId">
          <el-input v-model="form.applicanDispatcherId" placeholder="请输入话务工单调度人id" />
        </el-form-item>
        <el-form-item label="话务工单创建时间" prop="creationTime">
          <el-date-picker clearable v-model="form.creationTime" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择话务工单创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="话务工单类型" prop="orderTypeId">
          <el-input v-model="form.orderTypeId" placeholder="请输入话务工单类型" />
        </el-form-item>
        <el-form-item label="工单具体执行人员id" prop="executionPersonnel">
          <el-input v-model="form.executionPersonnel" placeholder="请输入工单具体执行人员id" />
        </el-form-item>
        <el-form-item label="话务工单内容">
          <editor v-model="form.workOrderContent" :min-height="192" />
        </el-form-item>
        <el-form-item label="话务工单结束时间" prop="endTime">
          <el-date-picker clearable v-model="form.endTime" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择话务工单结束时间">
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
import { listTelwork, getTelwork, delTelwork, addTelwork, updateTelwork } from "@/api/tickets/telwork";

export default {
  name: "Telwork",
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
      // 话务工单表格数据
      telworkList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        telworkNumber: null,
        telworkName: null,
        userId: null,
        userPhone: null,
        orgId: null,
        applicanDispatcherId: null,
        creationTime: null,
        orderStatus: null,
        orderTypeId: null,
        executionPersonnel: null,
        responsibleOrgType: null,
        workOrderContent: null,
        endTime: null,
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
    /** 查询话务工单列表 */
    getList() {
      this.loading = true;
      listTelwork(this.queryParams).then(response => {
        this.telworkList = response.rows;
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
        telworkId: null,
        telworkNumber: null,
        telworkName: null,
        userId: null,
        userPhone: null,
        orgId: null,
        applicanDispatcherId: null,
        creationTime: null,
        orderStatus: null,
        orderTypeId: null,
        executionPersonnel: null,
        responsibleOrgType: null,
        workOrderContent: null,
        endTime: null,
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
      this.ids = selection.map(item => item.telworkId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加话务工单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const telworkId = row.telworkId || this.ids
      getTelwork(telworkId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改话务工单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.telworkId != null) {
            updateTelwork(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTelwork(this.form).then(response => {
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
      const telworkIds = row.telworkId || this.ids;
      this.$modal.confirm('是否确认删除话务工单编号为"' + telworkIds + '"的数据项？').then(function () {
        return delTelwork(telworkIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('tickets/telwork/export', {
        ...this.queryParams
      }, `telwork_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
