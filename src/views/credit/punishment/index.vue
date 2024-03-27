<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="奖惩级别id" prop="rewardPunishmentLevelId">
        <el-input
          v-model="queryParams.rewardPunishmentLevelId"
          placeholder="请输入奖惩级别id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="机构id" prop="orgId">
        <el-input
          v-model="queryParams.orgId"
          placeholder="请输入机构id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原因" prop="reason">
        <el-input
          v-model="queryParams.reason"
          placeholder="请输入原因"
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
          v-hasPermi="['credit:punishment:add']"
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
          v-hasPermi="['credit:punishment:edit']"
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
          v-hasPermi="['credit:punishment:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['credit:punishment:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="punishmentList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="奖惩id" align="center" prop="rewardPunishmentId" />
      <el-table-column label="奖惩级别id" align="center" prop="rewardPunishmentLevelId" />
      <el-table-column label="机构id" align="center" prop="orgId" />
      <el-table-column label="原因" align="center" prop="reason" />
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
            v-hasPermi="['credit:punishment:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['credit:punishment:remove']"
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

    <!-- 添加或修改奖惩记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="奖惩级别id" prop="rewardPunishmentLevelId">
          <el-input v-model="form.rewardPunishmentLevelId" placeholder="请输入奖惩级别id" />
        </el-form-item>
        <el-form-item label="机构id" prop="orgId">
          <el-input v-model="form.orgId" placeholder="请输入机构id" />
        </el-form-item>
        <el-form-item label="原因" prop="reason">
          <el-input v-model="form.reason" placeholder="请输入原因" />
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
import { listPunishment, getPunishment, delPunishment, addPunishment, updatePunishment } from "@/api/credit/punishment";

export default {
  name: "Punishment",
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
      // 奖惩记录表格数据
      punishmentList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        rewardPunishmentLevelId: null,
        orgId: null,
        reason: null,
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
    /** 查询奖惩记录列表 */
    getList() {
      this.loading = true;
      listPunishment(this.queryParams).then(response => {
        this.punishmentList = response.rows;
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
        rewardPunishmentId: null,
        rewardPunishmentLevelId: null,
        orgId: null,
        reason: null,
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
      this.ids = selection.map(item => item.rewardPunishmentId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加奖惩记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rewardPunishmentId = row.rewardPunishmentId || this.ids
      getPunishment(rewardPunishmentId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改奖惩记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rewardPunishmentId != null) {
            updatePunishment(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPunishment(this.form).then(response => {
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
      const rewardPunishmentIds = row.rewardPunishmentId || this.ids;
      this.$modal.confirm('是否确认删除奖惩记录编号为"' + rewardPunishmentIds + '"的数据项？').then(function() {
        return delPunishment(rewardPunishmentIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('credit/punishment/export', {
        ...this.queryParams
      }, `punishment_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
